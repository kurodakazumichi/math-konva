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

  closed(v:boolean) {
    this.node.closed(v);  return this;
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
    this.node.fontSize(sCoord.u2px(v)); return this;
  }
  fontFamily(v:string) {
    this.node.fontFamily(v); return this;
  }
  fontStyle(v:string) {
    this.node.fontStyle(v); return this;
  }
  normal() { this.fontStyle("normal"); return this; }
  italic() { this.fontStyle("italic"); return this; }
  bold()   { this.fontStyle("bold"); return this; }

  align(v:string) {
    this.node.align(v); return this;
  }
  verticalAlign(v:string) {
    this.node.verticalAlign(v); return this;
  }
}

/** Arrow */
export class Arrow extends ShapeBase<Konva.Arrow> {
  protected createNode() {
    return new Konva.Arrow();
  }
  points(points:number[]) {
    this.node.setAttr("points", sCoord.points(points)); return this;
  }
  pointerLength(v:number) {
    this.node.pointerLength(sCoord.u2px(v)); return this;
  }
  pointerWidth(v:number) {
    this.node.pointerWidth(sCoord.u2px(v)); return this;
  }
  color(v:string) {
    return this.fill(v).stroke(v);
  }
}

/** Star */
export class Star extends ShapeBase<Konva.Star> {
  protected createNode() {
    return new Konva.Star();
  }
  numPoints(v:number) {
    this.node.numPoints(v); return this;
  }
  innerRadius(v:number) {
    this.node.innerRadius(sCoord.u2px(v)); return  this;
  }
  outerRadius(v:number) {
    this.node.outerRadius(sCoord.u2px(v)); return this;
  }
}

/** Wedge */
export class Wedge extends ShapeBase<Konva.Wedge> {
  protected createNode() {
    return new Konva.Wedge();
  }
  angle(v:number) {
    this.node.angle(v); return this;
  }
  clockwise(v:boolean) {
    this.node.clockwise(v); return this;
  }
}

/** Rect */
export class Rect extends ShapeBase<Konva.Rect> {
  protected createNode() {
    return new Konva.Rect();
  }
}