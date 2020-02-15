import * as Shapes  from  '~/scripts/node/shape';
import { sCoord } from '~/scripts/system';

/******************************************************************************
 * Shapeファクトリークラス
 *****************************************************************************/
class sShape  {
  axisX() {
    const p = [sCoord.left, 0, sCoord.right, 0];
    return new Shapes.Line()
      .points(p)
      .stroke("white")
      .strokeWidth(1);
  }
  axisY() {
    const p = [0, sCoord.down, 0, sCoord.top];
    return new Shapes.Line()
      .points(p)
      .stroke("white")
      .strokeWidth(1);
  }
  solidLine() {
    return new Shapes.Line()
      .stroke("white")
      .strokeWidth(2);
  }
  brokenLine() {
    return new Shapes.Line()
      .stroke("#D5E0F1")
      .strokeWidth(1)
      .dash(5);
  }
  point() {
    return new Shapes.Circle()
      .radius(5)
      .fill("#009F8C")
  }
  text() {
    return new Shapes.Text()
      .text("A")
      .fontSize(20)
      .stroke("white");
  }
}

const instance = new sShape();
export default instance;