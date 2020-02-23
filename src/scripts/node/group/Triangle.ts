import GroupBase from './GroupBase';
import { sShape, sColor } from '~/scripts/system';
import { Line, Circle, Text, Wedge } from '~/scripts/node/shape';
import { Vector2, Util, Triangle } from 'math-lab';
import { Util as MyUtil } from '~/scripts/helper'
import ShapeBase from '../shape/ShapeBase';
import Konva from 'konva';

interface IShapes 
{
  // 三角形の３点を動かすためのポインター
  pointerA    : Circle,
  pointerB    : Circle,
  pointerC    : Circle,

  // 三角形の３点を示すラベル
  labelA      : Text,
  labelB      : Text,
  labelC      : Text,

  // 三角形と３辺
  main        : Line,
  AB          : Line,
  BC          : Line,
  CA          : Line,
  labelAB     : Text,
  labelBC     : Text,
  labelCA     : Text,

  // ３辺の長さ
  a           : Text,
  b           : Text,
  c           : Text,

  // ３つの角を表す扇型
  A           : Wedge,
  B           : Wedge,
  C           : Wedge,

  // ３つの角度
  angleA      : Text,
  angleB      : Text,
  angleC      : Text,

  // 名前
  name        : Text,

  // 重心、外心、内心を表す点
  center      : Circle,
  outerCenter : Circle,
  innerCenter : Circle,

  // 外接円と内接円
  outerCircle : Circle,
  innerCircle : Circle,
}

/******************************************************************************
 * Triangle
 *****************************************************************************/
export default class TriangleGroup extends GroupBase {

  constructor(points:number[]) {
    super();
    this.binds();

    this.data = new Triangle(points);
    this.shapes = this.createShapes();
    this.sync();
    sShape.map(this.shapes as any, (s) => { this.add(s); })
  }

  /** 三角形クラスインスタンス */
  data:Triangle;

  /** 図形リスト */
  private shapes:IShapes;

  //---------------------------------------------------------------------------
  // 同期処理
  //---------------------------------------------------------------------------
  /** MathLab.Triangleの内容とShapesの位置を同期 */
  public sync() {

    this.syncMain();
    this.syncName();

    this.syncAB();
    this.syncBC();
    this.syncCA();

    this.syncLabelAB();
    this.syncLabelBC();
    this.syncLabelCA();

    this.syncLengthA();
    this.syncLengthB();
    this.syncLengthC();

    this.syncPointerA();
    this.syncPointerB();
    this.syncPointerC();

    this.syncLabelA();
    this.syncLabelB();
    this.syncLabelC();

    this.syncWedgeA();
    this.syncWedgeB();
    this.syncWedgeC();

    this.syncAngleA();
    this.syncAngleB();
    this.syncAngleC();

    this.syncCenter();
    this.syncOuterCenter();
    this.syncInnerCenter();
    this.syncOuterCircle();
    this.syncInnerCircle();
  }

  //---------------------------------------------------------------------------
  // 三角形
  private syncMain() {
    if (!this.shapes.main.visible()) return;
    this.shapes.main.points(this.points);
  }
  private syncName() {
    if (!this.shapes.name.visible()) return;

    const { center } = this.data;
    this.shapes.name.pos(center.x, center.y);
  }

  //---------------------------------------------------------------------------
  // ３辺
  private syncAB() {
    this.syncSide(this.shapes.AB, this.pointsAB);
  }
  private syncBC() {
    this.syncSide(this.shapes.BC, this.pointsBC);
  }
  private syncCA() {
    this.syncSide(this.shapes.CA, this.pointsCA);
  }
  private syncSide(shape:Line, points:number[]) {
    if (!shape.visible()) return;
    shape.points(points);
  }

  //---------------------------------------------------------------------------
  // ３辺のラベル
  private syncLabelAB() {
    this.syncLabelSide(this.shapes.labelAB, this.data.A, this.data.AB);
  }
  private syncLabelBC() {
    this.syncLabelSide(this.shapes.labelBC, this.data.B, this.data.BC);
  }
  private syncLabelCA() {
    this.syncLabelSide(this.shapes.labelCA, this.data.C, this.data.CA);
  }

