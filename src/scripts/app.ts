import { GUI } from 'dat.gui';

import sRender from '~/scripts/system/sRender';
import sScene, { Type as SceneType } from '~/scripts/system/sScene';
import sUnit from '~/scripts/system/sUnit';

/******************************************************************************
 * エントリーポイント
 *****************************************************************************/
window.addEventListener('load', init);

function init() 
{
  // canvas取得
  const canvas = document.querySelector<HTMLCanvasElement>("#myCanvas");

  if (!canvas) {
    console.log("canvas not found.");
    return;
  }

  // デバッグ用
  debug();

  // 基本サイズ定義
  const width = 960;
  const height = 540;

  // アプリケーション実行
  const app = new App();
  app.init(canvas, width, height);
  app.execute();
}

/******************************************************************************
 * アプリケーション
 *****************************************************************************/
class App 
{
  constructor() {
    this.execute = this.execute.bind(this);
  }

  init(canvas:HTMLCanvasElement, width:number, height:number) {
    sRender.init(canvas, width, height);
    sScene.load(SceneType.Scene1);
  }

  execute() {
    // 更新
    sScene.update();
    sUnit.update();

    // 描画
    sRender.render();

    requestAnimationFrame(this.execute);
  }
}

/******************************************************************************
 * GUI
 *****************************************************************************/
function debug() {

  const params = {
    render:{
      fullScreen:false,
    }
  }
  const gui = new GUI;

  // Render
  const render = gui.addFolder("sRender");
  render.add(params.render, "fullScreen").onChange((v) => {
    sRender.fullScreen(v);
  })
}
