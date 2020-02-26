import GroupBase from './GroupBase';
import { sShape } from '~/scripts/system';
import { Circle, Arrow } from '~/scripts/node/shape';
import { Vector2, Segment2D } from 'math-lab';

interface IShapes {
  /** 直線 */
  arrow    : Arrow,
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
    this.syncArrow();
    this.syncPointerP1();
    this.syncPointerP2();
  }

  private syncArrow() {
    if(!this.shapes.arrow.visible()) return;
    this.shapes.arrow.points(this.points);
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

  //---------------------------------------------------------------------------
  // その他
  //---------------------------------------------------------------------------
  private createShapes():IShapes {
    return {
      pointerP1: sShape.draggablePoint()
      .on('dragmove', this.onDragMovePointerP1.bind(this)),
      pointerP2: sShape.draggablePoint()
      .on('dragmove', this.onDragMovePointerP2.bind(this)),
      arrow: sShape.arrow(),
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