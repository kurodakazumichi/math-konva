import GroupBase from './GroupBase';
import { sShape } from '~/scripts/system';
import { Circle, } from '~/scripts/node/shape';
import { Vector2, Circle2D } from 'math-lab';

interface IShapes {
  circle:Circle;
  pointerP:Circle;
  pointerR:Circle;
}

/******************************************************************************
 * Line
 *****************************************************************************/
export default class LineGroup  extends GroupBase {

  constructor(center:Vector2, radius:number) {
    super();
    this.binds(LineGroup);
    this.data = new Circle2D(center, radius);
    this.shapes = this.createShapes();
    this.sync();
    sShape.map(this.shapes as any, (s) => { this.add(s); });
  }

  /** 円クラス */
  data:Circle2D;

  /** 図形リスト */
  private shapes:IShapes;

  //---------------------------------------------------------------------------
  // 同期処理
  //---------------------------------------------------------------------------
  /** MathLab.Line2Dの内容とShapesの位置を同期 */
  public sync() {
    this.syncCircle();
    this.syncPointerP();
    this.syncPointerR();
  }

  private syncCircle() {
    if(!this.shapes.circle.visible()) return;

    const { p, r } = this.data;
    this.shapes.circle.radius(r);
    this.shapes.circle.pos(p)
  }

  private syncPointerP() {
    if(!this.shapes.pointerP.visible()) return;
    this.shapes.pointerP.pos(this.data.p);
  }

  private syncPointerR() {
    if(!this.shapes.pointerR.visible()) return;
    const p = this.data.p.clone();
    p.x += this.data.r;
    this.shapes.pointerR.pos(p)
  }

  //---------------------------------------------------------------------------
  // 属性設定メソッド
  //---------------------------------------------------------------------------
  fill(v:string) {
    this.shapes.circle.fill(v); return this;
  }
  stroke(v:string) {
    this.shapes.circle.stroke(v); return this;
  }

  visiblePointers(v:boolean) {
    return this.visiblePointerP(v).visiblePointerR(v);
  }

  visiblePointerP(v:boolean) {
    return this.visibleAndSync(v, this.shapes.pointerP, this.syncPointerP);
  }

  visiblePointerR(v:boolean) {
    return  this.visibleAndSync(v, this.shapes.pointerR, this.syncPointerR);
  }

  //---------------------------------------------------------------------------
  // その他
  //---------------------------------------------------------------------------
  private createShapes():IShapes {
    return {
      circle: sShape.circle(),
      pointerP: sShape.draggablePoint()
        .on('dragmove', this.onDragMovePointerP.bind(this)),
      pointerR: sShape.draggablePoint()
        .on('dragmove', this.onDragMovePointerR.bind(this)),
    }
  }

  onDragMovePointerP(e:Circle) {
    this.data.p.copy(e.pos());
    this.sync();
  }

  onDragMovePointerR(e:Circle) {
    this.data.r = Vector2.sub(this.data.p, e.pos()).magnitude;
    this.sync();
  }

}