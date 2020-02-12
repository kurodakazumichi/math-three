import uUnit from '~/scripts/unit/uUnit';
import { Scene } from 'three';

export default class uScene extends uUnit<Scene> {
  
  constructor() {
    super(new Scene());
  }

  load() {}
  init() { return this; }
  update() {}
}