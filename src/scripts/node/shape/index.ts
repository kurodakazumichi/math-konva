import Konva from 'konva';
import ShapeBase from './ShapeBase';
import { sCoord } from '~/scripts/system';

/** Line */
export class Line extends ShapeBase<Konva.Line>{
  protected createNode() {
    return new Konva.Line();
  }

  points(points:number[]) {
    this.node.setAttr("points", sCoord.points(points)); return this;
  }
}

/** Circle */
export class Circle extends ShapeBase<Konva.Circle> {
  protected createNode() {
    return new Konva.Circle();
  }
}