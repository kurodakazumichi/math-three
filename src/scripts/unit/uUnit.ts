import { Object3D } from 'three';
import sUnit, { UNIT_LINE } from '~/scripts/system/sUnit';
import uScene from './scene/uScene';

/******************************************************************************
 * 全Unitの基底クラスでありTHREE.Object3Dを包括するベースクラス
 * 
 * THREE.Object3Dに存在しないメソッドを追加したいと思ったが
 * メソッド拡張とかはやり方がわからない(というかできるの？)のでラップして使う事にした。
 * 
 * Object3Dに備わっているメソッドを使いたい場合は逐一ラップする必要がありめんどいが
 * 現状はこの方法で妥協した。
 *****************************************************************************/
export default class uUnit<T extends Object3D = Object3D> {

  constructor(obj:T) {
    this._obj = obj;
  }

  //---------------------------------------------------------------------------
  // Public プロパティ
  //---------------------------------------------------------------------------

  /** 
   * THREE.Object3Dインスタンス、システム内部で使用する用途で用意しているので
   * アプリケーションからは基本使わない想定。
   */
  get obj() {
    return this._obj as T;
  }

  //---------------------------------------------------------------------------
  // Public メソッド
  //---------------------------------------------------------------------------

  //---------------------------------------------------------------------------
  // Object3Dにはないけど、独自に追加したいと思ったメソッドの定義

  /** 毎フレームコールされる更新処理 */
  update(){}

  /** sUnitとsceneに登録する */
  entry(lineNo:number, scene:uScene|null = null) 
  {
    // 既に登録されてるかもしれないので一度exitする。
    this.exit();

    // sUnitに登録する事で毎フレームupdateが呼ばれる
    sUnit.add(lineNo, this);
    this.belongingLineNo = lineNo;

    // シーンに登録する事で描画される
    if(scene) {
      this.belongingScene = scene;
      this.belongingScene.add(this);
    }
    return this;
  }

  /** sUnitとsceneから抜ける */
  exit() 
  {
    sUnit.remove(this, this.belongingLineNo);

    if(this.belongingScene) {
      this.belongingScene.remove(this);
    }
    this.belongingLineNo = UNIT_LINE.NONE;
    this.belongingScene = null;
    return this;
  }

  /** デストラクタに相等 */
  dispose() {
    this.exit();
    this._obj = null;
  }

  //---------------------------------------------------------------------------
  // 以下はObject3Dに定義されているメソッドやプロパティのラッパーを定義

  get position() {
    return this.obj.position;
  }
  get scale() {
    return this.obj.scale;
  }
  get rotation()  {
    return this.obj.rotation;
  }

  add<T extends Object3D>(...units:uUnit<T>[]) {
    const objects = units.map((unit) => {
      return unit.obj;
    })
    this.obj.add(...objects);
    return this;
  }

  remove<T extends Object3D>(...units:uUnit<T>[]) {
    const objects = units.map((unit) => {
      return unit.obj;
    })
    this.obj.remove(...objects);
    return this;
  }

  //---------------------------------------------------------------------------
  // Private 変数
  //---------------------------------------------------------------------------
  /** THREE.Object3D系列のインスタンスを保持する */
  private _obj:T|null;

  /** 所属するsUnitのLINE番号 */
  private belongingLineNo:number = UNIT_LINE.NONE;

  /** 所属するシーン */
  private belongingScene:uScene|null = null;


}