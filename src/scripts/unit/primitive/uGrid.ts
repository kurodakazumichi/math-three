import { GridHelper, Color } from "three";

import uUnit from '~/scripts/unit/uUnit';

export default class uGrid extends uUnit<GridHelper> {

  constructor(size:number, divisions:number, color1:number|Color|undefined, color2:number|Color|undefined) {
    const grid = new GridHelper(size, divisions, color1, color2);
    super(grid);
  }

  update() {
    
  }
  kill() {}
}