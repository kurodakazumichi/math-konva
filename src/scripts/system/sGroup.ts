import * as Groups  from  '~/scripts/node/group';


class sGroup  {
  axisXY() {
    return new Groups.Axis();
  }
}

const instance = new sGroup();
export default instance;