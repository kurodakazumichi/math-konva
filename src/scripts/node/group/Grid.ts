import GroupBase from './GroupBase';
import { sShape, sCoord, sColor } from '~/scripts/system';
import { Line, Arrow, Text } from '~/scripts/node/shape';

/******************************************************************************
 * Grid
 *****************************************************************************/
export default class Grid extends GroupBase {

  constructor() {
    super();
    this.centerAxis = [];
    this.lines      = [];
    this.labels     = [];
    this.initilize();
  }

  //---------------------------------------------------------------------------
  // 属性設定メソッド
  //---------------------------------------------------------------------------
  centerStroke(color:string) {
    this.centerAxis.map((axis) => { axis.stroke(color); })
    return this;
  }
  linesStroke(color:string) {
    this.lines.map((line) => { line.stroke(color); })
    return this;
  }

  //---------------------------------------------------------------------------
  // Private
  //---------------------------------------------------------------------------
  /** コンストラクタで呼び出す */
  private initilize() 
  {
    this.createCenterAxis();
    this.createVerticalLines();
    this.createHorizonLines();
    this.createLables();

    this.lines.map((line) => {
      this.add(line);
    })

    this.centerAxis.map((axis) => {
      this.add(axis);
    });

    this.labels.map((label) => {
      this.add(label);
    })
  }

  /** 中心軸を作成 */
  private createCenterAxis() {
    this.centerAxis.push(sShape.arrowX());
    this.centerAxis.push(sShape.arrowY());
  }

  /** グリッド線を作成 */
  private createLine(points:number[]) {
    return sShape.solidLine()
      .strokeWidth(1)
      .stroke(sColor.grid)
      .points(points);     
  }

  /** 垂直線を作成 */
  private createVerticalLines() 
  {
    const count = Math.floor(sCoord.right);

    for (let x = -count; x <= count; ++x) {
      const p = [x, sCoord.down, x, sCoord.top];
      this.lines.push(this.createLine(p));
    }
  }

  /** 水平線を作成 */
  private createHorizonLines() {
    const count = Math.floor(sCoord.top);

    for (let y = -count; y <= count; ++y) {
      const p = [sCoord.left, y, sCoord.right, y];
      this.lines.push(this.createLine(p));
    }
  }

  private createLables() {
    const params = [
      {text:"x", x:sCoord.right, y:0, offsetX:-0.1, offsetY:-0.1 },
      {text:"y", y:sCoord.top  , x:0, offsetX: 0.1, offsetY:0 }
    ]

    params.map((p) => {
      const label = sShape.text(p.text)
        .pos(p.x, p.y)
        .fontSize(0.15)
        .offsetX(p.offsetX)
        .offsetY(p.offsetY)
        .italic();

      this.labels.push(label);
    })
    
  }

  /** 中心軸XY */
  private centerAxis:Arrow[];

  /** その他の線 */
  private lines:Line[]

  /** Label */
  private labels:Text[];
}