  private syncLabelSide(shape:Text, pos:Vector2, side:Vector2) {

    const { innerCenter:base } = this.data;

    // 辺の半分の位置ベクトル
    const half = Vector2.add(pos, side.clone().times(0.5));

    // 内心から辺の半分の位置へ向かうベクトル
    const t = Vector2.sub(half,  base);
    const length = t.magnitude;
    
    const toSide = Vector2.times(t.normalize, length + 0.4);

    shape.pos(base.x + toSide.x, base.y + toSide.y);
  }

  //---------------------------------------------------------------------------
  // ３辺の長さ
  private syncLengthA() {
    this.syncLength(this.shapes.a, this.data.B, this.data.BC);
  }
  private syncLengthB() {
    this.syncLength(this.shapes.b, this.data.C, this.data.CA);
  }
  private syncLengthC() {
    this.syncLength(this.shapes.c, this.data.A, this.data.AB);
  }
  private syncLength(shape:Text, pos:Vector2, side:Vector2) {
    if (!shape.visible()) return;
    shape
      .text(MyUtil.round(side.magnitude, 1).toString())
      .pos(pos.x + side.x / 2, pos.y + side.y / 2);
  }

  //---------------------------------------------------------------------------
  // ３頂点を動かすためのポインター
  private syncPointerA() {
    this.syncPointer(this.shapes.pointerA, this.data.A);
  }

  private syncPointerB() {
    this.syncPointer(this.shapes.pointerB, this.data.B);
  }

  private syncPointerC() {
    this.syncPointer(this.shapes.pointerC, this.data.C);
  }

  private syncPointer(shape:Circle, pos:Vector2) {
    if (!shape.visible()) return;
    shape.pos(pos.x, pos.y);
  }

  //---------------------------------------------------------------------------
  // ３頂点のラベル
  private syncLabelA() {
    this.syncLabel(this.shapes.labelA, this.data.A);
  }
  private syncLabelB() {
    this.syncLabel(this.shapes.labelB, this.data.B);
  }
  private syncLabelC() {
    this.syncLabel(this.shapes.labelC, this.data.C);
  }

  private syncLabel(text:Text, pos:Vector2) {
    if (!text.visible()) return;
    // 補正値
    const bias = Vector2.sub(pos, this.data.center).normalize.times(0.3);
    pos = Vector2.add(pos, bias);
    text.pos(pos.x, pos.y);
  }

  //---------------------------------------------------------------------------
  // ３つの角
  private syncWedgeA() {
    const { A, CA, AB } = this.data;
    this.syncWedge(this.shapes.A, A, CA, AB, this.angleA);
  }
  private syncWedgeB() {
    const { B, AB, BC } = this.data;
    this.syncWedge(this.shapes.B, B, AB, BC, this.angleB);
  }
  private syncWedgeC() {
    const { C, BC, CA } = this.data;
    this.syncWedge(this.shapes.C, C, BC, CA, this.angleC);
  }

  /**
   * 三角形の角に表示する角度を示す扇型図形の位置合わせ
   * 角Aの処理をする場合に指定する２つの辺は
   * CA -> AB のように間にAがくる順で指定すること。
   * @param shape 扇図形インスタンス
   * @param pos 座標
   * @param side1 角を挟む辺1
   * @param side2 角を挟む辺2
   * @param angle ２つの辺の間の角度
   */
  private syncWedge(shape:Wedge, pos:Vector2, side1:Vector2, side2:Vector2, angle:number) {
    if (!shape.visible()) return;
    const invSide1 = side1.clone().times(-1);
    const cross = Vector2.cross(invSide1, side2);

    const base = (0 <= cross)? side2 : invSide1;
    let rotation = Util.rad2deg(Math.atan2(base.y, base.x));

    shape
      .pos(pos.x, pos.y)
      .angle(angle)
      .rotation(-rotation);
  }

  //---------------------------------------------------------------------------
  // ３点の角度
  private syncAngleA() {
    this.syncAngle(this.shapes.angleA, this.data.A, this.angleA);
  }
  private syncAngleB() {
    this.syncAngle(this.shapes.angleB, this.data.B, this.angleB);
  }
  private syncAngleC() {
    this.syncAngle(this.shapes.angleC, this.data.C, this.angleC);
  }

