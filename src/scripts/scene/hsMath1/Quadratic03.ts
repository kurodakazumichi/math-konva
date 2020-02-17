import SceneBase from '~/scripts/scene/SceneBase';
import { sShape, sCoord } from '~/scripts/system';
import { Line, Circle, Text } from '~/scripts/node/shape';
import { Quadratic } from 'math-lab';

/******************************************************************************
 * ２次関数 因数分解式 a(x - s)(x - t)
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
    return "２次関数 因数分解式";
  }

  protected get description() {
    return `
$y=a(x-s)(x-t)$　ただし$(a \\neq 0)$

*a*は放物線の**開き具合**を表し、*s*と*t*は**x切片**(x軸と交わる場所)の値を表す。  
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
    s:-1,
    t:1,
  }

  initGUI() {
    const f1 = this.gui.addFolder("２次関数のパラメータ");
    f1.add(this.params, "a").step(0.1).onChange(this.updateLines);
    f1.add(this.params, "s").step(0.1).onChange(this.updateLines);
    f1.add(this.params, "t").step(0.1).onChange(this.updateLines);
    f1.open();
  }

  //---------------------------------------------------------------------------
  // Graph
  //---------------------------------------------------------------------------

  /** グラフ内の要素 */
  private quadLine:Line   = sShape.solidLine();

  private sCoord:Text  = sShape.text().offset(0.2, -0.1);
  private tCoord:Text  = sShape.text().offset(0.2, -0.1);
  private sPoint:Circle = sShape.point();
  private tPoint:Circle = sShape.point();

  initGraph() {

    this.updateLines();

    this.add(this.quadLine);

    this.add(this.sCoord);
    this.add(this.tCoord);
    this.add(this.sPoint);
    this.add(this.tPoint);
  }


  updateLines() {
    const { a, s, t } =  this.params;
    this.quad.initFactorizationForm(a, s, t);
    this.quadLine.points(
      this.quad.getPoints(sCoord.left, sCoord.right, 0.1)
    );
  }

  update() {
    const { s, t } = this.params;

    this.sCoord.pos(s, 0).text(`s = ${s.toFixed(1)}`);
    this.tCoord.pos(t, 0).text(`t = ${t.toFixed(1)}`);
    this.sPoint.pos(s, 0);
    this.tPoint.pos(t, 0);
  }
}