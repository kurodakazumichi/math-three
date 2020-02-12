import { PerspectiveCamera } from "three";
import { OrbitControls } from 'three-orbitcontrols-ts';

import sRender from '~/scripts/system/sRender';
import uCamera from "./uCamera";

export default class uOrbitCamera extends uCamera {

  private controls:OrbitControls;

  constructor() {
    const camera = new PerspectiveCamera(45, sRender.aspect);
    super(camera);
    this.controls =  new OrbitControls(this.obj, sRender.canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.4;
  }

  update() {
    this.controls.update();
  }
}