  private syncAngle(shape:Text, pos:Vector2, angle:number) {
    if (!shape.visible()) return;
    const bias = Vector2.sub(pos, this.data.center).normalize.times(0.6);
    pos = Vector2.sub(pos, bias);
    shape
      .text(MyUtil.round(angle, 1).toString())
      .pos(pos.x, pos.y);
  }

  //---------------------------------------------------------------------------
  // 重心、外心、内心
  private syncCenter() {
    this.syncCenterAt(this.shapes.center, this.data.center);
  }
  private syncOuterCenter() {
    this.syncCenterAt(this.shapes.outerCenter, this.data.outerCenter);
  }
  private syncInnerCenter() {
    this.syncCenterAt(this.shapes.innerCenter, this.data.innerCenter);
  }
  private syncCenterAt(shape:Circle, pos:Vector2) {
    if (!shape.visible()) return;
    shape.pos(pos.x, pos.y)
  }

  //---------------------------------------------------------------------------
  // 外接円、内接円
  private syncOuterCircle() {
    this.syncCircle(this.shapes.outerCircle, this.data.outerCenter, this.data.outerRadius);
  }
  private syncInnerCircle() {
    this.syncCircle(this.shapes.innerCircle, this.data.innerCenter, this.data.innerRadius);
  }
  private syncCircle(shape:Circle, center:Vector2, radius:number) {
    if (!shape.visible()) return;
    shape.pos(center.x, center.y).radius(radius);
  }

  //---------------------------------------------------------------------------
  // 属性設定メソッド
  //---------------------------------------------------------------------------
  visibleAll(v:boolean) {
    sShape.map(this.shapes as any, (s) => { s.visible(v); }); 
    this.sync();
    return this;
  }

  //---------------------------------------------------------------------------
  // ３頂点を動かすためのポインター
  visiblePointer(v:boolean){
    return this.visiblePointerA(v).visiblePointerB(v).visiblePointerC(v);
  }
  visiblePointerA(v:boolean) {
    return this.visibleAndSync(v, this.shapes.pointerA, this.syncPointerA);
  }
  visiblePointerB(v:boolean) {
    return this.visibleAndSync(v, this.shapes.pointerB, this.syncPointerB);
  }
  visiblePointerC(v:boolean) {
    return this.visibleAndSync(v, this.shapes.pointerC, this.syncPointerC);
  }

  //---------------------------------------------------------------------------
  // 三角形
  visibleMain(v:boolean) {
    return this.visibleAndSync(v, this.shapes.main, this.syncMain);
  }

  //---------------------------------------------------------------------------
  // 名前
  visibleName(v:boolean) {
    return this.visibleAndSync(v, this.shapes.name, this.syncName);
  }
  name(v:string) {
    this.shapes.name.text(v);
    return this;
  }

  //---------------------------------------------------------------------------
  // ３辺
  visibleSide(v:boolean) {
    return this.visibleAB(v).visibleBC(v).visibleCA(v);
  }
  visibleAB(v:boolean) {
    return this.visibleAndSync(v, this.shapes.AB, this.syncAB);
  }
  visibleBC(v:boolean) {
    return this.visibleAndSync(v, this.shapes.BC, this.syncBC);
  }
  visibleCA(v:boolean) {
    return this.visibleAndSync(v, this.shapes.CA, this.syncCA);
  }

  //---------------------------------------------------------------------------
  // ３辺のラベル
  visibleLabelSide(v:boolean) {
    this.visibleLabelAB(v).visibleLabelBC(v).visibleLabelCA(v);
  }
  visibleLabelAB(v:boolean)  {
    return this.visibleAndSync(v, this.shapes.labelAB, this.syncLabelAB);
  }
  visibleLabelBC(v:boolean)  {
    return this.visibleAndSync(v, this.shapes.labelBC, this.syncLabelBC);
  }
  visibleLabelCA(v:boolean)  {
    return this.visibleAndSync(v, this.shapes.labelCA, this.syncLabelCA);
  }

