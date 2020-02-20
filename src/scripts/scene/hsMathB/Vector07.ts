import SceneBase from '~/scripts/scene/SceneBase';
import { sShape, sColor } from '~/scripts/system';
import { Circle } from '~/scripts/node/shape';
import { Vector2 } from 'math-lab';
import { GUI as GUIHelper, Util } from '~/scripts/helper';
import { GUI } from 'dat.gui';

/******************************************************************************
 * ベクトル　ベクトルの加法
 *****************************************************************************/
export default class Scene extends SceneBase 
{  
  constructor() {
    super();
  }

  //---------------------------------------------------------------------------
  // Overrideするプロパティ
  //---------------------------------------------------------------------------
  protected get title() {
    return "ベクトルの減法(引き算)";
  }

  protected get description() {
    return `
２つのベクトル$\\vec{a}$, $\\vec{b}$の引き算は$\\vec{a}$に$\\vec{b}$の**逆ベクトルを足したモノ**として

$\\vec{a} + (-\\vec{b})$と表すことができる。

- **ベクトルの減法**：それぞれの*x成分*と*y成分*同士を引く
- $\\vec{OA}-\\vec{OB}$は**BからAに向かうベクトル**$\\vec{BA}$になる


:::note
ある点Aからある点Bに向かうベクトルが欲しい場合は$\\vec{b}-\\vec{a}$で求められるので便利
`;
  }

  //---------------------------------------------------------------------------
  // Parameters
  //---------------------------------------------------------------------------
  private params = {
    a:new Vector2( 1, 1),
    b:new Vector2(-1, 1),
    c:new Vector2(),
    mode:{
      step:false,
    }
  }

  private calcVectorC() {
    const { a, b, c } = this.params;
    const t = Vector2.sub(a, b);
    c.x = t.x;
    c.y = t.y;
  }

  private onChangeStep(flg:boolean) {
    this.updateGUI();

    if (flg) {
      this.step.first();
    } else {
      this.setComment("");
      this.visibleAll(true);
      this.fitGraphWithParams();
    }
  }

  //---------------------------------------------------------------------------
  // GUI
  //---------------------------------------------------------------------------
  private folders = {
    a:{} as GUI,
    b:{} as GUI,
    c:{} as GUI,
    step:{} as GUI,
  }

  initGUI() {
    const mode = this.gui.addFolder("モード");
    mode.add(this.params.mode, "step").onChange(this.onChangeStep.bind(this));
    mode.open();

    const a = this.gui.addFolder("点A");
    GUIHelper.addSlider(a, this.params.a, "x");
    GUIHelper.addSlider(a, this.params.a, "y");
    a.open();

    const b = this.gui.addFolder("点B");
    GUIHelper.addSlider(b, this.params.b, "x");
    GUIHelper.addSlider(b, this.params.b, "y");
    b.open();

    const c = this.gui.addFolder("ベクトル OA - OB");
    GUIHelper.addLSN(c, this.params.c, "x");
    GUIHelper.addLSN(c, this.params.c, "y");
    c.open();

    const step = this.createStepGui();

    this.folders.a = a;
    this.folders.b = b;
    this.folders.c = c;
    this.folders.step = step;

    this.updateGUI();
  }

  private updateGUI() {
    const { a, b, c, step } = this.folders;
    const isStep = this.params.mode.step;

    // ステップ実行時
    if (isStep) {
      a.hide(), b.hide(), c.hide(), step.show();
    } else {
      a.show(), b.show(), c.show(), step.hide();
    }
  }

  //---------------------------------------------------------------------------
  // Graph
  //---------------------------------------------------------------------------
  private shapes = {
    pointA : sShape.draggablePoint(),
    pointB : sShape.draggablePoint(),
    arrowA : sShape.arrow(),
    arrowB : sShape.arrow(),
    arrowC : sShape.arrow().color(sColor.green),
    arrowC2: sShape.arrow().color(sColor.green).visible(false),
    labelO : sShape.text("O"),
    labelA : sShape.text("A"),
    labelB : sShape.text("B"),
    labelV : sShape.text("OA-OB").fontSize(0.17).italic(),
  }


  initGraph() {
    const { shapes } = this;
    shapes.labelO.pos(0, 0);

    shapes.pointA.on('dragmove', this.onDragMovePointA.bind(this));
    shapes.pointB.on('dragmove', this.onDragMovePointB.bind(this));

    sShape.map(shapes, (s) => {this.add(s)});
  }

