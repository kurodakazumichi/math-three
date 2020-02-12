import { Object3D } from 'three';

 
export default class uUnit<T extends Object3D> {
  private _obj:T;

  constructor(obj:T) {
    this._obj = obj;
  }

  get obj() {
    return this._obj;
  }
  

  get position() {
    return this._obj.position;
  }
  get rotation()  {
    return this._obj.rotation;
  }

  add<T extends Object3D>(...units:uUnit<T>[]) {
    const objects = units.map((unit) => {
      return unit._obj;
    })
    this._obj.add(...objects);
    return this;
  }

  dispose() {}


  update(){}
}