
import Konva from 'konva';
export default class Scene {
  private layer:Konva.Layer|null;
  constructor() {
    this.layer = new Konva.Layer();
  }

  get layerOfKonva() {
    return this.layer as Konva.Layer;
  }
  init() {}
  add(children:Konva.Group|Konva.Shape) {
    this.layer?.add(children);
    return this;
  }

  update() {}

  destroy() {
    this.layer?.destroy();
    this.layer = null;
  }

  draw() {
    this.layer?.draw();
  }
}
