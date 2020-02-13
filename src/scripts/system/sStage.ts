import Konva from 'konva';

class sStage {
  constructor() {
    this.stage = null;
  }

  init() {
    this.stage = new Konva.Stage({
      container:"container",
      width:1080,
      height:720,
    })
  }

  add(layer:Konva.Layer) {
    this.stage?.add(layer);
  }

  private stage:Konva.Stage|null;
}

const instance = new sStage();
export default instance;
