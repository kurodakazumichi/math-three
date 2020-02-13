import uUnit from '~/scripts/unit/uUnit';
import { Scene, Object3D } from 'three';

/******************************************************************************
 * THREE.Sceneに相当するユニット
 * 
 * シーンはsSceneによって生成される。
 * シーンにユニットを登録する事でユニットが描画される。
 *****************************************************************************/
export default class uScene extends uUnit<Scene> {
  
  constructor() {
    super(new Scene());
    this.units = [];
  }

  //---------------------------------------------------------------------------
  // Public メソッド
  //---------------------------------------------------------------------------

  /** 初期化処理はsSceneがシーンを生成した際に呼ぶ */
  init() { return this; }

  /** シーンをsUnitに登録する事で毎フレームコールされる */
  update() {}

  /**
   * addされたunitはTHREE.Sceneとthis.unitsの２箇所に追加される。
   * Sceneに追加するのは、追加しないと描画されないというTHREEの仕様のため。
   * this.unitsに追加するのはTHREEは関係なく、uSceneの都合
   */
  add<T extends Object3D>(...units:uUnit<T>[]) {
    super.add(...units);
    this.addUnits(...units);
    return this;
  }

  /** 
   * addと対になるremove
   * 指定されたユニットをTHREE.Sceneとthis.unitsの両方から除外する
   */
  remove<T extends Object3D>(...units:uUnit<T>[]) {
    super.remove(...units);
    this.removeUnits(...units);
    return this;
  }

  /** デストラクタに相等 */
  dispose() 
  {
    // 所属する全unitを破棄
    this.units.map((unit) => {
      unit.dispose();
    });
    this.units.length = 0;

    // THREE.Sceneを破棄
    this.obj.dispose();
  }

  //---------------------------------------------------------------------------
  // Private メソッド
  //---------------------------------------------------------------------------

  /** this.unitsに指定されたunitを追加する */
  private addUnits<T extends Object3D>(...units:uUnit<T>[]){
    units.map((unit) => {
      this.units.push(unit);
    })
  }

  /** this.unitsから指定されたunitを削除する */
  private removeUnit<T extends Object3D>(unit:uUnit<T>) 
  {
    const index = this.units.findIndex((target) => {
      return unit === target;
    })

    if (index === -1){
      this.units.splice(index, 1);
    }
  }

  /** this.unitsから指定された複数のunitを削除する */
  private removeUnits<T extends Object3D>(...units:uUnit<T>[]) {
    units.map((unit) => {
      this.removeUnit(unit);
    })
  }

  //---------------------------------------------------------------------------
  // Private 変数
  //---------------------------------------------------------------------------

  /** 
   * このシーンに所属しているunit郡を保持する
   * これはシーンを破棄する際に、シーンに所属する全てのunitの
   * disposeを呼ぶために用意している。
   */
  private units:uUnit<Object3D>[];

}