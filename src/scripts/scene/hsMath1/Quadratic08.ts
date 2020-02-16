import SceneBase from '~/scripts/scene/SceneBase';
import { sShape, sCoord } from '~/scripts/system';
import { Line, Circle } from '~/scripts/node/shape';
import { Quadratic } from 'math-lab';

enum State {
  Idle,
  Default,
  Reset,
}
/******************************************************************************
 * ２次関数　放物線上を移動する
 *****************************************************************************/
export default class SampleScene extends SceneBase 
{  
  constructor() {
    super();
    this.updateQuadLine = this.updateQuadLine.bind(this);
    this.updatePositionOfCircle = this.updatePositionOfCircle.bind(this);
  }

  private state = State.Default;

  //---------------------------------------------------------------------------
  // Overrideするプロパティ
  //---------------------------------------------------------------------------
  protected get title() {
    return "放物線上を移動する";
  }

  protected get formula() {
    return ``
  }

  protected get explanation() {
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
    quad : { a:-0.1, b:0, c:2, visible:true },
    state: {
      stop :() => { this.state = State.Idle; },
      start:() => { this.state =  State.Default; },
      reset:() => { this.state = State.Reset; }
    },
    x:sCoord.left,
  }

  initGUI() {
    const f1 = this.gui.addFolder("放物線");
    f1.add(this.params.quad, "a").step(0.01).listen().onChange(this.updateQuadLine);
    f1.add(this.params.quad, "b").step(0.01).listen().onChange(this.updateQuadLine);
    f1.add(this.params.quad, "c").step(0.01).listen().onChange(this.updateQuadLine);
    f1.add(this.params.quad, "visible")
      .onChange((v:boolean) => { 
        this.quadLine.visible(v); 
      });
    f1.open();

    const f2 = this.gui.addFolder("コントロール");
    f2.add(this.params.state, "stop");
    f2.add(this.params.state, "start");
    f2.add(this.params.state, "reset");
    f2.add(this.params, "x", sCoord.left, sCoord.right).listen()
      .onChange(this.updatePositionOfCircle);
    f2.open();
  }

  //---------------------------------------------------------------------------
  // Graph
  //---------------------------------------------------------------------------

  /** グラフ内の要素 */
  private quadLine:Line   = sShape.solidLine();
  private point:Circle    = sShape.point().radius(15);

  initGraph() 
  {
    this.updateQuadLine();
    this.add(this.quadLine);
    this.add(this.point);
  }

  private reset() {
    this.params.x = sCoord.left;
    this.state    = State.Default;
  }

  updateQuadLine() {
    const { quad: q } = this.params;
    this.quad.initGeneralForm(q.a, q.b, q.c);
    this.quadLine.points(this.quad.getPoints(sCoord.left, sCoord.right, 0.1));
  }

  updatePositionOfCircle() {
    const x = this.params.x;
    this.point.pos(x, this.quad.fx(x));

    if (sCoord.right < x) {
      this.params.x = sCoord.left;
    }
  }

  update() {
    switch(this.state) {
      case State.Idle : return;
      case State.Reset: {
        this.reset();
        return;
      }
    }

    if (this.quad.isInvalid) return;

    this.params.x += 0.05;
    this.updatePositionOfCircle();
  }
}
