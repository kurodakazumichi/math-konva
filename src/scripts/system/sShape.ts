import SystemBase from '~/scripts/system/SystemBase';
import * as Shapes  from  '~/scripts/node/shape';
import { sCoord, sColor } from '~/scripts/system';

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
  solidLine() {
    return new Shapes.Line()
      .stroke(sColor.main)
      .strokeWidth(2);
  }
  brokenLine() {
    return new Shapes.Line()
      .stroke(sColor.main)
      .strokeWidth(1)
      .dash(5);
  }
  point() {
    return new Shapes.Circle()
      .radius(5)
      .fill(sColor.green)
  }
  text() {
    return new Shapes.Text()
      .text("A")
      .fontSize(20)
      .fill(sColor.text);
  }
}

const instance = new sShape();
export default instance;