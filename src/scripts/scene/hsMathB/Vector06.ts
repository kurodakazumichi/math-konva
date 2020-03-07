import SceneBase from '~/scripts/scene/SceneBase';
import { sShape, sColor } from '~/scripts/system';
import { Circle } from '~/scripts/node/shape';
import { Vector2 } from 'math-lab';
import { GUI as GUIHelper, Util } from '~/scripts/helper';

/******************************************************************************
 * ベクトル　逆ベクトル
 *****************************************************************************/
export default class Scene extends SceneBase 
{  
  constructor() {
    super();
    this.onChangeInverseInGui = this.onChangeInverseInGui.bind(this);
  }

  //---------------------------------------------------------------------------
  // Overrideするプロパティ
  //---------------------------------------------------------------------------
  protected get title() {
    return "逆ベクトル";
  }

  protected get overview() {
    return `
1. **逆ベクトル**とは、*大きさが同じで、向きが反対*のベクトルのこと
1. *x成分*と*y成分*の両方に**マイナスをかける**と逆ベクトルになる
1. $\\vec{a}$の逆ベクトルは$-\\vec{a}$ってかく
1. 点AからBへ向かうベクトル$\\vec{AB}$の逆ベクトルは$-\\vec{AB}$、また$\\vec{BA}$とも同じ
`;
  }

  //---------------------------------------------------------------------------
  // Parameters
  //---------------------------------------------------------------------------
  params = {
    a: new Vector2(0, 0),
    b: new Vector2(3, 4),
    v: new Vector2(0, 0),
    inverse: false,
  }

  //---------------------------------------------------------------------------
  // GUI
  //---------------------------------------------------------------------------
  initGUI() {
    
    const f1 = this.gui.addFolder("コマンド");
    f1.add(this.params, "inverse").onChange(this.onChangeInverseInGui);
    f1.open();

    const f2 = this.gui.addFolder("ベクトルABの成分");
    GUIHelper.addLSN(f2, this.params.v, "x");
    GUIHelper.addLSN(f2, this.params.v, "y");
    f2.open();

    const f3 = this.gui.addFolder("点(A)");
    GUIHelper.addSLR(f3, this.params.a, "x");
    GUIHelper.addSTD(f3, this.params.a, "y");
    f3.open();

    const f4 = this.gui.addFolder("点(B)");
    GUIHelper.addSLR(f4, this.params.b, "x");
    GUIHelper.addSLR(f4, this.params.b, "y");
    f4.open();
  }

  onChangeInverseInGui(inverse:boolean) {
    this.arrow.color(inverse? sColor.green:sColor.main);
  }

  //---------------------------------------------------------------------------
  // Graph
  //---------------------------------------------------------------------------

  /** グラフ内の要素 */
  private arrow = sShape.arrow();
  private line  = sShape.brokenLine().stroke(sColor.yellow);
  private pointA = sShape.draggablePoint().pos(0, 0);
  private pointB = sShape.draggablePoint();
  private labelA = sShape.text("A").fontSize(0.25);
  private labelB = sShape.text("B").fontSize(0.25);
  private labelX = sShape.text("x").fontSize(0.25).offsetX(-0.08);
  private labelY = sShape.text("y").fontSize(0.25).offsetY(0.1);
  private labelV = sShape.text().fontSize(0.25).italic();

  initGraph() {

    this.add(this.line);
    this.add(this.labelA);
    this.add(this.labelB);
    this.add(this.labelX);
    this.add(this.labelY);
    this.add(this.pointA);
    this.add(this.pointB);
    this.add(this.labelV);
    this.add(this.arrow);

    this.pointA.on('dragmove', (e:Circle) => {
      this.params.a.x = Util.round(e.x());
      this.params.a.y = Util.round(e.y());
    })
    this.pointB.on('dragmove', (e:Circle) => {
      this.params.b.x = Util.round(e.x());
      this.params.b.y = Util.round(e.y());
    })
  }

  //---------------------------------------------------------------------------
  // Update
  //---------------------------------------------------------------------------

  update() {

    this.updateArrow();
    this.updateA();
    this.updateB();
    this.updateLine();
    this.updateXY();
    this.updateLabelH();
    this.updateFontSize();
  }

  updateLabelH() {
    const v = Vector2.sub(this.params.b, this.params.a);
    this.labelV.text((this.params.inverse)? "-AB":"AB").pos(this.params.a.x + v.x/2, this.params.a.y + v.y/2);
  }

  updateLine() {
    const { a, b } = this.params;

    this.line.points([
      a.x, a.y,
      b.x, a.y,
      b.x, b.y,
    ])
  }

  updateA() {
    const { a } = this.params;
    this.pointA.pos(a.x, a.y);
    this.labelA.pos(a.x, a.y);
  }

  updateB() {
    const { b } = this.params;
    this.pointB.pos(b.x, b.y);
    this.labelB.pos(b.x, b.y);
  }

  updateXY() {
    const { a, b } = this.params;
    const v = Vector2.sub(b, a);
    
    this.labelX.x(a.x + v.x / 2).y(a.y)
      .text("x="+Util.round(this.params.v.x).toString());

    this.labelY.x(b.x).y(a.y + v.y /2)
      .text("y="+Util.round(this.params.v.y).toString());
  }

  updateArrow() {
    const { a, b, v } = this.params;
    const ab = Vector2.sub(b, a);

    v.x = ab.x;
    v.y = ab.y;

    if (this.params.inverse) {
      v.times(-1);
    }

    if (this.params.inverse) {
      this.arrow.points([b.x, b.y, a.x, a.y]);
    } else {
      this.arrow.points([a.x, a.y, b.x, b.y]);
    }

    // 零ベクトル
    this.arrow.visible(!Vector2.isZero(this.params.v));
  }

  updateFontSize() {
    const { v } = this.params;

    // ごちゃごちゃしすぎて見辛いのでラベルの表示制限
    const fs = Math.min(0.25, v.magnitude * 0.1)
    this.labelA.fontSize(fs);
    this.labelB.fontSize(fs);
    this.labelV.fontSize(fs);
    this.labelX.fontSize(fs);
    this.labelY.fontSize(fs);
  }
}