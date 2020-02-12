import { Camera } from "three";
import uUnit from '~/scripts/unit/uUnit';

/******************************************************************************
 * カメラの基底クラス
 *****************************************************************************/
export default class uCamera<T extends Camera = Camera> extends uUnit<T> {

  constructor(camera:T) {
    super(camera);
  }

  /** カメラのアスペクト比を設定 */
  set aspect(_:number) { _; }

  /** プロジェクション行列を更新 */
  updateProjectionMatrix() {}

}