import { SphereGeometry, MeshNormalMaterial, Mesh } from "three";

import uUnit from '~/scripts/unit/uUnit';

export default class uSphere extends uUnit<Mesh> {

  constructor() {
    const geometry = new SphereGeometry(5, 10, 10);
    const material = new MeshNormalMaterial();
    const mesh = new Mesh(geometry, material);
    super(mesh);
  }

  update() {
    this.rotation.y += 0.01;
  }
}