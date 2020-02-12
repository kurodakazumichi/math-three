import uScene from '~/scripts/unit/scene/uScene';

import sCamera from '~/scripts/system/sCamera';
import sRender from '~/scripts/system/sRender';
import { OrbitControls } from 'three-orbitcontrols-ts';
import { PerspectiveCamera, Mesh, MeshNormalMaterial, SphereGeometry, GridHelper } from 'three';
/******************************************************************************
 * シーン１
 *****************************************************************************/
export default class uScene2 extends uScene {
  
  constructor() {
    super();
  }

  init() {

    const camera = new PerspectiveCamera(45, sRender.aspect);
    camera.position.set(0, 40, 100);
    sCamera.init(camera);
    
    const controls = new OrbitControls(camera, sRender.canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.4;
  
    const plane = new GridHelper(100, 10, 0x0000ff, 0x999999);
    this.add(plane);

    const geometry2 = new SphereGeometry(5, 32, 32);
    const material2 = new MeshNormalMaterial();
    const sphere = new Mesh(geometry2, material2);
    this.add(sphere);
    return this;
  }
}