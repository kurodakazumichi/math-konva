import * as Shapes  from  '~/scripts/node/shape';
import { sCoord } from '~/scripts/system';

class sShape  {
  axisX() {
    const p = [sCoord.left, 0, sCoord.rigjt, 0];
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
}

const instance = new sShape();
export default instance;