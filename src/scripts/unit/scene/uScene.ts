import uUnit from '~/scripts/unit/uUnit';
import { Scene, Object3D } from 'three';

export default class uScene extends uUnit<Scene> {
  
  private units:uUnit<Object3D>[];

  constructor() {
    super(new Scene());
    this.units = [];
  }

  load() {}
  init() { return this; }
  update() {}

  add<T extends Object3D>(...units:uUnit<T>[]) {
    super.add(...units);
    units.map((unit) => {
      unit.scene = this;
      this.units.push(unit);
    })
    return this;
  }

  remove<T extends Object3D>(...units:uUnit<T>[]) {
    super.remove(...units);

    const index = this.units.findIndex((unit) => {
      return unit === this;
    });
    if (index !== -1) {
      this.units.splice(index, 1);
    }

    return this;
  }

  dispose() {
    this.obj.dispose();
    this.units.map((unit) => {
      unit.dispose();
    })
    this.units.length = 0;
  }
}