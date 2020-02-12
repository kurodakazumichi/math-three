import ISystem from '~/scripts/system/ISystem';
import uCamera from '~/scripts/unit/camera/uCamera';

/******************************************************************************
 * カメラシステム
 *****************************************************************************/
class sCamera implements ISystem {

  private mainCamera:uCamera|null = null;

  constructor() {
    
  }

  init(camera:uCamera) {
    this.mainCamera = camera;
  }

  get main() {
    return this.mainCamera;
  }

  

  update(){}
}

const instance = new sCamera();
export default instance;