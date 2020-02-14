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
      .stroke("gray")
      .strokeWidth(1);
  }
  axisY() {
    const p = [0, sCoord.down, 0, sCoord.top];
    return new Shapes.Line()
      .points(p)
      .stroke("gray")
      .strokeWidth(1);
  }
  solidLine() {
    return new Shapes.Line()
      .stroke("black")
      .strokeWidth(2);
  }
}

const instance = new sShape();
export default instance;