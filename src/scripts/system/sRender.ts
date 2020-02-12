import { WebGLRenderer, Vector2 } from 'three';
import sCamera from '~/scripts/system/sCamera';
import sScene from '~/scripts/system/sScene';

/******************************************************************************
 * 描画システム
 *****************************************************************************/
class sRender {

  private renderer:WebGLRenderer|null = null;
  
  /** initで設定される基準の描画サイズ */
  BASE_WIDTH :number;
  BASE_HEIGHT:number;

  constructor() {
    this.BASE_WIDTH = this.BASE_HEIGHT = 0;
  }

  /** 初期化 */
  init(canvas:HTMLCanvasElement, width:number, height:number) 
  {
    // 基準サイズを保持
    this.BASE_WIDTH  = width;
    this.BASE_HEIGHT = height;

    this.renderer = new WebGLRenderer({canvas});
    this.resize(width, height);
    this.renderer.setClearColor(0xf0f0f0, 1);
  }

  /** 更新 */
  update(){}

  /** リサイズ */
  resize(w:number, h:number) {
    this.renderer?.setPixelRatio(window.devicePixelRatio);
    this.renderer?.setSize(w, h);

    if (sCamera.main) {
      sCamera.main.aspect = this.aspect;
      sCamera.main.updateProjectionMatrix();
    }
  }

  /** フルスクリーン設定・解除 */
  fullScreen(flg:boolean) {
    const w = (flg)? window.innerWidth : this.BASE_WIDTH;
    const h = (flg)? window.innerHeight: this.BASE_HEIGHT;
    this.resize(w, h);
  }

  /** 現在のレンダラーのアスペクト比 */
  get aspect() {
    const v = new Vector2();
    this.renderer?.getSize(v);
    return v.x/v.y;
  }

  /** 描画対象のcanvas */
  get canvas() {
    return this.renderer?.domElement;
  }

  /** 描画 */
  render(){
    sScene.actives.map((scene) => {
      if (!sCamera.main) return;
      this.renderer?.render(scene.obj, sCamera.main.obj);
    })
  }
}

const instance = new sRender();
export default instance;