  private onDragMovePointA(e:Circle) {
    const { a } = this.params;
    a.x = Util.round(e.x());
    a.y = Util.round(e.y());
  }

  private onDragMovePointB(e:Circle) {
    const { b } = this.params;
    b.x = Util.round(e.x());
    b.y = Util.round(e.y());
  }

  private visibleAll(flg:boolean = false) {
    sShape.map(this.shapes, (s) => { s.visible(flg); })
  }

  //---------------------------------------------------------------------------
  // Update
  //---------------------------------------------------------------------------
  update() {
    // ステップ実行時はupdateを呼ばない
    if (this.params.mode.step) return;
    this.calcVectorC();
    this.fitGraphWithParams();
  }

  /** 現在のパラメータの値にグラフを合わせる */
  private fitGraphWithParams() {
    const { shapes } = this;
    const { a, b, c } = this.params;

    shapes.pointA.pos(a.x, a.y);
    shapes.pointB.pos(b.x, b.y);

    shapes.labelA.pos(a.x, a.y);
    shapes.labelB.pos(b.x, b.y).text('B');
    shapes.labelV.pos(c.x, c.y);

    shapes.arrowA.points([0, 0, a.x, a.y]).color(sColor.main);
    shapes.arrowB.points([0, 0, b.x, b.y]).color(sColor.main);
    shapes.arrowC.points([0, 0, c.x, c.y]);
    shapes.arrowC2.visible(false);
  }

  //---------------------------------------------------------------------------
  // Step
  protected initStep() {
    const { step } = this;
    step.init([
      [this.setPhase0.bind(this), `$\\vec{OA}-\\vec{OB}$は`],
      [this.setPhase1.bind(this), `$\\vec{OA}$に`],
      [this.setPhase2.bind(this), `$\\vec{OA}$に$\\vec{OB}$の`],
      [this.setPhase3.bind(this), `$\\vec{OA}$に$\\vec{OB}$の逆ベクトルを`],
      [this.setPhase4.bind(this), `$\\vec{OA}$に$\\vec{OB}$の逆ベクトルを足した`],
      [this.setPhase5.bind(this), `点Oから点B'に向かうベクトルになる`],
      [this.setPhase6.bind(this), `これは$\\vec{BA}$と同じである`],
    ])
  }



  private setPhase0() {
    this.visibleAll(false);
    this.shapes.labelO.visible(true);
    this.shapes.arrowA.visible(true).color(sColor.main);
    this.shapes.labelA.visible(true);
    this.shapes.arrowB.visible(true).color(sColor.main);
    this.shapes.labelB.visible(true).text('B');

    const { a } = this.params;
    this.shapes.arrowA.points([0, 0, a.x, a.y]);
    this.shapes.labelA.pos(a.x, a.y);
  }

  /** OAベクトルに */
  private setPhase1() {
    this.setPhase0()
    const { a } = this.params;
    this.shapes.arrowA.points([0, 0, a.x, a.y]).color(sColor.red);
    this.shapes.labelA.pos(a.x, a.y);
  }

  /** OBベクトルの */
  private setPhase2() {
    this.setPhase1();
    this.shapes.arrowB.visible(true);
    this.shapes.labelB.visible(true);

    const { b } = this.params;
    this.shapes.arrowB.points([0, 0, b.x, b.y]).color(sColor.red);
    this.shapes.labelB.pos(b.x, b.y);
  }

  /** 逆ベクトルを */
  private setPhase3() {
    this.setPhase2();

    const { b } = this.params;
    this.shapes.arrowB.points([0, 0, -b.x, -b.y])
    this.shapes.labelB.text('B\'').pos(-b.x, -b.y);
  }

  /** ベクトルAの先に付け足す */
  private setPhase4() 
  {
    this.setPhase3();

    const { a, b } = this.params;
    this.shapes.arrowB.points([a.x, a.y, a.x -b.x, a.y - b.y])
    this.shapes.labelB.pos(a.x -b.x, a.y -b.y);
  }

  /** 緑のベクトルがOA-OB */
  private setPhase5() {
    this.setPhase4();
    this.shapes.arrowC.visible(true);
  }

  /** またBからAに向かうベクトルでもある */
  private setPhase6() {
    this.setPhase5();
    this.shapes.arrowA.color(sColor.main);
    this.shapes.arrowB.color(sColor.main);
    this.shapes.labelB.text('B');
    const { a, b } = this.params;

    this.fitGraphWithParams();
    this.shapes.arrowC2.visible(true).points([b.x, b.y, a.x, a.y]);
  }
}