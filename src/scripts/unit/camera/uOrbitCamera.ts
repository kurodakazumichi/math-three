import { OrbitControls } from 'three-orbitcontrols-ts';
import sRender from '~/scripts/system/sRender';
import uPerspectiveCamera from "./uPerspectiveCamera";

/******************************************************************************
 * OrbitCamera
 *****************************************************************************/
export default class uOrbitCamera extends uPerspectiveCamera {

  private controls:OrbitControls;

  constructor() {
    super();
    this.controls =  new OrbitControls(this.obj, sRender.canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.4;
  }

  update() {
    this.controls.update();
  }
}