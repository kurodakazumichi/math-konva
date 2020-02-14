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

/** Text */
export class Text extends ShapeBase<Konva.Text> {
  protected createNode() {
    return new Konva.Text();
  }
  text(v:string) {
    this.node.text(v); return this;
  }
  fontSize(v:number) {
    this.node.fontSize(v); return this;
  }
  fontFamily(v:string) {
    this.node.fontFamily(v); return this;
  }
  align(v:string) {
    this.node.align(v); return this;
  }
  verticalAlign(v:string) {
    this.node.verticalAlign(v); return this;
  }
}