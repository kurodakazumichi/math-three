import { BoxGeometry, MeshNormalMaterial, Mesh, Material } from "three";

import IUnit from '~/scripts/unit/IUnit';
import { Object3D } from 'three';


(Object3D.prototype as  any)["kill"] = () => {}

export default class uBox extends Mesh implements IUnit {

  geometry:BoxGeometry;
  material:Material;

  constructor() {
    super();
    this.geometry = new BoxGeometry(10, 10, 10);
    this.material = new MeshNormalMaterial();
    
  }

  update() {
    this.rotation.y += 0.01;
  }
}