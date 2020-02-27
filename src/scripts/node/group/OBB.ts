import GroupBase from './GroupBase';
import { sShape, sColor } from '~/scripts/system';
import { Circle, Rect } from '~/scripts/node/shape';
import { Vector2, OBB2D } from 'math-lab';

interface IShapes {
  rect:Rect,
  pointerC:Circle,
  pointerR:Circle,
  pointerA:Circle,
}

/******************************************************************************
 * OBB
 *****************************************************************************/
export default class OBBGroup  extends GroupBase {

  constructor(center:Vector2, rx:number, ry:number, angle:number) {
    super();
    this.binds(OBBGroup);
    this.data = new OBB2D(center, [rx, ry], angle);
    this.shapes = this.createShapes();
    this.sync();
    sShape.map(this.shapes as any, (s) => { this.add(s); });
  }

  /** 円クラス */
  data:OBB2D;

  /** 図形リスト */
  private shapes:IShapes;

  //---------------------------------------------------------------------------
  // 同期処理
  //---------------------------------------------------------------------------
  /** MathLab.Line2Dの内容とShapesの位置を同期 */
  public sync() {
    this.syncRect();
    this.syncPointerC();
    this.syncPointerR();
    this.syncPointerA();
  }

  private syncRect() {
    if(!this.shapes.rect.visible()) return;
    const { c, width, height, rx, ry, angle } = this.data;
    this.shapes.rect.pos(c).width(width).height(height).offset(-rx, ry).rotation(-angle);
  }

  private syncPointerC() {
    if(!this.shapes.pointerC.visible()) return;
    this.shapes.pointerC.pos(this.data.c);
  }

  private syncPointerR() {
    if(!this.shapes.pointerR.visible()) return;
    this.shapes.pointerR.pos(Vector2.add(this.data.c, this.data.r));
  }

  private syncPointerA() {
    if(!this.shapes.pointerA.visible()) return;
    const p = this.shapes.pointerA.pos();
    p.set(this.data.r.x, 0).rotate(this.data.rad).add(this.data.c);
    this.shapes.pointerA.pos(p);
  }

  //---------------------------------------------------------------------------
  // 属性設定メソッド
  //---------------------------------------------------------------------------
  visiblePointers(v:boolean) {
    this.visiblePointerC(v).visiblePointerR(v).visiblePointerA(v);
    return this;
  }
  visiblePointerC(v:boolean) {
    return this.visibleAndSync(v, this.shapes.pointerC, this.syncPointerC);
  }
  visiblePointerR(v:boolean) {
    return this.visibleAndSync(v, this.shapes.pointerR, this.syncPointerR);
  }
  visiblePointerA(v:boolean) {
    return this.visibleAndSync(v, this.shapes.pointerA, this.syncPointerA);
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
      pointerA: sShape.draggablePoint().stroke(sColor.red).fill("").visible(true)
        .on('dragmove', this.onDragMovePointerA.bind(this)),
    }
  }

  private onDragMovePointerC(e:Circle) {
    this.data.c.copy(e.pos());
    this.sync();
  }

  private onDragMovePointerA(e:Circle) {
    const { c } = this.data;
    this.data.rad = Vector2.sub(e.pos(), c).rad;
    this.sync();
  }

  private onDragMovePointerR(e:Circle) {
    const v = Vector2.sub(this.data.c, e.pos());
    this.data.rx = Math.abs(v.x);
    this.data.ry = Math.abs(v.y);
    this.sync();
  }
}