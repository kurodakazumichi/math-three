import uScene from '~/scripts/unit/scene/uScene';


import sCamera from '~/scripts/system/sCamera';

import uSphere from '~/scripts/unit/primitive/uSphere';
import uGrid from '~/scripts/unit/primitive/uGrid';
import { UNIT_LINE } from '~/scripts/system/sUnit';

/******************************************************************************
 * シーン１
 *****************************************************************************/
export default class uScene2 extends uScene {
  
  constructor() {
    super();
  }

  init() {
    sCamera.main.position.set(0, 40, 100);
    const sphere = new uSphere().entry(UNIT_LINE.PRIMITIVE, this);
    sphere.position.x = -40;

    new uGrid(100, 10, 0x0000ff, 0x999999).entry(UNIT_LINE.PRIMITIVE, this);

    return this;
  }
}