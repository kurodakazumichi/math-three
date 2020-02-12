import { PerspectiveCamera } from "three";
import { OrbitControls } from 'three-orbitcontrols-ts';

import IUnit from '~/scripts/unit/IUnit';
import sRender from '~/scripts/system/sRender';

export default class uOrbitCamera extends PerspectiveCamera implements IUnit {

  private controls:OrbitControls;

  constructor() {
    super(45, sRender.aspect);
    this.controls =  new OrbitControls(this, sRender.canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.4;
  }

  update() {
    this.controls.update();
  }

  kill() {}
}