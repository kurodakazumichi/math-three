import { GUI } from 'dat.gui';

import sRender from '~/scripts/system/sRender';
import sScene, { Type as SceneType } from '~/scripts/system/sScene';
import sUnit from '~/scripts/system/sUnit';

class App {
  constructor() {
    this.execute = this.execute.bind(this);
  }

  init() {
    const width = 960;
    const height = 540;
  
    const canvas = document.querySelector<HTMLCanvasElement>("#myCanvas");
  
    if (!canvas) {
      console.log("canvas not found.");
      return;
    }
  
  
    sRender.init(canvas, width, height);

    sScene.load(SceneType.Scene1);
  }

  execute() {
    sScene.update();
    sUnit.update();
    sRender.render();

    requestAnimationFrame(this.execute);
  }
}
window.addEventListener('load', init);

function init() {


  const gui = new GUI;

  const params = {
    scene: false
  }
  gui.add(params, "scene").onChange((value) => {
    if (value) {
      sScene.load(SceneType.Scene2)
    } else {
      sScene.load(SceneType.Scene1)
    }
  });

  const app = new App();
  app.init();
  app.execute();
}