import System from '~/scripts/system/System'
import uScene  from '~/scripts/unit/scene/uScene';

export enum LoadMode {
  /** 既存のシーンを全て破棄したうえで、新たに指定されたシーンをロードする */
  Single,
  /** 既存のシーンを残し、追加でシーンをロードする */
  Additive
};

export interface ISceneSettings {
  [key:string]:typeof uScene;
}

interface IActiveScene {
  name : string;
  scene: uScene;
}

interface IReserved {
  single:string;
  additive:string[];
  unload:string[];
}

// unload
// 予約するとreserved.unloadへ追加される
// update内で予約されたシーンを破棄

/******************************************************************************
 * シーンシステム
 *****************************************************************************/
class sScene extends System {

  constructor() {
    super();
    this.settings = {};
    this.main = null;
    this.reserved = {
      single:"", 
      additive:[],
      unload:[],
    }
  }

  /** 初期化 */
  init(settings:ISceneSettings) {
    this.settings = settings;
  }

  unload(name:string) {
    // 設定に含まれないシーン名の場合は終了
    if (!this.isValidName(name)) return;

    // Single予約があったら終呂う
    if (this.isReservedBySignle) return;

    // メインシーンだったら終了
    if (this.main?.name === name) return;

    this.reserved.unload.push(name);
  }

  /** シーンのロード */
  load(name:string, mode:LoadMode = LoadMode.Single) 
  {
    // 設定に含まれないシーン名の場合は終了
    if (!this.isValidName(name)) {
      console.warn(`The scene of ${name} is not contain in settings.`);
      return;
    }

    // 既に予約されているシーンだったら終了
    if (this.isAlreadyReserved(name)) {
      console.warn(`the scene of ${name} is already reserved.`);
      return;
    }

    switch(mode) {
      case LoadMode.Single  : this.loadSceneBySingle(name); break;
      case LoadMode.Additive: this.loadSceneByAdditive(name); break;
    }
  }

  /** シーンのロード(予約) Single */
  private loadSceneBySingle(name:string) {

    if (this.isReservedBySignle) {
      console.warn(`Scene is already reserved ${this.reserved.single}, then changed to ${name}.`);
    }

    this.reserved.single = name;
  }

  /** シーンのロード(予約) Additive */
  private loadSceneByAdditive(name:string) {
    this.reserved.additive.push(name);
  }

  /** 既に予約された名前である */
  private isAlreadyReserved(name:string) {
    if (this.reserved.single === name) return true;

    const found = this.reserved.additive.find((reservedName) => {
      return name === reservedName;
    })

    return (found !== undefined);
  }

  /** 何かしら予約があるかどうか */
  get isReserved() {
    return (this.isReservedBySignle || this.isReservedByAdditive || this.isReservedByUnload);
  }

  /** アクティブなシーンをすべて返す */
  get activeScenes():uScene[] {
    return this.actives.map((active) => {
      return active.scene;
    })
  }

  /** 設定にシーンの名前が含まれているか */
  isValidName(sceneName:string) {
    const found = Object.keys(this.settings).find((name) => {
      return name === sceneName;
    });

    return (found !== undefined);
  }


  /** 更新 */
  update() {
    if (!this.isReserved) return;
    this.procLoadSingle();
    this.procLoadAdditive();
    this.procUnload();
  }

  /** Single Sceneのロード処理 */
  private procLoadSingle() {
    const sceneName = this.reserved.single;

    // シングル予約がなければ終了
    if (!this.isReservedBySignle) return;
    
    // シーンを作成
    const scene = this.createScene(sceneName);
    
    // 既存のシーンを破棄
    if (scene) {
      this.disposeAll();
      scene.init();
      this.addActiveScene(sceneName, scene);
      this.setMainScene(sceneName);
    }

    // 予約を解除
    this.reserved.single = "";
  }

  /** Additive Sceneのロード処理 */
  private procLoadAdditive() {

    // 予約がなければ終了
    if(!this.isReservedByAdditive) return;

    this.reserved.additive.map((name) => {
      const scene = this.createScene(name).init();
      this.addActiveScene(name, scene);
    })

    // 予約の解除
    this.reserved.additive = [];
  }

  private procUnload() {
    if (!this.isReservedByUnload) return;

    this.reserved.unload.map((name) => {
      this.removeScene(name);
    });

    this.reserved.unload = [];
  }

  /** 
   * 現在のメインシーンインスタンスを返す。
   * nullを返す可能性もあるが、nullはないものとして扱っているので
   * 使用側で注意すること(一度でもシーンをロードすればnullにはならないはず)
   */
  get mainScene():uScene {
    return this.main?.scene as uScene;
  }

  /** メインとするシーンを設定する */
  setMainScene(name:string) {
    const scene = this.actives.find((active) => {
      return (active.name === name);
    });
    
    if (!scene) {
      console.warn(`The scene of ${name} don't set to main scene.`);
      return;
    }

    this.main = scene;
  }

  /** シーンセッティング */
  private settings:ISceneSettings = {};

  /** 有効なシーンリスト */
  private actives:IActiveScene[] = [];

  /** 現在メインのシーン */
  private main:IActiveScene|null;

  /** 予約情報 */
  private reserved:IReserved;

  /** Singleの予約があるかどうか */
  private get isReservedBySignle() {
    return (this.reserved.single !== "");
  }

  /** Additiveの予約があるかどうか */
  private get isReservedByAdditive() {
    return (0 < this.reserved.additive.length);
  }

  /** Unloadの予約があるかどうか */
  private get isReservedByUnload() {
    return (0 < this.reserved.unload.length);
  }

  getActiveSceneIndex(name:string) {
    const index = this.actives.findIndex((active) => {
      return active.name === name;
    });
    return index;
  }

  private removeScene(name:string) 
  {
    // 削除対象のシーンIndexを取得
    const removeIndex = this.getActiveSceneIndex(name);
    if (removeIndex < 0) return;

    const scene = this.actives[removeIndex].scene;

    scene.dispose();
    this.actives.splice(removeIndex, 1);
  }

  private disposeAll() {
    this.activeScenes.map((scene) => {
      scene.dispose();
    });

    this.actives = [];
  }

  private addActiveScene(name:string, scene:uScene) {
    this.actives.push({name, scene});
  }

  private createScene(name:string){
    return new this.settings[name]();
  }

  private isAlreadyActive(name:string) {
    const found = this.actives.some((active) => {
      return active.name === name;
    })

    return found;
  }

}

const instance = new sScene();
export default instance;