import SceneBase from '~/scripts/scene/SceneBase';
import { sShape, sCoord } from '~/scripts/system';
import { Line, Circle, Text } from '~/scripts/node/shape';
import { Quadratic } from 'math-lab';

/******************************************************************************
 * ２次関数  y=a(x-p)^2 + q
 *****************************************************************************/
export default class SampleScene extends SceneBase 
{  
  constructor() {
    super();
    this.updateQuadLinePoints = this.updateQuadLinePoints.bind(this);
  }

  //---------------------------------------------------------------------------
  // Overrideするプロパティ
  //---------------------------------------------------------------------------
  protected get title() {
    return "２次関数 標準形";
  }

  protected get description() {
    return `
$y=a(x-p)^2+q$　ただし $(a \\neq 0)$  

*a*が放物線の**開き具合**を表し、*p, q*が**頂点**を表す式  
※ $a=0$ の場合は2次式ではなくなってしまう。
    `;
  }

  //---------------------------------------------------------------------------
  // Graph
  //---------------------------------------------------------------------------
  private quad = new Quadratic();

  //---------------------------------------------------------------------------
  // GUI
  //---------------------------------------------------------------------------
  params = {
    a:1,
    p:0,
    q:0,
  }

  initGUI() {
    const f1 = this.gui.addFolder("２次関数のパラメータ");
    f1.add(this.params, "a", -10, 10).step(0.1).onChange(this.updateQuadLinePoints);
    f1.add(this.params, "p", sCoord.left, sCoord.right).step(0.1).onChange(this.updateQuadLinePoints);
    f1.add(this.params, "q", sCoord.down, sCoord.top).step(0.1).onChange(this.updateQuadLinePoints);
    f1.open();
  }

  //---------------------------------------------------------------------------
  // Graph
  //---------------------------------------------------------------------------

  /** グラフ内の要素 */
  private line:Line   = sShape.solidLine();
  private apex:Circle = sShape.point();
  private coord:Text  = sShape.text().offset(0.1, -0.1);

  initGraph() {
    this.updateQuadLinePoints();

    this.add(this.line);
    this.add(this.apex);
    this.add(this.coord);
  }

  updateQuadLinePoints() {
    const { a, p, q } = this.params;
    this.quad.initStandardForm(a, p, q);
    this.line.points(this.quad.getPoints(sCoord.left, sCoord.right, 0.1));
  }

  update() {
    const { p, q } = this.params;
    this.apex.pos(p, q);
    this.coord.pos(p, q).text(`(${p.toFixed(1)}, ${q.toFixed(1)})`);
  }
}