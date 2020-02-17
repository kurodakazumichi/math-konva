import { Quadratic } from 'math-lab';
import SceneBase from '~/scripts/scene/SceneBase';
import { sShape, sCoord } from '~/scripts/system';
import { Line, Circle, Text } from '~/scripts/node/shape';
import { GUI } from '~/scripts/helper';

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

  protected get description() {
    return `
$y=ax^2+bx+c$　ただし$(a \\neq 0)$

*a*は放物線の**開き具合**を表し、*b*はy切片における**傾き**、*c*は**y切片**を表す。
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
    b:0,
    c:0,
  }

  initGUI() {
    const f1 = this.gui.addFolder("２次関数のパラメータ");
    GUI.addS10(f1, this.params, "a").onChange(this.updateLines);
    GUI.addS10(f1, this.params, "b").onChange(this.updateLines);
    GUI.addSTD(f1, this.params, "c").onChange(this.updateLines);
    f1.open();
  }

  //---------------------------------------------------------------------------
  // Graph
  //---------------------------------------------------------------------------

  /** グラフ内の要素 */
  private quadLine:Line        = sShape.solidLine();
  private intersectLine:Line   = sShape.auxLine();
  private pointTangentY:Circle = sShape.point();
  private coord:Text           = sShape.text().offset(0.1, -0.1);

  initGraph() {

    this.updateLines();

    this.add(this.quadLine);
    this.add(this.intersectLine);
    this.add(this.pointTangentY);
    this.add(this.coord);
  }


  updateLines() {
    const { a, b, c } =  this.params;
    this.quad.initGeneralForm(a, b, c);
    this.intersectLine.points(this.quad.getPointsOfSlopeAtYTangent(sCoord.left, sCoord.right));
    this.quadLine.points(this.quad.getPoints(sCoord.left, sCoord.right, 0.1));
  }

  update() {
    const { c } = this.quad;
    this.pointTangentY.pos(0, c);
    this.coord.pos(0, c).text(`${"c=" + c.toFixed(1)}`);
  }
}