  //---------------------------------------------------------------------------
  // ３辺の長さ
  visibleLength(v:boolean) {
    return this.visibleLengthA(v).visibleLengthB(v).visibleLengthC(v);
  }
  visibleLengthA(v:boolean) {
    return this.visibleAndSync(v, this.shapes.a, this.syncLengthA);
  }
  visibleLengthB(v:boolean) {
    return this.visibleAndSync(v, this.shapes.b, this.syncLengthB);
  }
  visibleLengthC(v:boolean) {
    return this.visibleAndSync(v, this.shapes.c, this.syncLengthC);
  }
  //---------------------------------------------------------------------------
  // ３頂点ラベル
  visibleLabel(v:boolean) {
    return this.visibleLabelA(v).visibleLabelB(v).visibleLabelC(v);
  }
  visibleLabelA(v:boolean) {
    return this.visibleAndSync(v, this.shapes.labelA, this.syncLabelA);
  }
  visibleLabelB(v:boolean) {
    return this.visibleAndSync(v, this.shapes.labelB, this.syncLabelB);
  }
  visibleLabelC(v:boolean) {
    return this.visibleAndSync(v, this.shapes.labelC, this.syncLabelC);
  }

  //---------------------------------------------------------------------------
  // ３つの角
  visibleWedge(v:boolean) {
    this.visibleWedgeA(v).visibleWedgeB(v).visibleWedgeC(v);
  }
  visibleWedgeA(v:boolean) {
    return this.visibleAndSync(v, this.shapes.A, this.syncWedgeA);
  }
  visibleWedgeB(v:boolean) {
    return this.visibleAndSync(v, this.shapes.B, this.syncWedgeB);
  }
  visibleWedgeC(v:boolean) {
    return this.visibleAndSync(v, this.shapes.C, this.syncWedgeC);
  }

  //---------------------------------------------------------------------------
  // ３つの角度
  visibleAngle(v:boolean) {
    return this.visibleAngleA(v).visibleAngleB(v).visibleAngleC(v);
  }
  visibleAngleA(v:boolean) {
    return this.visibleAndSync(v, this.shapes.angleA, this.syncAngleA);
  }
  visibleAngleB(v:boolean) {
    return this.visibleAndSync(v, this.shapes.angleB, this.syncAngleB);
  }
  visibleAngleC(v:boolean) {
    return this.visibleAndSync(v, this.shapes.angleC, this.syncAngleC);
  }
  private visibleAndSync(v:boolean, shape:ShapeBase<Konva.Shape>, syncFunc:Function) {
    shape.visible(v);
    syncFunc();
    return this;
  }

  //---------------------------------------------------------------------------
  // 重心、外心、内心
  visibleCenter(v:boolean) {
    return this.visibleAndSync(v, this.shapes.center, this.syncCenter);
  }
  visibleOuterCenter(v:boolean) {
    return this.visibleAndSync(v, this.shapes.outerCenter, this.syncOuterCenter);
  }
  visibleInnerCenter(v:boolean) {
    return this.visibleAndSync(v, this.shapes.innerCenter, this.syncInnerCenter);
  }

  //---------------------------------------------------------------------------
  // 内接円、外接円
  visibleOuterCircle(v:boolean) {
    return this.visibleAndSync(v, this.shapes.outerCircle, this.syncOuterCircle);
  }
  visibleInnerCircle(v:boolean) {
    return this.visibleAndSync(v, this.shapes.innerCircle, this.syncInnerCircle);
  }

  //---------------------------------------------------------------------------
  // Private
  //---------------------------------------------------------------------------
  private createShapes():IShapes {
    return {
      pointerA    : sShape.draggablePoint().on('dragmove', this.onDragMovePointerA),
      pointerB    : sShape.draggablePoint().on('dragmove', this.onDragMovePointerB),
      pointerC    : sShape.draggablePoint().on('dragmove', this.onDragMovePointerC),
      A           : sShape.wedge().radius(0.3),
      B           : sShape.wedge().radius(0.3),
      C           : sShape.wedge().radius(0.3),
      main        : sShape.solidLine().strokeWidth(2).closed(true),
      AB          : sShape.solidLine().stroke(sColor.red).visible(false),
      BC          : sShape.solidLine().stroke(sColor.red).visible(false),
      CA          : sShape.solidLine().stroke(sColor.red).visible(false),
      labelAB     : sShape.text("c").fontSize(0.2).offset(-0.1, 0),
      labelBC     : sShape.text("a").fontSize(0.2).offset(-0.1, 0),
      labelCA     : sShape.text("b").fontSize(0.2).offset(-0.1, 0),
      labelA      : sShape.text("A").fontSize(0.25).offset(-0.1, 0.12),
      labelB      : sShape.text("B").fontSize(0.25).offset(-0.1, 0.12),
      labelC      : sShape.text("C").fontSize(0.25).offset(-0.1, 0.12),
      angleA      : sShape.text().fontSize(0.2).offset(-0.1, 0.1),
      angleB      : sShape.text().fontSize(0.2).offset(-0.1, 0.1),
      angleC      : sShape.text().fontSize(0.2).offset(-0.1, 0.1),
      name        : sShape.text("O").fontSize(0.25).offset(-0.1, 0.12),
      center      : sShape.point().radius(0.05),
      outerCenter : sShape.point().radius(0.05),
      innerCenter : sShape.point().radius(0.05),
      outerCircle : sShape.circle(),
      innerCircle : sShape.circle(),
      a           : sShape.text().fontSize(0.2),
      b           : sShape.text().fontSize(0.2),
      c           : sShape.text().fontSize(0.2),
    }
  }

