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
    this.updateLines = this.updateLines.bind(this);
  }

  //---------------------------------------------------------------------------
  // Overrideするプロパティ
  //---------------------------------------------------------------------------
  protected get title() {
    return "２次関数 一般形";
  }

  protected get formula() {
    return `$$y=ax^2+bx+c　(a \\neq 0)$$`
  }

  protected get explanation() {
    return `
    <b>a</b>は放物線の<em>開き具合</em>を表し、<b>b</b>はy切片における<em>傾き</em>を表す。<br>
    また<b>c</b>は<em>y切片</em>を表す。
    `;
  }

  //---------------------------------------------------------------------------
  // Graph
  //---------------------------------------------------------------------------
  private quad = new Quadratic();

  private quadPoints():number[] {
    const p:number[]  = [];

    if(this.quad.isInvalid) return p;
    for(let x = sCoord.left; x < sCoord.right; x+=0.1) {
      p.push(x);
      p.push(this.quad.fx(x));
    }
    return p;
  }

  intersectPoint() {
    if(this.quad.isInvalid) return [];
    const { b, c } = this.quad;
    const y1 = b * sCoord.left + c;
    const y2 = b * sCoord.right + c;
    return [sCoord.left, y1, sCoord.right, y2];
  }

  //---------------------------------------------------------------------------
  // GUI
  //---------------------------------------------------------------------------
  params = {
    a:1,
    b:0,
    c:0,
  }

  initGUI() {
    const f1 = this.gui.addFolder("２次関数のパラメータ");
    f1.add(this.params, "a").step(0.1).onChange(this.updateLines);
    f1.add(this.params, "b").step(0.1).onChange(this.updateLines);
    f1.add(this.params, "c").step(0.1).onChange(this.updateLines);
    f1.open();
  }

  //---------------------------------------------------------------------------
  // Graph
  //---------------------------------------------------------------------------

  /** グラフ内の要素 */
  private quadLine:Line   = sShape.solidLine();
  private intersectLine:Line = sShape.solidLine().strokeWidth(1).stroke("#009F8C");
  private yIntersectPoint:Circle = sShape.point();
  private coord:Text  = sShape.text().offset(0.1, -0.1);

  initGraph() {

    this.updateLines();

    this.add(this.quadLine);
    this.add(this.intersectLine);
    this.add(this.yIntersectPoint);
    this.add(this.coord);
  }


  updateLines() {
    const { a, b, c } =  this.params;
    this.quad.initGeneralForm(a, b, c);
    this.intersectLine.points(this.intersectPoint());


    this.quadLine.points(this.quadPoints());
  }

  update() {
    const { c } = this.quad;
    this.yIntersectPoint.pos(0, c);
    this.coord.pos(0, c).text(`${c.toFixed(1)}`);
  }
}