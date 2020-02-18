import SceneBase from '~/scripts/scene/SceneBase';
import { sShape, sColor } from '~/scripts/system';
import { Circle } from '~/scripts/node/shape';
import { Vector2 } from 'math-lab';
import { GUI, Util } from '~/scripts/helper';

/******************************************************************************
 * ベクトル　ベクトルの成分
 *****************************************************************************/
export default class Vector02 extends SceneBase 
{  
  constructor() {
    super();
  }

  //---------------------------------------------------------------------------
  // Overrideするプロパティ
  //---------------------------------------------------------------------------
  protected get title() {
    return "ベクトルの成分";
  }

  protected get description() {
    return `
- ベクトルの*xの量*を**x成分**と呼び
- ベクトルの*yの量*を**y成分**と呼ぶ
`;
  }

  //---------------------------------------------------------------------------
  // Parameters
  //---------------------------------------------------------------------------
  params = {
    a: new Vector2(0, 0),
    b: new Vector2(3, 4),
    v: new Vector2(0, 0)
  }

  //---------------------------------------------------------------------------
  // GUI
  //---------------------------------------------------------------------------
  initGUI() {
    const f3 = this.gui.addFolder("ベクトルABの成分");
    GUI.addLSN(f3, this.params.v, "x");
    GUI.addLSN(f3, this.params.v, "y");
    f3.open();

    const f1 = this.gui.addFolder("始点(A)");
    GUI.addSLR(f1, this.params.a, "x");
    GUI.addSTD(f1, this.params.a, "y");
    f1.open();

    const f2 = this.gui.addFolder("終点(B)");
    GUI.addSLR(f2, this.params.b, "x");
    GUI.addSLR(f2, this.params.b, "y");
    f2.open();
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

  initGraph() {

    this.add(this.arrow);
    this.add(this.line);
    this.add(this.labelA);
    this.add(this.labelB);
    this.add(this.labelX);
    this.add(this.labelY);
    this.add(this.pointA);
    this.add(this.pointB);

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
    const { b, v } = this.params;
    const bias = v.normalize;
    bias.x *= 0.2;
    bias.y *= 0.2;
    this.pointB.pos(b.x, b.y).offset(bias.x, bias.y);
    this.labelB.pos(b.x, b.y);
  }

  updateXY() {
    const { a, b, v } = this.params;
    this.labelX.x(a.x + v.x / 2).y(a.y)
      .text("x="+Util.round(v.x).toString());

    this.labelY.x(b.x).y(a.y + v.y /2)
      .text("y="+Util.round(v.y).toString());
  }

  updateArrow() {
    const { a, b, v } = this.params;
    const ab = Vector2.sub(b, a);

    v.x = ab.x;
    v.y = ab.y;

    this.arrow.points([a.x, a.y, b.x, b.y]);
  }
}