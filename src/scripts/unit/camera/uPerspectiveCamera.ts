import { PerspectiveCamera } from "three";
import sRender from '~/scripts/system/sRender';
import uCamera from "~/scripts/unit/camera/uCamera";

/******************************************************************************
 * PerspectiveCamera
 *****************************************************************************/
export default class uPerspectiveCamera extends uCamera<PerspectiveCamera> {

  constructor() {
    const camera = new PerspectiveCamera(45, sRender.aspect);
    super(camera);
  }

  update() {
    
  }

  set aspect(value:number) {
    this.obj.aspect = value;
  }

  updateProjectionMatrix() {
    this.obj.updateProjectionMatrix();
  }
}