import { Object3D } from 'three';
import sUnit from '~/scripts/system/sUnit';
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

  /**
   * THREE.Object3D系列のインスタンスを保持する
   */
  private _obj:T|null;

  unitLine:number = -1;

  scene:uScene|null = null;

  get obj() {
    return this._obj as T;
  }

  constructor(obj:T) {
    this._obj = obj;
  }

  /**
   * Object3Dにはないけど、独自に追加したいと思ったメソッドの定義
   */

  /** 毎フレームコールされる更新処理 */
  update(){}

  /** sUnitとsceneに登録する */
  entry(lineNo:number, scene:uScene|null = null) {

    // 既に登録されてるかもしれないので一度exitする。
    this.exit();

    sUnit.add(lineNo, this);
    this.unitLine = lineNo;

    if(scene) {
      this.scene = scene;
      this.scene.add(this);
    }
    return this;
  }

  /** sUnitとsceneから抜ける */
  exit() {
    sUnit.remove(this);

    if(this.scene) {
      this.scene.remove(this);
    }
    this.unitLine = -1;
    this.scene = null;
    return this;
  }

  /** デストラクタに相等 */
  dispose() {
    this._obj = null;
    this.scene = null;
    sUnit.remove(this);
  }

  /**
   * 以下はObject3Dに定義されているメソッドやプロパティのラッパーを定義
   */

  get position() {
    return this.obj.position;
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

}