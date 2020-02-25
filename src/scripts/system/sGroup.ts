import SystemBase from '~/scripts/system/SystemBase';
import * as Groups  from  '~/scripts/node/group';
import { Vector2 } from 'math-lab';

/******************************************************************************
 * Groupファクトリークラス
 *****************************************************************************/
class sGroup extends SystemBase {
  axisXY() {
    return new Groups.AxisXY();
  }
  grid() {
    return new Groups.Grid();
  }
  triangle(points:number[] = []) {
    return new Groups.Triangle(points);
  }
  line(point:Vector2, dir:Vector2) {
    return new Groups.Line(point, dir);
  }
  segment(p1:Vector2, p2:Vector2) {
    return new Groups.Segment(p1, p2);
  }
}

const instance = new sGroup();
export default instance;