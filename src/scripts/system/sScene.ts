import ISystem from '~/scripts/system/ISystem'
import uScene1 from '../unit/scene/uScene1';
import uScene2 from '../unit/scene/uScene2';
import uScene  from '~/scripts/unit/scene/uScene';

export enum Type {
  None = -1,
  Scene1,
  Scene2,
}

/******************************************************************************
 * シーンシステム
 *****************************************************************************/
class sScene implements ISystem {

  private _actives:{type:Type, scene:uScene}[] = [];

  private reserved:Type = Type.None;

  get actives():uScene[] {
    return this._actives.map((active) => {
      return active.scene;
    })
  }

  init(types:Type[]) {
    types.map((type) => {
      const scene = this.createScene(type);
      
      if(scene) {
        scene.init();
        this.addActiveScene(type, scene);
      }

    })
  }

  load(sceneType:Type) {
    this.reserved = sceneType;
  }

  get isReserved() {
    return (this.reserved !== Type.None);
  }


  update() {
    if (!this.isReserved) return;
    
    if (this.isAlreadyActive(this.reserved)) {
      console.warn(`the specified scene(type ${this.reserved}) is already active.`);
      return;
    }
    
    const scene = this.createScene(this.reserved);

    if (scene) {
      this.disposeAll();
      scene.init();
      this.addActiveScene(this.reserved, scene);
      
    }

    this.reserved = Type.None;

  }

  private disposeAll() {
    this.actives.map((scene) => {
      scene.dispose();
    });

    this._actives = [];
  }

  private addActiveScene(type:Type, scene:uScene) {
    this._actives.push({type, scene});
  }

  private createScene(type:Type){
    switch(type) {
      case Type.Scene1: return new uScene1();
      case Type.Scene2: return new uScene2();
      default: return null;
    }

  }

  isAlreadyActive(type:Type) {
    const found = this._actives.some((active) => {
      return active.type === type;
    })

    return found;
  }

}

const instance = new sScene();
export default instance;