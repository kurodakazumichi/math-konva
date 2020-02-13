import sStage from './system/sStage';
import sScene, { SceneType } from './system/sScene';

const SceneTable:{[key:string]:SceneType} = {
  "sample1": SceneType.Sample1,
  "sample2": SceneType.Sample2,
}


class App {
  constructor() {
    this.execute = this.execute.bind(this);
  }

  init() {
    sStage.init();
    sScene.init();

    const atSceneType = getSceneTypeFromUrl();
    sScene.load(atSceneType);
  }

  execute() {
    sScene.update();
    requestAnimationFrame(this.execute);
  }
}

const app = new App();
app.init();
app.execute();

function getSceneTypeFromUrl() {
  const result:{type:string} = {type:""};
  
  location.search.substring(1).split("&").map((param) => {
    const data = param.split("=");

    if (data[0] === "scene") {
      result.type = data[1];
    }
  });

  const type =  SceneTable[result.type];

  return (type)? type : SceneType.Sample1;
}
