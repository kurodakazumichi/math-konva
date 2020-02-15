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
  }

  //---------------------------------------------------------------------------
  // Overrideするプロパティ
  //---------------------------------------------------------------------------
  protected get title() {
    return "２次関数 その１";
  }

  protected get formula() {
    return `$$y=a(x-p)^2+q$$`
  }

  protected get explanation() {
    return `
    <b>a</b>が放物線の<em>傾き</em>を表し、<b>(p, q)</b>が<em>頂点</em>になる。
    `;
  }

  //---------------------------------------------------------------------------
  // Graph
  //---------------------------------------------------------------------------
  private quad = new Quadratic();

  private quadPoints():number[] {
    const p  = [];
    for(let x = sCoord.left; x < sCoord.right; x+=0.1) {
      p.push(x);
      p.push(this.quad.fx(x));
    }
    return p;
  }

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
    f1.add(this.params, "a").step(0.1).onChange((v) => {
       this.quad.a = v; 
       this.updateQuadLinePoints();  
    });
    f1.add(this.params, "p").step(0.1).onChange((v) => {
      this.quad.p = v;
      this.updateQuadLinePoints();
    });
    f1.add(this.params, "q").step(0.1).onChange((v) => {
      this.quad.q = v;
      this.updateQuadLinePoints();
    });
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
    const { a, p, q } =  this.params;
    this.quad.initAPQ(a, p, q);
    this.updateQuadLinePoints();

    this.add(this.line);
    this.add(this.apex);
    this.add(this.coord);
  }

  updateQuadLinePoints() {
    this.line.points(this.quadPoints());
  }

  update() {
    const { p, q } = this.params;
    this.apex.pos(p, q);
    this.coord.pos(p, q).text(`(${p.toFixed(1)}, ${q.toFixed(1)})`);
  }
}