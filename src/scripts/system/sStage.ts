import Konva from 'konva';
import { sCoord } from './index'

class sStage {
  constructor() {
    this.stage = null;
  }

  init() {
    this.stage = new Konva.Stage({
      container:"container",
      width    :sCoord.w,
      height   :sCoord.h,
    })
  }

  add(layer:Konva.Layer) {
    this.stage?.add(layer);
  }

  private stage:Konva.Stage|null;
}

const instance = new sStage();
export default instance;
