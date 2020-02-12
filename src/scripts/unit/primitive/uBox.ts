import { BoxGeometry, MeshNormalMaterial, Mesh } from "three";

import uUnit from '~/scripts/unit/uUnit';

export default class uBox extends uUnit<Mesh> {

  constructor() {
    const geometry = new BoxGeometry(10, 10, 10);
    const material = new MeshNormalMaterial();
    
    const mesh = new Mesh(geometry, material);
    
    super(mesh);
  }

  update() {
    this.rotation.y += 0.01;
  }

}