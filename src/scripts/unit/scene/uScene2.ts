import uScene from '~/scripts/unit/scene/uScene';

import sCamera from '~/scripts/system/sCamera';

import sUnit from '~/scripts/system/sUnit';
import uOrbitCamera from '~/scripts/unit/camera/uOrbitCamera';

import uGrid from '~/scripts/unit/primitive/uGrid';
import { UNIT_LINE } from '~/scripts/define';
/******************************************************************************
 * シーン１
 *****************************************************************************/
export default class uScene2 extends uScene {
  
  constructor() {
    super();
  }

  init() {

    const camera = new uOrbitCamera();
    
    camera.position.set(0, 40, 100);
    sCamera.init(camera);
    sUnit.add(UNIT_LINE.CAMERA, camera);
    
    const plane = new uGrid(100, 10, 0x0000ff, 0x999999);
    sUnit.add(UNIT_LINE.PRIMITIVE, plane);
    this.add(plane);

    // const geometry2 = new SphereGeometry(5, 32, 32);
    // const material2 = new MeshNormalMaterial();
    // const sphere = new Mesh(geometry2, material2);
    // this.add(sphere);
    return this;
  }
}