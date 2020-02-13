import uScene from '~/scripts/unit/scene/uScene';
import sUnit from '~/scripts/system/sUnit';
import sCamera from '~/scripts/system/sCamera';

import uBox from '~/scripts/unit/primitive/uBox';
import uGrid from '~/scripts/unit/primitive/uGrid';
import { UNIT_LINE } from '~/scripts/define';

import { LineBasicMaterial, BufferGeometry, Vector3, Line } from 'three';

/******************************************************************************
 * シーン１
 *****************************************************************************/
export default class uScene1 extends uScene {
  
  constructor() {
    super();
  }

  init() {
    sCamera.main.position.set(0, 40, 100);

    const box = new uBox();
    box.position.x = 40;
    box.entry(UNIT_LINE.PRIMITIVE, this);

    const plane = new uGrid(100, 10, 0xff0000, 0x999999);
    plane.entry(UNIT_LINE.PRIMITIVE, this);

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
}