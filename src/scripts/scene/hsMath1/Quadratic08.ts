import SceneBase from '~/scripts/scene/SceneBase';
import { sShape, sCoord } from '~/scripts/system';
import { Line, Circle } from '~/scripts/node/shape';
import { Quadratic } from 'math-lab';
import { GUI } from '~/scripts/helper';

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
    this.onChangeVisible = this.onChangeVisible.bind(this);
  }

  private state = State.Default;

  //---------------------------------------------------------------------------
  // Overrideするプロパティ
  //---------------------------------------------------------------------------
  protected get title() {
    return "２次関数　放物線を描く動き";
  }

  protected get description() {
    return `
２次関数を使って**放物線を描く動き**をさせるサンプルです。

$y=ax^2+bx+c$の*a, b, cの値を調整*することで様々な軌道を作る事ができます。
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

    GUI.addS10(f1, this.params.quad, "a").step(0.01).onChange(this.updateQuadLine);
    GUI.addS10(f1, this.params.quad, "b").step(0.01).onChange(this.updateQuadLine);
    GUI.addSTD(f1, this.params.quad, "c").step(0.01).onChange(this.updateQuadLine);
    f1.add(this.params.quad, "visible").onChange(this.onChangeVisible);
    f1.open();

    const f2 = this.gui.addFolder("コントロール");
    f2.add(this.params.state, "stop");
    f2.add(this.params.state, "start");
    f2.add(this.params.state, "reset");
    GUI.addSLR(f2, this.params, "x").onChange(this.updatePositionOfCircle);
    f2.open();
  }

  onChangeVisible(v:boolean) {
    this.quadLine.visible(v);
  }

  //---------------------------------------------------------------------------
  // Graph
  //---------------------------------------------------------------------------

  /** グラフ内の要素 */
  private quadLine:Line   = sShape.solidLine();
  private point:Circle    = sShape.point().radius(0.3)

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
