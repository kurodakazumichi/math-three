import uUnit from '~/scripts/unit/IUnit';
import { Scene } from 'three';

export default class uScene extends Scene implements uUnit {
  
  constructor() {
    super()
  }

  load() {}
  init() { return this; }
  update() {}
  kill() {}
}