import SystemBase from '~/scripts/system/SystemBase';
import * as Groups  from  '~/scripts/node/group';

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
}

const instance = new sGroup();
export default instance;