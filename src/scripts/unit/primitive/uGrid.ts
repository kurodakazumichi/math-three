import { GridHelper, Color } from "three";

import IUnit from '~/scripts/unit/IUnit';

export default class uGrid extends GridHelper implements IUnit {

  constructor(size:number, divisions:number, color1:number|Color|undefined, color2:number|Color|undefined) {
    super(size, divisions, color1, color2);
  }

  update() {
    
  }
  kill() {}
}