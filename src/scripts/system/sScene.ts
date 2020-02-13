import SceneBase from '~/scripts/scene/SceneBase';
import SampleScene from '~/scripts/scene/SampleScene';
import SampleScene2 from '~/scripts/scene/SampleScene2';
import sStage from './sStage';
export enum SceneType {
  Sample1,
  Sample2
}

const settings = [
  {type:SceneType.Sample1, scene:SampleScene},
  {type:SceneType.Sample2, scene:SampleScene2 }
]

class sScene {

  private scene:SceneBase|null;

  constructor() {
    this.scene = null;
  }

  init() {}

  update() {
    this.scene?.update();
    this.scene?.draw();
  }

  load(type:SceneType) {
    this.scene?.destroy();
    this.scene = this.createScene(type);
    this.scene?.init();

    if (this.scene) {
      sStage.add(this.scene.layerOfKonva);
    }
  }

  private createScene(type:SceneType) {

    const scene = settings.find((setting) => {
      return setting.type === type;
    })

    if (!scene) return null;

    return new scene.scene();
  }
  
}

const instance = new sScene();
export default instance;