import { Quadratic } from 'math-lab';
import SceneBase from '~/scripts/scene/SceneBase';
import { sShape, sCoord, sColor } from '~/scripts/system';
import { Line, Circle, Text } from '~/scripts/node/shape';
import { GUI } from '~/scripts/helper';

/******************************************************************************
 * ２次関数　頂点と通過する１点がわかれば放物線は決まる
 *****************************************************************************/
export default class SampleScene extends SceneBase 
{  
  constructor() {
    super();
    this.updateLines = this.updateLines.bind(this);
    this.onDragMoveApexPoint = this.onDragMoveApexPoint.bind(this);
    this.onDragMovePassPoint = this.onDragMovePassPoint.bind(this);
  }

  //---------------------------------------------------------------------------
  // Overrideするプロパティ
  //---------------------------------------------------------------------------
  protected get title() {
    return "２次関数　頂点と通過する１点がわかれば放物線は決まる";
  }

  protected get description() {
    return ``;
  }

  //---------------------------------------------------------------------------
  // Graph
  //---------------------------------------------------------------------------
  private quad = new Quadratic();

  //---------------------------------------------------------------------------
  // GUI
  //---------------------------------------------------------------------------
  params = {
    apex: {
      x:0,
      y:0,
    },
    pass: {
      x:1,
      y:1,
    }
  }

  initGUI() {
    const f1 = this.gui.addFolder("頂点");
    GUI.addSLR(f1, this.params.apex, "x").onChange(this.updateLines);
    GUI.addSLR(f1, this.params.apex, "y").onChange(this.updateLines);
    f1.open();

    const f2 = this.gui.addFolder("通過点A");
    GUI.addSLR(f2, this.params.pass, "x").onChange(this.updateLines);
    GUI.addSLR(f2, this.params.pass, "y").onChange(this.updateLines);
    f2.open();
  }

  //---------------------------------------------------------------------------
  // Graph
  //---------------------------------------------------------------------------

  /** グラフ内の要素 */
  private quadLine:Line   = sShape.solidLine();

  private apexCoord:Text  = sShape.text().offset(0.2, -0.1);
  private passCoord:Text  = sShape.text().offset(0.2, -0.1);
  private apexPoint:Circle = sShape.draggablePoint().draggable();
  private passPoint:Circle = sShape.draggablePoint().draggable().fill(sColor.red);

  initGraph() 
  {
    this.updateLines();
    this.apexPoint.on('dragmove', this.onDragMoveApexPoint);
    this.passPoint.on('dragmove', this.onDragMovePassPoint);

    this.add(this.quadLine);
    this.add(this.apexCoord);
    this.add(this.passCoord);
    this.add(this.apexPoint);
    this.add(this.passPoint);
  }

  onDragMoveApexPoint(e:Circle) {
    this.params.apex.x = e.x();
    this.params.apex.y = e.y();
    this.updateLines();
  }

  onDragMovePassPoint(e:Circle) {
    this.params.pass.x = e.x();
    this.params.pass.y = e.y();
    this.updateLines();
  }

  updateLines() {
    const { apex, pass } =  this.params;
    this.quad.initByApexAndPassPoint(apex.x, apex.y, pass.x, pass.y);
    this.quadLine.points(
      this.quad.getPoints(sCoord.left, sCoord.right, 0.1)
    );
  }

  update() {
    const { apex, pass } = this.params;
    this.apexPoint.pos(apex.x, apex.y);
    this.passPoint.pos(pass.x, pass.y);
    this.apexCoord.pos(apex.x, apex.y).text(`頂点`);
    this.passCoord.pos(pass.x, pass.y).text(`通過点A`);
  }
}