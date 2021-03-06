import SystemBase from '~/scripts/system/SystemBase';
import ShapeBase from '~/scripts/node/shape/ShapeBase';
import * as Shapes  from  '~/scripts/node/shape';
import { sCoord, sColor, sEnv } from '~/scripts/system';
import Konva from 'konva';

/******************************************************************************
 * Shapeファクトリークラス
 *****************************************************************************/
class sShape extends SystemBase {
  axisX() {
    const p = [sCoord.left, 0, sCoord.right, 0];
    return new Shapes.Line()
      .points(p)
      .stroke(sColor.axisXY)
      .strokeWidth(1);
  }
  axisY() {
    const p = [0, sCoord.down, 0, sCoord.top];
    return new Shapes.Line()
      .points(p)
      .stroke(sColor.axisXY)
      .strokeWidth(1);
  }
  arrowX() {
    const p = [sCoord.left, 0, sCoord.right, 0];
    return new Shapes.Arrow()
      .points(p)
      .color(sColor.axisXY)
      .pointerWidth(0.05)
      .pointerLength(0.1)
      .strokeWidth(1);
  }
  arrowY() {
    const p = [0, sCoord.down, 0, sCoord.top];
    return new Shapes.Arrow()
      .points(p)
      .color(sColor.axisXY)
      .pointerWidth(0.05)
      .pointerLength(0.1)
      .strokeWidth(1);
  }
  solidLine() {
    return new Shapes.Line()
      .stroke(sColor.main)
      .strokeWidth(2);
  }
  // 補助線
  auxLine() {
    return new Shapes.Line()
      .stroke(sColor.green)
      .strokeWidth(1);
  }
  brokenLine() {
    return new Shapes.Line()
      .stroke(sColor.main)
      .strokeWidth(1)
      .dash(0.1);
  }

  point() {
    // draggableな点はモバイルの時は少し大きめに設定する(見えにくい)
    const radius = (sEnv.isMobile)? 0.15 : 0.1;

    return new Shapes.Circle()
      .radius(radius)
      .fill(sColor.green)
  }
  draggablePoint() {

    // draggableな点はモバイルの時は少し大きめに設定する(ドラッグしにくいから)
    const radius = (sEnv.isMobile)? 0.15 : 0.1;
    
    return new Shapes.Circle()
      .radius(radius)
      .fill(sColor.red)
      .draggable()
  }

  text(v:string = "A") {
    // モバイルとPCで若干デフォルトサイズを変える
    const size = (sEnv.isMobile)? 0.4 : 0.3;
    return new Shapes.Text()
      .text(v)
      .fontSize(size)
      .offset(0.1, -0.1)
      .fontFamily("Hiragino Maru Gothic ProN, meiryo, arial, sans-serif")
      .fill(sColor.text);
  }
  arrow() {
    return new Shapes.Arrow()
      .pointerLength(0.1)
      .pointerWidth(0.1)
      .color(sColor.main)
      .strokeWidth(2)
  }
  star() {
    return new Shapes.Star()
      .fill(sColor.yellow)
      .stroke(sColor.main)
      .strokeWidth(1)
      .outerRadius(0.3)
      .innerRadius(0.2)
      .numPoints(5)
  }
  wedge() {
    return new Shapes.Wedge()
      .fill(sColor.gray)
      .radius(0.5)
      .angle(90)
  }
  circle() {
    return new Shapes.Circle()
      .radius(1)
      .stroke(sColor.main)
  }
  rect() {
    return new Shapes.Rect()
      .width(1)
      .height(1)
      .strokeWidth(2)
      .stroke(sColor.main)
  }

  /** 便利関数、ShapesのObjectに対するmap */
  map(shapes:{[key:string]:ShapeBase<Konva.Shape>}, cb:(shape:ShapeBase<Konva.Shape>) => void){
    Object.values(shapes).map((shape) => {
      cb(shape);
    })
  }
}

const instance = new sShape();
export default instance;