  onDragMovePointerA(e:Circle) {
    this.data.A.x = e.x();
    this.data.A.y = e.y();
    this.sync();
  }
  onDragMovePointerB(e:Circle) {
    this.data.B.x = e.x();
    this.data.B.y = e.y();
    this.sync();
  }
  onDragMovePointerC(e:Circle) {
    this.data.C.x = e.x();
    this.data.C.y = e.y();
    this.sync();
  }

  /** bindが必要なメソッドをまとめて定義 */
  private binds() {
    this.onDragMovePointerA = this.onDragMovePointerA.bind(this);
    this.onDragMovePointerB = this.onDragMovePointerB.bind(this);
    this.onDragMovePointerC = this.onDragMovePointerC.bind(this);
    this.syncPointerA       = this.syncPointerA.bind(this);
    this.syncPointerB       = this.syncPointerB.bind(this);
    this.syncPointerC       = this.syncPointerC.bind(this);
    this.syncMain           = this.syncMain.bind(this);
    this.syncName           = this.syncName.bind(this);
    this.syncAB             = this.syncAB.bind(this);
    this.syncBC             = this.syncBC.bind(this);
    this.syncCA             = this.syncCA.bind(this);
    this.syncLabelAB        = this.syncLabelAB.bind(this);
    this.syncLabelBC        = this.syncLabelBC.bind(this);
    this.syncLabelCA        = this.syncLabelCA.bind(this);
    this.syncLengthA        = this.syncLengthA.bind(this);
    this.syncLengthB        = this.syncLengthB.bind(this);
    this.syncLengthC        = this.syncLengthC.bind(this);
    this.syncLabelA         = this.syncLabelA.bind(this);
    this.syncLabelB         = this.syncLabelB.bind(this);
    this.syncLabelC         = this.syncLabelC.bind(this);
    this.syncWedgeA         = this.syncWedgeA.bind(this);
    this.syncWedgeB         = this.syncWedgeB.bind(this);
    this.syncWedgeC         = this.syncWedgeC.bind(this);
    this.syncAngleA         = this.syncAngleA.bind(this);
    this.syncAngleB         = this.syncAngleB.bind(this);
    this.syncAngleC         = this.syncAngleC.bind(this);
    this.syncCenter         = this.syncCenter.bind(this);
    this.syncOuterCenter    = this.syncOuterCenter.bind(this);
    this.syncInnerCenter    = this.syncInnerCenter.bind(this);
    this.syncOuterCircle    = this.syncOuterCircle.bind(this);
    this.syncInnerCircle    = this.syncInnerCircle.bind(this);
  }

  //---------------------------------------------------------------------------
  // 三角形、及び各辺の座標
  private get points() {
    const { A, B, C } = this.data;
    return [A.x, A.y, B.x, B.y, C.x, C.y];
  }
  private get pointsAB() {
    const p = this.points;
    return [p[0], p[1], p[2], p[3]];
  }
  private get pointsBC() {
    const p = this.points;
    return [p[2], p[3], p[4], p[5]];
  }
  private get pointsCA() {
    const p = this.points;
    return [p[4], p[5], p[0], p[1]];
  }

  //---------------------------------------------------------------------------
  // 角度

  private get angleA() {
    return Util.rad2deg(this.data.radA);
  }
  private get angleB() {
    return Util.rad2deg(this.data.radB);
  }
  private get angleC() {
    return Util.rad2deg(this.data.radC);
  }
}