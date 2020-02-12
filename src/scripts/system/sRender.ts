import { WebGLRenderer, Vector2 } from 'three';
import sCamera from '~/scripts/system/sCamera';
import sScene from '~/scripts/system/sScene';

/******************************************************************************
 * 描画システム
 *****************************************************************************/
class sRender {

  private renderer:WebGLRenderer|null = null;

  constructor() {
    
  }

  init(canvas:HTMLCanvasElement, width:number, height:number) {
    this.renderer = new WebGLRenderer({canvas});
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0xf0f0f0, 1);
  }

  get aspect() {
    const v = new Vector2();
    this.renderer?.getSize(v);
    return v.x/v.y;
  }

  get canvas() {
    return this.renderer?.domElement;
  }

  render(){
    sScene.actives.map((scene) => {
      if (!sCamera.main) return;
      this.renderer?.render(scene.obj, sCamera.main.obj);
    })
  }

  update(){}

}

const instance = new sRender();
export default instance;