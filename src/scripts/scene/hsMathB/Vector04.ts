import SceneBase from '~/scripts/scene/SceneBase';
import { sShape, sColor } from '~/scripts/system';
import { Circle } from '~/scripts/node/shape';
import { Vector2 } from 'math-lab';
import { GUI, Util } from '~/scripts/helper';

/******************************************************************************
 * ベクトル　ベクトルの正規化と単位ベクトル
 *****************************************************************************/
export default class Scene extends SceneBase 
{  
  constructor() {
    super();
  }

  //---------------------------------------------------------------------------
  // Overrideするプロパティ
  //---------------------------------------------------------------------------
  protected get title() {
    return "ベクトルの正規化と単位ベクトルと零ベクトル";
  }

  protected get overview() {
    return `
- **正規化**：ベクトルの*向きを変えずに大きさだけ１にする*こと
- **単位ベクトル**：大きさが１のベクトルのこと
- **零ベクトル**：大きさが0のベクトルのこと

:::note
正規化をして単位ベクトルにする事で、0.5倍、2倍、3倍など向きを変えずに好きな大きさに変える事が用意になる。
- **normalize**をクリックすると正規化されます。
- **zero**をクリックすると零ベクトルになります。
:::
`;
  }

  //---------------------------------------------------------------------------
  // Parameters
  //---------------------------------------------------------------------------
  params = {
    a: new Vector2(0, 0),
    b: new Vector2(3, 4),
    v: new Vector2(0, 0),
    normalize: () => {
      const { a, b, v } = this.params;
      const n = v.normalize;
      b.x = a.x + n.x;
      b.y = a.y + n.y;
    },
    zero:() => {
      const { a, b } = this.params;
      b.x = a.x;
      b.y = a.y;
    }
  }

  //---------------------------------------------------------------------------
  // GUI
  //---------------------------------------------------------------------------
  initGUI() {
    
    const f1 = this.gui.addFolder("コマンド");
    f1.add(this.params, "normalize");
    f1.add(this.params, "zero");
    f1.open();

    const f2 = this.gui.addFolder("ベクトルABの成分");
    GUI.addLSN(f2, this.params.v, "x");
    GUI.addLSN(f2, this.params.v, "y");
    f2.open();

    const f3 = this.gui.addFolder("始点(A)");
    GUI.addSLR(f3, this.params.a, "x");
    GUI.addSTD(f3, this.params.a, "y");
    f3.open();

    const f4 = this.gui.addFolder("終点(B)");
    GUI.addSLR(f4, this.params.b, "x");
    GUI.addSLR(f4, this.params.b, "y");
    f4.open();
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
  private labelH = sShape.text().fontSize(0.4);

  initGraph() {

    this.add(this.arrow);
    this.add(this.line);
    this.add(this.labelA);
    this.add(this.labelB);
    this.add(this.labelX);
    this.add(this.labelY);
    this.add(this.labelH);
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

    // ごちゃごちゃしすぎて見辛いのでラベルの表示制限
    const isVisibleLabels = (1 < this.params.v.magnitude);
    this.labelA.visible(isVisibleLabels);
    this.labelB.visible(isVisibleLabels);

    this.arrow.visible(this.params.v.magnitude !== 0);

    this.labelH.text("ベクトルの大きさ=" + Util.round(this.params.v.magnitude, 2))
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