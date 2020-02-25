import GroupBase from './GroupBase';
import { sShape, sCoord } from '~/scripts/system';
import { Line, Circle, Arrow } from '~/scripts/node/shape';
import { Vector2, Line2D } from 'math-lab';

interface IShapes {
  /** 直線 */
  line    : Line,
  dir     : Arrow,
  pointerP: Circle;
  pointerV: Circle;
}

/******************************************************************************
 * Line
 *****************************************************************************/
export default class LineGroup  extends GroupBase {

  constructor(point:Vector2, dir:Vector2) {
    super();
    this.data = new Line2D(point, dir.normalize);
    this.shapes = this.createShapes();
    this.sync();
    sShape.map(this.shapes as any, (s) => { this.add(s); });
  }

  /** 線クラス */
  data:Line2D;

  /** 図形リスト */
  private shapes:IShapes;

  //---------------------------------------------------------------------------
  // 同期処理
  //---------------------------------------------------------------------------
  /** MathLab.Line2Dの内容とShapesの位置を同期 */
  public sync() {
    this.syncLine();
    this.syncArrow();
    this.syncPointerP();
    this.syncPointerV();
  }

  private syncLine() {
    if(!this.shapes.line.visible()) return;
    this.shapes.line.points(this.points);
  }
  private syncArrow() {
    if(!this.shapes.dir.visible()) return;
    const { p } = this.data;
    const v = this.data.getPoint(1);
    this.shapes.dir.points([p.x, p.y, v.x, v.y]);
  }

  private syncPointerP() {
    if(!this.shapes.pointerV.visible()) return;
    const { p } = this.data;
    this.shapes.pointerP.pos(p.x, p.y);
  }
  private syncPointerV() {
    if(!this.shapes.pointerV.visible()) return;
    const { p, v } = this.data;
    this.shapes.pointerV.pos(p.x + v.x, p.y + v.y);
  }

  //---------------------------------------------------------------------------
  // 属性設定メソッド
  //---------------------------------------------------------------------------
  visibleDirArrow(v:boolean) {
    this.shapes.dir.visible(v);
    this.syncArrow();
    return this;
  }

  //---------------------------------------------------------------------------
  // その他
  //---------------------------------------------------------------------------
  private createShapes():IShapes {
    return {
      line: sShape.solidLine().strokeWidth(1),
      pointerP: sShape.draggablePoint()
        .on('dragmove', this.onDragMovePointerP.bind(this)),
      pointerV: sShape.draggablePoint()
        .on('dragmove', this.onDragMovePointerV.bind(this)),
      dir : sShape.arrow().visible(false),
    }
  }

  onDragMovePointerP(e:Circle) {
    this.data.p.x = e.x();
    this.data.p.y = e.y();
    this.sync();
  }

  onDragMovePointerV(e:Circle) {
    const { p } = this.data;
    
    const v = Vector2.sub(new Vector2(e.x(), e.y()), p).normalize;
    this.data.v.x = v.x;
    this.data.v.y = v.y;
    this.sync();
  }

  private get points() {
    const s = this.data.getPoint(sCoord.left * 3);
    const e = this.data.getPoint(sCoord.right * 3);
    return [s.x, s.y, e.x, e.y];
  }

}