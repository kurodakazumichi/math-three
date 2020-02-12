import System from '~/scripts/system/System'
import uScene  from '~/scripts/unit/scene/uScene';

/******************************************************************************
 * Enum
 *****************************************************************************/
/** シーンロード時のオプション */
export enum LoadMode {
  /** 既存のシーンを全て破棄したうえで、新たに指定されたシーンをロードする */
  Single,
  /** 既存のシーンを残し、追加でシーンをロードする */
  Additive
};

/******************************************************************************
 * Interface
 *****************************************************************************/
/** シーンセッティングデータの型 */
export interface ISceneSettings {
  [key:string]:typeof uScene;
}

/** アクティブなシーンをあらわす情報 */
interface IActiveScene {
  name : string;
  scene: uScene;
}

/******************************************************************************
 * シーンシステム
 *****************************************************************************/
class sScene extends System {

  constructor() {
    super();
    this.settings = new SceneSettings();
    this.status   = new ReservationStatus();
    this.scenes   = new ActiveScenes();
  }

  //---------------------------------------------------------------------------
  // Public プロパティ
  //---------------------------------------------------------------------------

  /** アクティブなシーンをすべて返す */
  get activeScenes():uScene[] {
    return this.scenes.activeScenes;
  }

  //---------------------------------------------------------------------------
  // Public メソッド
  //---------------------------------------------------------------------------

  /** 初期化 */
  init(settings:ISceneSettings) {
    this.settings.init(settings);
  }

  /** 更新 */
  update() {
    if (!this.status.hasReservation) return;
    this.procLoadSingle();
    this.procLoadAdditive();
    this.procUnload();
    this.status.clear();
  }

  /** シーン名によるシーンのロード */
  loadSceneBy(sceneName:string, mode:LoadMode = LoadMode.Single) 
  {
    // シーン設定に存在しないシーン名が指定されてたら無理
    if (!this.settings.has(sceneName)) return;

    switch(mode) {
      case LoadMode.Single  : this.loadSingleSceneBy(sceneName); break;
      case LoadMode.Additive: this.loadAdditiveSceneBy(sceneName); break;
    }
  }

  /** シーン名によるシーンのアンロード */
  unloadSceneBy(sceneName:string) 
  {
    if (!this.canUnload(sceneName)) return;
    this.status.unloads.push(sceneName);
  }

  //---------------------------------------------------------------------------
  // Private 変数
  //---------------------------------------------------------------------------

  private settings:SceneSettings;
  private status:ReservationStatus;
  private scenes:ActiveScenes;

  //---------------------------------------------------------------------------
  // Private メソッド
  //---------------------------------------------------------------------------

  private loadSingleSceneBy(sceneName:string) {
    this.status.single = sceneName;
  }

  private loadAdditiveSceneBy(sceneName:string) {
    if (!this.canAdditiveLoad(sceneName)) return;
    this.status.additives.push(sceneName);
  }

  private canAdditiveLoad(sceneName:string) {
    // 既に存在するシーンなら追加しない
    if (this.scenes.has(sceneName)) return false;
    return true;
  }

  private canUnload(sceneName:string) {
    // 設定に含まれないシーン名は無視
    if (!this.settings.has(sceneName)) return false;

    // ステータス的にNGなら無理だよね
    if (!this.status.canAddUnloadReservation(sceneName)) return false;
    
    // メインシーン破棄は想定してないのでさせない
    if (this.scenes.main.name === sceneName) return false;

    return true;
  }

  /** Single Sceneのロード処理 */
  private procLoadSingle() {
    const sceneName = this.status.single;

    // シングル予約がなければ終了
    if (!this.status.hasSingleReservation) return;
    
    // シーンを作成
    const singleScene = this.settings.createSceneBy(sceneName);
    
    // 既存のシーンを破棄
    if (singleScene) {
      this.scenes.removeAll();
      this.scenes.add(sceneName, singleScene.init(), true);
    }
  }

  /** Additive Sceneのロード処理 */
  private procLoadAdditive() {

    // 予約がなければ終了
    if(!this.status.hasAdditiveReservations) return;

    this.status.additives.map((name) => {
      const additiveScene = this.settings.createSceneBy(name);

      if (additiveScene) {
        this.scenes.add(name, additiveScene.init());
      }
    })

    // 予約の解除
    this.status.clearAdditives();
  }

  private procUnload() {
    if (!this.status.hasUnloadReservations) return;

    this.status.unloads.map((name) => {
      this.scenes.removeBy(name);
    });
    this.status.clearUnloads();
  }
}

/******************************************************************************
 * シーン設定クラス
 *****************************************************************************/
