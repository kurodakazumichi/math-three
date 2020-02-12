import System from '~/scripts/system/System';
import uCamera from '~/scripts/unit/camera/uCamera';

import uOrbitCamera from '~/scripts/unit/camera/uOrbitCamera';
import { UNIT_LINE } from '~/scripts/define';
import sUnit from '~/scripts/system/sUnit';
/******************************************************************************
 * カメラシステム
 *****************************************************************************/
class sCamera extends System {

  private mainCamera:uCamera|null = null;

  constructor() {
    super();
  }

  init() {
    this.mainCamera = new uOrbitCamera();
    this.mainCamera.position.set(0, 40, 100);
    sUnit.add(UNIT_LINE.CAMERA, this.mainCamera);
  }

  get main() {
    return this.mainCamera;
  }

  

  update(){}
}

const instance = new sCamera();
export default instance;