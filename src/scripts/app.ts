import sStage from './system/sStage';
import sScene from './system/sScene';
import sCoord from './system/sCoord';

class App {
  constructor() {
    this.execute = this.execute.bind(this);
  }

  init() {
    sCoord.init();
    sStage.init("container");
    sScene.init();

    sScene.loadSceneFromUrlParam();
  }

  execute() {
    sScene.update();
    requestAnimationFrame(this.execute);
  }
}

const app = new App();
app.init();
app.execute();