class SceneSettings {
  
  constructor() {
    this.settings = null;
  }
  
  /** シーン名と対応するクラスが定義されたデータ */
  private settings:ISceneSettings|null;

  /** 設定データをもらって保持するだけ */
  init(settings:ISceneSettings){
    this.settings = settings;
  }

  /** 
   * 存在しないシーン名を指定されるかもしれないので
   * ちゃんと設定に含まれてるよね？ってことを調べる用
   */
  has(sceneName:string) 
  {
    if (!this.settings) return;

    const found = Object.keys(this.settings).find((name) => {
      return name === sceneName;
    });

    return (found !== undefined); 
  }

  createSceneBy(sceneName:string) {
    if (!this.settings) return null;
    return new this.settings[sceneName]();
  }
}

/******************************************************************************
 * シーンの予約状況を管理するクラス
 *****************************************************************************/
class ReservationStatus 
{
  private _single:string;
  private _additives:string[];
  private _unloads:string[];

  constructor() {
    this._single = "";
    this._additives = [];
    this._unloads = [];
  }

  //---------------------------------------------------------------------------
  get single() {
    return this._single;
  }

  set single(v) {
    // シングルロードの場合は一度全ての予約をクリアしておく
    this.clear();
    this._single = v;
  }

  get additives() {
    return this._additives;
  }

  get unloads() {
    return this._unloads;
  }

  //---------------------------------------------------------------------------
  canAddUnloadReservation(_sceneName:string) 
  {
    // ロード予約がある場合はどのみち全シーン消されるのでアンロードはスキップしてもいい
    if(this.hasSingleReservation) return false;
    return true;
  }

  //---------------------------------------------------------------------------
  clear() {
    this.clearSingle();
  }
  clearSingle() {
    this._single = "";
  }
  clearAdditives() {
    this.additives.length = 0;
  }
  clearUnloads() {
    this.unloads.length = 0;
  }

  //---------------------------------------------------------------------------
  hasReservation() {
    return (
      this.hasSingleReservation
      ||
      this.hasAdditiveReservations
      ||
      this.hasUnloadReservations
    );
  }

  get hasSingleReservation() {
    return this._single !== "";
  }
  get hasAdditiveReservations() {
    return 0 < this._additives.length;
  }
  get hasUnloadReservations() {
    return 0 < this._unloads.length;
  }

  hasSingleReservationNamed(sceneName:string) {
    return this._single === sceneName;
  }

  hasAdditiveReservationNamed(sceneName:string) {
    const found = this._additives.find((name) => {
      return sceneName === name;
    })
    return found !== undefined;
  }
  hasUnloadReservationNamed(sceneName:string) {
    const found = this._unloads.find((name) => {
      return  sceneName === name;
    })
    return found !== name;
  }
}

/******************************************************************************
 * アクティブシーン管理
 *****************************************************************************/
class ActiveScenes {
  private scenes: IActiveScene[];
  private _main:IActiveScene|null;

  constructor() {
    this.scenes = [];
    this._main = null;
  }

  /** 
   * sScene.load(sceneName, singleMode)によってロードされたシーン
   * nullを返す可能性もあるが、nullになる事がないように扱う。
   */
  get main() {
    return this._main as IActiveScene;
  }

  get activeScenes() {
    return this.scenes.map((scene) => {
      return scene.scene;
    })
  }



  setMainBy(sceneName:string) {

    const scene = this.getSceneBy(sceneName);

    if (!scene) {
      console.warn(`The scene of ${name} don't set to main scene.`);
      return;
    }

    this._main = scene;
  }

  getSceneBy(sceneName:string) {
    const found = this.scenes.find((scene) => {
      return (scene.name === sceneName);
    });
    return found;
  }

  getSceneIndexBy(sceneName:string) {
    const index = this.scenes.findIndex((active) => {
      return active.name === sceneName;
    });
    return index;   
  }

  has(sceneName:string) {
    return -1 !== this.getSceneIndexBy(sceneName);
  }

  add(name:string, scene:uScene, requestSetMain = false) {
    this.scenes.push({name, scene});

    if (requestSetMain) {
      this.setMainBy(name);
    }
  }

  removeBy(sceneName:string) 
  {
    const index = this.getSceneIndexBy(sceneName);
    
    if (-1 === index) return;

    this.scenes[index].scene.dispose();
    this.scenes.splice(index, 1);
  }

  removeAll() {
    this.activeScenes.map((scene) => {
      scene.dispose();
    });
    this.scenes.length = 0;
  }

}


const instance = new sScene();
export default instance;