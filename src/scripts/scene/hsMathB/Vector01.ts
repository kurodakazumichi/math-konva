import SceneBase from '~/scripts/scene/SceneBase';
import { sShape } from '~/scripts/system';
import { Circle } from '~/scripts/node/shape';
import { Vector2 } from 'math-lab';
import { GUI, Util } from '~/scripts/helper';

/******************************************************************************
 * 2Dベクトル　ベクトルは向きと大きさを持つ
 *****************************************************************************/
export default class SampleScene extends SceneBase 
{  
  constructor() {
    super();
  }

  //---------------------------------------------------------------------------
  // Overrideするプロパティ
  //---------------------------------------------------------------------------
  protected get title() {
    return "ベクトル　ベクトルは向きと大きさを持つ";
  }

  protected get description() {
    return `
ベクトルは*向き*と、*大きさ*という**２つの情報を持ち**矢印で表現される。

以下は**点Aから点Bに向かう**ベクトルである。
`;
  }

  //---------------------------------------------------------------------------
  // Parameters
  //---------------------------------------------------------------------------
  params = {
    a: new Vector2(0, 0),
    b: new Vector2(2, 2),
    v: new Vector2(1, 1)
  }

  //---------------------------------------------------------------------------
  // GUI
  //---------------------------------------------------------------------------
  initGUI() {
    const f1 = this.gui.addFolder("始点(A)");
    GUI.addSLR(f1, this.params.a, "x");
    GUI.addSTD(f1, this.params.a, "y");
    f1.open();

    const f2 = this.gui.addFolder("終点(B)");
    GUI.addSLR(f2, this.params.b, "x");
    GUI.addSLR(f2, this.params.b, "y");
    f2.open();

    const f3 = this.gui.addFolder("ベクトルAB");
    GUI.addLSN(f3, this.params.v, "x");
    GUI.addLSN(f3, this.params.v, "y");
    f3.open();
  }

  //---------------------------------------------------------------------------
  // Graph
  //---------------------------------------------------------------------------

  /** グラフ内の要素 */
  private arrow = sShape.arrow();
  private pointA = sShape.draggablePoint().pos(0, 0);
  private pointB = sShape.draggablePoint();
  private labelA = sShape.text("A");
  private labelB = sShape.text("B");
  private labelV = sShape.text("AB").fontSize(0.2).italic();

  initGraph() {

    this.add(this.arrow);
    this.add(this.labelA);
    this.add(this.labelB);
    this.add(this.pointA);
    this.add(this.pointB);
    this.add(this.labelV);

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
    this.updateV();

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

  updateArrow() {
    const { a, b, v } = this.params;
    const ab = Vector2.sub(b, a);

    v.x = ab.x;
    v.y = ab.y;

    this.arrow.points([a.x, a.y, b.x, b.y]);
  }

  updateV() {
    const { a, v } = this.params;
    const v2    = v.clone().times(0.5);

    this.labelV
      .pos(a.x + v2.x, a.y + v2.y);
  }
}