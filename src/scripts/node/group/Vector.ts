import GroupBase from './GroupBase';
import { sShape, sColor, sCoord } from '~/scripts/system';
import { Circle, Arrow, Text, Line } from '~/scripts/node/shape';
import { Vector2, Segment2D, Linear } from 'math-lab';

interface IShapes {
  /** 直線 */
  arrow    : Arrow,
  pointerP1: Circle;
  pointerP2: Circle;
  name     : Text;
  aux      : Line,
}

/******************************************************************************
 * Vector
 *****************************************************************************/
export default class Vector  extends GroupBase {

  constructor(p1:Vector2, p2:Vector2) {
    super();
    this.binds(Vector);
    this.data = new Segment2D(p1, p2);
    this.shapes = this.createShapes();
    this.sync();
    sShape.map(this.shapes as any, (s) => { this.add(s); });
  }

  /** 線クラス */
  data:Segment2D;

  /** １次関数 */
  private linear:Linear = new Linear(0, 0);

  /** 図形リスト */
  private shapes:IShapes;

  get vec()  {
    return Vector2.sub(this.data.p2, this.data.p1);
  }

  //---------------------------------------------------------------------------
  // 同期処理
  //---------------------------------------------------------------------------
  /** MathLab.Line2Dの内容とShapesの位置を同期 */
  public sync() {
    this.syncArrow();
    this.syncPointerP1();
    this.syncPointerP2();
    this.syncName();
    this.syncAuxLine();
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

  private syncName() {
    if (!this.shapes.name.visible()) return;
    this.shapes.name.pos(this.data.p2);
  }

  private syncAuxLine() {
    if (!this.shapes.aux.visible()) return;
    const { p1, p2 } = this.data;
    this.linear.initBy2Point(p1.x, p1.y, p2.x, p2.y);
    this.shapes.aux.points([
      sCoord.left , this.linear.fx(sCoord.left),
      sCoord.right, this.linear.fx(sCoord.right)
    ])
  }

  //---------------------------------------------------------------------------
  // 属性設定メソッド
  //---------------------------------------------------------------------------
  visiblePointerP1(v:boolean) {
    return this.visibleAndSync(v, this.shapes.pointerP1, this.syncPointerP1);
  }
  visibleName(v:boolean) {
    return this.visibleAndSync(v, this.shapes.name, this.syncName);
  }
  visibleAuxLine(v:boolean) {
    return this.visibleAndSync(v, this.shapes.aux, this.syncAuxLine);
  }

  nameText(name:string) {
    this.shapes.name.text(name);
    return this;
  }
  //---------------------------------------------------------------------------
  // その他
  //---------------------------------------------------------------------------
  private createShapes():IShapes 
  {
    const pointerP1 = sShape.draggablePoint()
      .on('dragmove', this.onDragMovePointerP1.bind(this))

    const pointerP2 = sShape.draggablePoint()
      .on('dragmove', this.onDragMovePointerP2.bind(this))

    const arrow = sShape.arrow();
    
    const name  = sShape.text()
      .italic()
      .fontSize(0.2)
      .visible(false);

    const aux   = sShape.auxLine()
      .stroke(sColor.main)
      .dash(0.1)
      .visible(false)

    return {
      pointerP1, pointerP2,
      arrow,
      name,
      aux
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