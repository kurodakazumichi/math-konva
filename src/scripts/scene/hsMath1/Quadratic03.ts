import SceneBase from '~/scripts/scene/SceneBase';
import { sShape, sCoord } from '~/scripts/system';
import { Line, Circle, Text } from '~/scripts/node/shape';
import { Quadratic } from 'math-lab';
import { GUI } from '~/scripts/helper';

/******************************************************************************
 * ２次関数 因数分解式 a(x - s)(x - t)
 *****************************************************************************/
export default class SampleScene extends SceneBase 
{  
  constructor() {
    super();
    this.updateLines = this.updateLines.bind(this);
    this.onDragMovePointS = this.onDragMovePointS.bind(this);
    this.onDragMovePointT = this.onDragMovePointT.bind(this);
  }

  //---------------------------------------------------------------------------
  // Overrideするプロパティ
  //---------------------------------------------------------------------------
  protected get title() {
    return "２次関数 因数分解式";
  }

  protected get overview() {
    return `
$y=a(x-s)(x-t)$　ただし$(a \\neq 0)$

*a*は放物線の**開き具合**を表し、*s*と*t*は**x切片**(x軸と交わる場所)の値を表す。
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
    GUI.addS10(f1, this.params, "a").onChange(this.updateLines);
    GUI.addSLR(f1, this.params, "s").onChange(this.updateLines);
    GUI.addSLR(f1, this.params, "t").onChange(this.updateLines);
    f1.open();
  }

  //---------------------------------------------------------------------------
  // Graph
  //---------------------------------------------------------------------------

  /** グラフ内の要素 */
  private quadLine:Line   = sShape.solidLine();

  private sCoord:Text  = sShape.text().offset(0.2, -0.1);
  private tCoord:Text  = sShape.text().offset(0.2, -0.1);
  private sPoint:Circle = sShape.draggablePoint();
  private tPoint:Circle = sShape.draggablePoint();

  initGraph() {

    this.sPoint.on('dragmove', this.onDragMovePointS);
    this.tPoint.on('dragmove', this.onDragMovePointT);

    this.updateLines();

    this.add(this.quadLine);

    this.add(this.sCoord);
    this.add(this.tCoord);
    this.add(this.sPoint);
    this.add(this.tPoint);
  }

  onDragMovePointS(e:Circle) {
    this.params.s = e.x();
    this.updateLines();
  }
  onDragMovePointT(e:Circle) {
    this.params.t = e.x();
    this.updateLines();
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