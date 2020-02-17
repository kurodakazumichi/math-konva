import SceneBase from '~/scripts/scene/SceneBase';
import { sShape, sCoord, sColor } from '~/scripts/system';
import { Line, Circle, Text } from '~/scripts/node/shape';
import { Quadratic } from 'math-lab';

/******************************************************************************
 * ２次関数　軸と通過する２点がわかれば放物線は決まる
 *****************************************************************************/
export default class SampleScene extends SceneBase 
{  
  constructor() {
    super();
    this.updateLines = this.updateLines.bind(this);
    this.onDragMoveAxisPoint  = this.onDragMoveAxisPoint.bind(this);
    this.onDragMovePass1Point = this.onDragMovePass1Point.bind(this);
    this.onDragMovePass2Point = this.onDragMovePass2Point.bind(this);
  }

  //---------------------------------------------------------------------------
  // Overrideするプロパティ
  //---------------------------------------------------------------------------
  protected get title() {
    return "２次関数　軸と通過する２点がわかれば放物線は決まる";
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
    axis: {
      x:0.5,
    },
    pass1: {
      x:-2,
      y:-2,
    },
    pass2: {
      x:1,
      y:1,
    }
  }

  initGUI() {
    const f1 = this.gui.addFolder("軸");
    f1.add(this.params.axis, "x").step(0.1).listen().onChange(this.updateLines);
    f1.open();

    const f2 = this.gui.addFolder("通過点A");
    f2.add(this.params.pass1, "x").step(0.1).listen().onChange(this.updateLines);
    f2.add(this.params.pass1, "y").step(0.1).listen().onChange(this.updateLines);
    f2.open();

    const f3 = this.gui.addFolder("通過点B");
    f3.add(this.params.pass2, "x").step(0.1).listen().onChange(this.updateLines);
    f3.add(this.params.pass2, "y").step(0.1).listen().onChange(this.updateLines);
    f3.open();
  }

  //---------------------------------------------------------------------------
  // Graph
  //---------------------------------------------------------------------------

  /** グラフ内の要素 */
  private quadLine:Line   = sShape.solidLine();
  private axisLine:Line   = sShape.brokenLine();
  private axisCoord:Text  = sShape.text().offset(0.2, -0.1);
  private pass1Coord:Text  = sShape.text().offset(0.2, -0.1);
  private pass2Coord:Text  = sShape.text().offset(0.2, -0.1);
  private axisPoint:Circle = sShape.point().draggable();
  private pass1Point:Circle = sShape.point().draggable().fill(sColor.red);
  private pass2Point:Circle = sShape.point().draggable().fill(sColor.red);

  initGraph() 
  {
    this.updateLines();
    this.axisPoint.on('dragmove', this.onDragMoveAxisPoint);
    this.pass1Point.on('dragmove', this.onDragMovePass1Point);
    this.pass2Point.on('dragmove', this.onDragMovePass2Point);

    this.add(this.quadLine);
    this.add(this.axisLine);
    this.add(this.axisCoord);
    this.add(this.pass1Coord);
    this.add(this.pass2Coord);
    this.add(this.axisPoint);
    this.add(this.pass1Point);
    this.add(this.pass2Point);
  }

  onDragMoveAxisPoint(e:Circle) {
    this.params.axis.x = e.x();
    this.updateLines();
  }

  onDragMovePass1Point(e:Circle) {
    this.params.pass1.x = e.x();
    this.params.pass1.y = e.y();
    this.updateLines();
  }

  onDragMovePass2Point(e:Circle) {
    this.params.pass2.x = e.x();
    this.params.pass2.y = e.y();
    this.updateLines();
  }

  updateLines() {
    const { axis, pass1, pass2 } =  this.params;
    this.quad.initByAxisAnd2PassPoints(axis.x, pass1.x, pass1.y, pass2.x, pass2.y);
    this.quadLine.points(
      this.quad.getPoints(sCoord.left, sCoord.right, 0.1)
    );

    this.axisLine.points([axis.x, sCoord.down, axis.x, sCoord.top]);
  }

  update() {
    const { axis, pass1, pass2 } = this.params;

    this.axisPoint.pos(axis.x, 0);
    this.pass1Point.pos(pass1.x, pass1.y);
    this.pass2Point.pos(pass2.x, pass2.y);

    this.axisCoord.pos(axis.x, 0).text("軸");
    this.pass1Coord.pos(pass1.x, pass1.y).text("通過点A");
    this.pass2Coord.pos(pass2.x, pass2.y).text("通過点B");
  }
}