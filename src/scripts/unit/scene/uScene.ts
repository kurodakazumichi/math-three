import uUnit from '~/scripts/unit/uUnit';
import { Scene } from 'three';

export default class uScene extends uUnit<Scene> {
  
  constructor() {
    const scene = new Scene();
    super(scene);
  }

  load() {}
  init() { return this; }
  update() {}
  kill() {}
}