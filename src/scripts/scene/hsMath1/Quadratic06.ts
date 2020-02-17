import SceneBase from '~/scripts/scene/SceneBase';
import { sShape, sCoord, sColor } from '~/scripts/system';
import { Line, Circle, Text } from '~/scripts/node/shape';
import { Quadratic } from 'math-lab';

/******************************************************************************
 * ２次関数　通過する３点がわかれば放物線は決まる
 *****************************************************************************/
export default class SampleScene extends SceneBase 
{  
  constructor() {
    super();
    this.updateLines = this.updateLines.bind(this);
    this.onDragMovePass1Point = this.onDragMovePass1Point.bind(this);
    this.onDragMovePass2Point = this.onDragMovePass2Point.bind(this);
    this.onDragMovePass3Point = this.onDragMovePass3Point.bind(this);
  }

  //---------------------------------------------------------------------------
  // Overrideするプロパティ
  //---------------------------------------------------------------------------
  protected get title() {
    return "２次関数　通過する３点がわかれば放物線は決まる";
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
    pass1: { x:-2, y:-2 },
    pass2: { x:1 , y:1 },
    pass3: { x:2 , y:3 }
  }

  initGUI() {
    const f1 = this.gui.addFolder("通過点A");
    f1.add(this.params.pass1, "x").step(0.1).listen().onChange(this.updateLines);
    f1.add(this.params.pass1, "y").step(0.1).listen().onChange(this.updateLines);
    f1.open();

    const f2 = this.gui.addFolder("通過点B");
    f2.add(this.params.pass2, "x").step(0.1).listen().onChange(this.updateLines);
    f2.add(this.params.pass2, "y").step(0.1).listen().onChange(this.updateLines);
    f2.open();

    const f3 = this.gui.addFolder("通過点C");
    f3.add(this.params.pass3, "x").step(0.1).listen().onChange(this.updateLines);
    f3.add(this.params.pass3, "y").step(0.1).listen().onChange(this.updateLines);
    f3.open();
  }

  //---------------------------------------------------------------------------
  // Graph
  //---------------------------------------------------------------------------

  /** グラフ内の要素 */
  private quadLine:Line   = sShape.solidLine();
  private pass1Coord:Text  = sShape.text().offset(0.2, -0.1);
  private pass2Coord:Text  = sShape.text().offset(0.2, -0.1);
  private pass3Coord:Text  = sShape.text().offset(0.2, -0.1);
  private pass1Point:Circle = sShape.point().draggable().fill(sColor.red);
  private pass2Point:Circle = sShape.point().draggable().fill(sColor.red);
  private pass3Point:Circle = sShape.point().draggable().fill(sColor.red);

  initGraph() 
  {
    this.updateLines();
    this.pass1Point.on('dragmove', this.onDragMovePass1Point);
    this.pass2Point.on('dragmove', this.onDragMovePass2Point);
    this.pass3Point.on('dragmove', this.onDragMovePass3Point);

    this.add(this.quadLine);

    this.add(this.pass1Coord);
    this.add(this.pass2Coord);
    this.add(this.pass3Coord);
    this.add(this.pass1Point);
    this.add(this.pass2Point);
    this.add(this.pass3Point);
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

  onDragMovePass3Point(e:Circle) {
    this.params.pass3.x = e.x();
    this.params.pass3.y = e.y();
    this.updateLines();
  }

  updateLines() {
    const { pass1, pass2, pass3 } =  this.params;
    this.quad.initBy3PassPoints(pass1.x, pass1.y, pass2.x, pass2.y, pass3.x, pass3.y);
    this.quadLine.points(
      this.quad.getPoints(sCoord.left, sCoord.right, 0.1)
    );
  }

  update() {
    const { pass1, pass2, pass3 } = this.params;

    this.pass1Point.pos(pass1.x, pass1.y);
    this.pass2Point.pos(pass2.x, pass2.y);
    this.pass3Point.pos(pass3.x, pass3.y);
    
    this.pass1Coord.pos(pass1.x, pass1.y).text("通過点A");
    this.pass2Coord.pos(pass2.x, pass2.y).text("通過点B");
    this.pass3Coord.pos(pass3.x, pass3.y).text("通過点C");
  }
}