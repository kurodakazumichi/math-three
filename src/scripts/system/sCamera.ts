import ISystem from '~/scripts/system/ISystem';
import { Camera } from 'three';

/******************************************************************************
 * カメラシステム
 *****************************************************************************/
class sCamera implements ISystem {

  private mainCamera:Camera|null = null;

  constructor() {
    
  }

  init(camera:Camera) {
    this.mainCamera = camera;
  }

  get main() {
    return this.mainCamera;
  }

  update(){}
}

const instance = new sCamera();
export default instance;