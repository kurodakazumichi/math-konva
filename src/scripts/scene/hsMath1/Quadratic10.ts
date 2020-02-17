import SceneBase from '~/scripts/scene/SceneBase';
import { sShape, sCoord } from '~/scripts/system';
import { Line, Circle } from '~/scripts/node/shape';
import { Quadratic } from 'math-lab';
import { GUI } from '~/scripts/helper';

/******************************************************************************
 * ２次関数　うにょうにょさせる
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
    return "２次関数　うにょうにょする";
  }

  protected get description() {
    return `
**適当に動く３つの点から２次関数を作る**ことで*うにょうにょ*させている。
    `;
  }

  //---------------------------------------------------------------------------
  // Parameters
  //---------------------------------------------------------------------------
  private quad = new Quadratic();
  
  params = {
    // ２次式パラメータ(表示用)
    quad: { a:0, b:0, c:0 },
    // オプション
    options: {
      speed:0.01,
    }
  }

  //---------------------------------------------------------------------------
  // GUI
  //---------------------------------------------------------------------------
  initGUI() {
    const f1 = this.gui.addFolder("現在の２次関数の各値(一般形)");
    GUI.addLSN(f1, this.params.quad, "a");
    GUI.addLSN(f1, this.params.quad, "b");
    GUI.addLSN(f1, this.params.quad, "c");
    f1.open();

    const f2 = this.gui.addFolder("オプション");
    GUI.addSMN(f2, this.params.options, "speed");
    f2.open();
  }

  //---------------------------------------------------------------------------
  // Graph
  //---------------------------------------------------------------------------

  /** グラフ内の要素 */
  private quadLine:Line = sShape.solidLine();
    
  private points:Circle[] = [
    sShape.point().pos(-4, -4),
    sShape.point().pos(-1, 3),
    sShape.point().pos(4.5, 1)
  ]

  initGraph() {
    this.add(this.quadLine);
    this.points.map((p) => { this.add(p); })

    this.updateShape();
  }

  //---------------------------------------------------------------------------
  // Update
  //---------------------------------------------------------------------------

  update() 
  {
    this.updateTimer();
    this.updateShape();
  }

  private updateTimer() {
    const s = this.params.options.speed;
    this.points.map((p) => { p.timer += s; })
  }

  private updateShape() {
    this.updateShapePass1();
    this.updateShapePass2();
    this.updateShapePass3();
    this.updateShape_Line();
  }

  private updateShapePass1() {
    const pass = this.points[0];
    pass.y(Math.sin(pass.timer * 1.7)*sCoord.uh * 0.3);
  }

  private updateShapePass2() {
    const pass = this.points[1];
    pass.x(Math.sin(pass.timer) * 3);
    pass.y(Math.cos(pass.timer) * 3);
  }

  private updateShapePass3() {
    const pass = this.points[2];
    pass.y(Math.cos(pass.timer * 2) * sCoord.uh * 0.4);
  }
  
  private updateShape_Line() {
    const [p1, p2, p3] = this.points;
    this.quad.initBy3PassPoints(p1.x(), p1.y(), p2.x(), p2.y(), p3.x(), p3.y());
    this.quadLine.points(this.quad.getPoints(sCoord.left, sCoord.right, 0.1));

    // gui表示用のパラメータも更新
    this.params.quad.a = this.quad.a;
    this.params.quad.b = this.quad.b;
    this.params.quad.c = this.quad.c;
  }

}
