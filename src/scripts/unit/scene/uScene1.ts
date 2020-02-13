import uScene from '~/scripts/unit/scene/uScene';
import sCamera from '~/scripts/system/sCamera';

import uBox from '~/scripts/unit/primitive/uBox';
import uGrid from '~/scripts/unit/primitive/uGrid';
import { UNIT_LINE } from '~/scripts/system/sUnit';

import { LineBasicMaterial, BufferGeometry, Vector3, Line } from 'three';

/******************************************************************************
 * シーン１
 *****************************************************************************/
export default class uScene1 extends uScene {
  
  constructor() {
    super();
    this.enter(UNIT_LINE.SCENE);
  }

  init() {
    sCamera.main.position.set(0, 40, 100);

    const box = new uBox();
    box.position.x = 40;
    box.enter(UNIT_LINE.PRIMITIVE, this);
    this.box = box;

    const plane = new uGrid(100, 10, 0xff0000, 0x999999);
    plane.enter(UNIT_LINE.PRIMITIVE, this);

    const line = (() => {
      const material = new LineBasicMaterial({color:0x0000ff});
      const points = [];
      points.push(new Vector3(-10, 0, 0));
      points.push(new Vector3(0, 10, 0));
      points.push(new Vector3(10, 0, 0));
      const geometry = new BufferGeometry().setFromPoints(points);
      material.linewidth = 10;
      return new Line(geometry, material);
    })()
    this.obj.add(line);
    
    
    return this;
  }
  private box:uBox|null = null;
  private timer:number = 0;
  update() {
    this.timer++;

    if (this.timer % 100 !== 0) return;

    if (!this.box) return;

    if (this.box.isIndependent) {
      this.box.enter(UNIT_LINE.PRIMITIVE, this);
    } else {
      this.box.exit();
    }
    if (this.timer === 200) {
      this.box?.enter(UNIT_LINE.PRIMITIVE, this);
    }
  }

  dispose() {
    super.dispose();
    this.box = null;
  }
}