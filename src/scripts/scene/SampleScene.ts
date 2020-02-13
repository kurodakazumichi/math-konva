
import Konva from 'konva';
import { GUI } from 'dat.gui';
import SceneBase from './SceneBase';


export default class SampleScene extends SceneBase {
  constructor() {
    super();
    this.circle = null;
  }
  circle:Konva.Circle|null;
  init() {
    // create our shape
    this.circle = new Konva.Circle({
      x: 100,
      y: 100,
      radius: 70,
      fill: 'red',
      stroke: 'black',
      strokeWidth: 4
    });

    this.add(this.circle);

    const params = {
      x:0,
    }

    const gui = new GUI();
    gui.add(params, "x").onChange((v) => {
      this.circle?.setAttr("x", v);
    });

  }

  
  destroy() {
    super.destroy();
    this.circle = null;
  }
}