import uScene from '~/scripts/unit/scene/uScene';

import sCamera from '~/scripts/system/sCamera';

import sUnit from '~/scripts/system/sUnit';


import uOrbitCamera from '~/scripts/unit/camera/uOrbitCamera';
import uBox from '~/scripts/unit/primitive/uBox';
import uGrid from '~/scripts/unit/primitive/uGrid';
import { UNIT_LINE } from '~/scripts/define';

/******************************************************************************
 * シーン１
 *****************************************************************************/
export default class uScene1 extends uScene {
  
  constructor() {
    super();
  }

  init() {
    const camera = new uOrbitCamera();
    
    camera.position.set(0, 40, 100);
    sCamera.init(camera);
    sUnit.add(UNIT_LINE.CAMERA, camera);
  
    const box = new uBox();
    sUnit.add(UNIT_LINE.PRIMITIVE, box);
    this.add(box);

    const plane = new uGrid(100, 10, 0xff0000, 0x999999);
    sUnit.add(UNIT_LINE.PRIMITIVE, plane);
    this.add(plane);
    
    return this;

  }
}