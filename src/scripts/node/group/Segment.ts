import GroupBase from './GroupBase';
import { sShape } from '~/scripts/system';
import { Line, Circle, Arrow } from '~/scripts/node/shape';
import { Vector2, Segment2D } from 'math-lab';

interface IShapes {
  /** 直線 */
  line     : Line,
  dir      : Arrow,
  pointerP1: Circle;
  pointerP2: Circle;
}

/******************************************************************************
 * Segment
 *****************************************************************************/
export default class SegmentGroup  extends GroupBase {

  constructor(p1:Vector2, p2:Vector2) {
    super();
    this.data = new Segment2D(p1, p2);
    this.shapes = this.createShapes();
    this.sync();
    sShape.map(this.shapes as any, (s) => { this.add(s); });
  }

  /** 線クラス */
  data:Segment2D;

  /** 図形リスト */
  private shapes:IShapes;

  //---------------------------------------------------------------------------
  // 同期処理
  //---------------------------------------------------------------------------
  /** MathLab.Line2Dの内容とShapesの位置を同期 */
  public sync() {
    this.syncLine();
    this.syncArrow();
    this.syncPointerP1();
    this.syncPointerP2();
  }

  private syncLine() {
    if(!this.shapes.line.visible()) return;
    this.shapes.line.points(this.points);
  }
  private syncArrow() {
    if(!this.shapes.dir.visible()) return;
    const { p1, p2 } = this.data;
    
    this.shapes.dir.points([p1.x, p1.y, p2.x, p2.y]);
  }

  private syncPointerP1() {
    if(!this.shapes.pointerP1.visible()) return;
    const { p1 } = this.data;
    this.shapes.pointerP1.pos(p1.x, p1.y);
  }
  private syncPointerP2() {
    if(!this.shapes.pointerP2.visible()) return;
    const { p2 } = this.data;
    this.shapes.pointerP2.pos(p2.x, p2.y);
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
      pointerP1: sShape.draggablePoint()
        .on('dragmove', this.onDragMovePointerP1.bind(this)),
      pointerP2: sShape.draggablePoint()
        .on('dragmove', this.onDragMovePointerP2.bind(this)),
      dir : sShape.arrow().strokeWidth(1).visible(false),
    }
  }

  onDragMovePointerP1(e:Circle) {
    this.data.p1.x = e.x();
    this.data.p1.y = e.y();
    this.sync();
  }

  onDragMovePointerP2(e:Circle) {
    this.data.p2.x = e.x();
    this.data.p2.y = e.y();
    this.sync();
  }

  private get points() {
    const { p1, p2 } = this.data;
    return [p1.x, p1.y, p2.x, p2.y];
  }

}