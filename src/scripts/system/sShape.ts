import SystemBase from '~/scripts/system/SystemBase';
import * as Shapes  from  '~/scripts/node/shape';
import { sCoord, sColor, sEnv } from '~/scripts/system';

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
    return new Shapes.Circle()
      .radius(0.1)
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
  text() {
    return new Shapes.Text()
      .text("A")
      .fontSize(0.4)
      .fill(sColor.text);
  }
}

const instance = new sShape();
export default instance;