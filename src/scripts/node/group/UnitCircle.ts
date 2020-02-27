import GroupBase from './GroupBase';
import { sShape, sColor } from '~/scripts/system';
import { Circle, Line, Text, Wedge } from '~/scripts/node/shape';
import { Vector2, Util } from 'math-lab';

interface IShapes {
  circle : Circle,
  aux1   : Line,
  p      : Circle,
  labelR : Text,
  labelT : Text,
  labelL : Text,
  labelD : Text,
  labelS : Text,
  labelC : Text,
  sin    : Circle,
  cos    : Circle,
  aux2   : Line,
  angle  : Wedge,
  theta  : Text,
}

/******************************************************************************
 * UnitCircle
 *****************************************************************************/
export default class UnitCircle  extends GroupBase {

  constructor(radius:number, radian:number) {
    super();
    this._radius = radius;
    this._radian = radian;
    this.shapes = this.createShapes();
    this.sync();
    sShape.map(this.shapes as any, (s) => { this.add(s); });
  }

  /** データ */
  private _radius:number; // 半径
  private _radian:number; // 角度(ラジアン)

  get radius() { return this._radius; }
  get radian() { return this._radian; }

  /** 図形リスト */
  private shapes:IShapes;

  //---------------------------------------------------------------------------
  // 同期処理
  //---------------------------------------------------------------------------
  /** MathLab.Line2Dの内容とShapesの位置を同期 */
  public sync() {
    const radian = this._radian;
    const radius = this._radius;
    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;
    const pos = Vector2.right.times(this.radius).rotate(this.radian);

    if (this.shapes.p.visible()) {  
      this.shapes.p.pos(pos);
    }

    this.shapes.labelS.pos(0, y)
      .text("sinθ=" + Util.round(Math.sin(radian), 2).toString())
    this.shapes.labelC.pos(x, 0)
      .text("cosθ=" + Util.round(Math.cos(radian), 2).toString());
    this.shapes.sin.pos(0, y);
    this.shapes.cos.pos(x, 0);

    this.shapes.aux1.points([0, 0, pos.x, pos.y])
    this.shapes.aux2.points([x, 0, x, y, 0, y])

    const angle = Util.rad2deg(radian);
    this.shapes.angle.angle(angle).rotation(-angle);
    this.shapes.theta.text(`θ = ${Util.round(angle)}`);
  }

  //---------------------------------------------------------------------------
  // 属性設定メソッド
  //---------------------------------------------------------------------------


  //---------------------------------------------------------------------------
  // その他
  //---------------------------------------------------------------------------
  private createShapes():IShapes {
    const r = this._radius;
    return {
      circle: sShape.circle().pos(0, 0).radius(r),
      angle: sShape.wedge().pos(0, 0),
      aux1: sShape.auxLine().stroke(sColor.main),
      labelR: sShape.text("1").pos(r, 0.5),
      labelT: sShape.text("1").pos(0, r+0.5),
      labelL: sShape.text("-1").pos(-r -.5, 0.5),
      labelD: sShape.text("-1").pos(0, -r),
      labelS   : sShape.text("sinθ"),
      labelC   : sShape.text("cosθ"),
      sin: sShape.point(),
      cos: sShape.point(),
      aux2: sShape.auxLine().dash(0.1),
      theta: sShape.text().pos(0.5, 0.5).fontSize(0.25),
      p : sShape.draggablePoint().on('dragmove', this.onDragMoveP.bind(this)),
    }
  }

  onDragMoveP(e:Circle) {
    this._radian = e.pos().rad;
    this.sync();
  }


}