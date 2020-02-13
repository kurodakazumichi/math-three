import System from '~/scripts/system/System';
import uCamera from '~/scripts/unit/camera/uCamera';
import uOrbitCamera from '~/scripts/unit/camera/uOrbitCamera';
import { UNIT_LINE } from '~/scripts/system/sUnit';

/******************************************************************************
 * カメラシステム
 *****************************************************************************/
class sCamera extends System {

  constructor() {
    super();
  }

  get main() {
    return this.mainCamera as uCamera;
  }

  init() {
    this.mainCamera = new uOrbitCamera().entry(UNIT_LINE.CAMERA);
  }


  update(){}

  private mainCamera:uCamera|null = null;
}

const instance = new sCamera();
export default instance;