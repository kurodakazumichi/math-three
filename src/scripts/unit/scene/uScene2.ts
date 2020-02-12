import uScene from '~/scripts/unit/scene/uScene';



import sUnit from '~/scripts/system/sUnit';

import uSphere from '~/scripts/unit/primitive/uSphere';
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
    const sphere = new uSphere();
    sUnit.add(UNIT_LINE.PRIMITIVE, sphere);
    this.add(sphere);
    const plane = new uGrid(100, 10, 0x0000ff, 0x999999);
    sUnit.add(UNIT_LINE.PRIMITIVE, plane);
    this.add(plane);

    return this;
  }
}