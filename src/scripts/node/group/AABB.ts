import GroupBase from './GroupBase';
import { sShape } from '~/scripts/system';
import { Circle, Rect } from '~/scripts/node/shape';
import { Vector2, AABB2D } from 'math-lab';


interface IShapes {
  rect:Rect,
  pointerC:Circle,
  pointerR:Circle,
}

/******************************************************************************
 * Line
 *****************************************************************************/
export default class AABBGroup  extends GroupBase {

  constructor(center:Vector2, rx:number, ry:number) {
    super();
    this.binds(AABBGroup);
    this.data = new AABB2D(center, [rx, ry]);
    this.shapes = this.createShapes();
    this.sync();
    sShape.map(this.shapes as any, (s) => { this.add(s); });
  }

  /** 円クラス */
  data:AABB2D;

  /** 図形リスト */
  private shapes:IShapes;

  //---------------------------------------------------------------------------
  // 同期処理
  //---------------------------------------------------------------------------
  /** MathLab.Line2Dの内容とShapesの位置を同期 */
  public sync() {
    this.syncRect();
    this.syncPointerC();
    this.syncpointerR();
  }

  private syncRect() {
    if(!this.shapes.rect.visible()) return;
    const { c, width, height, rx, ry } = this.data;
    this.shapes.rect.pos(c).width(width).height(height).offset(-rx, ry);
  }

  private syncPointerC() {
    if(!this.shapes.pointerC.visible()) return;
    this.shapes.pointerC.pos(this.data.c);
  }

  private syncpointerR() {
    if(!this.shapes.pointerR.visible()) return;
    this.shapes.pointerR.pos(this.data.p2);
  }

  //---------------------------------------------------------------------------
  // 属性設定メソッド
  //---------------------------------------------------------------------------
  visiblePointers(v:boolean) {
    this.visiblePointerC(v);
    this.visiblePointerR(v);
    return this;
  }
  visiblePointerC(v:boolean) {
    return this.visibleAndSync(v, this.shapes.pointerC, this.syncPointerC);
  }
  visiblePointerR(v:boolean) {
    return this.visibleAndSync(v, this.shapes.pointerR, this.syncpointerR);
  }

  stroke(v:string) {
    this.shapes.rect.stroke(v); return this;
  }

  //---------------------------------------------------------------------------
  // その他
  //---------------------------------------------------------------------------
  private createShapes():IShapes {
    return {
      rect: sShape.rect(),
      pointerC: sShape.draggablePoint().visible(false)
        .on('dragmove', this.onDragMovePointerC.bind(this)),
      pointerR: sShape.draggablePoint().visible(false)
        .on('dragmove', this.onDragMovePointerR.bind(this)),
    }
  }

  private onDragMovePointerC(e:Circle) {
    this.data.c.copy(e.pos());
    this.sync();
  }

  private onDragMovePointerR(e:Circle) {
    const { c } = this.data;
    const v = Vector2.sub(c, e.pos());
    this.data.rx = Math.abs(v.x);
    this.data.ry = Math.abs(v.y);
    this.sync();
  }
}