import SceneBase from '~/scripts/scene/SceneBase';
import { sShape, sColor, sGroup, sCoord } from '~/scripts/system';
import { Circle } from '~/scripts/node/shape';
import { Vector2 } from 'math-lab';
import { GUI as GUIHelper, Util } from '~/scripts/helper';
import { GUI } from 'dat.gui';

enum State {
  Default,
  Animation,
}

enum Animation {
  Phase1,
}

const MAX_ANIM_PHASE = Util.enumLength(Animation);

interface IGuiFolders {
  anim:GUI|null,
  vecA:GUI|null,
  vecB:GUI|null,
}

/******************************************************************************
 * ベクトル　ベクトルの加法
 *****************************************************************************/
export default class Scene extends SceneBase 
{  
  constructor() {
    super();
    this.onDragMovePA = this.onDragMovePA.bind(this);
    this.onDragMovePB = this.onDragMovePB.bind(this);
    this.onChangeModeInGui  = this.onChangeModeInGui.bind(this);
    this.onChangeTimerInGui = this.onChangeTimerInGui.bind(this);
  }

  //---------------------------------------------------------------------------
  // Overrideするプロパティ
  //---------------------------------------------------------------------------
  protected get title() {
    return "ベクトルの加法(足し算)";
  }

  protected get description() {
    return `
$\\vec{a} + \\vec{b} = \\vec{c}$

ベクトルの加法(足し算)はそれぞれの**x成分、y成分を足し合わせる**

$\\vec{c}$は$\\vec{a}$の後ろに$\\vec{b}$を**くっつけた場所**にくる
`;
  }

  //---------------------------------------------------------------------------
  // Parameters
  //---------------------------------------------------------------------------
  private params = {
    a: new Vector2(2, 2),
    b: new Vector2(-3, 1),
    mode: {
      state:State.Default,
      animation:false,
    },
    animation: {
      phase:Animation.Phase1,
      timer:0,
      stop:true,
    }
    
  }

  private folders:IGuiFolders = {
    anim:null,
    vecA:null,
    vecB:null,
  }

  //---------------------------------------------------------------------------
  // GUI
  //---------------------------------------------------------------------------
  initGUI() {

    const state = this.gui.addFolder("mode");
    state
      .add(this.params.mode, "animation")
      .onChange(this.onChangeModeInGui)
    state.open();

    const anim = this.gui.addFolder("animation");
    GUIHelper
      .addSlider(anim, this.params.animation, "timer")
      .step(0.01)
      .onChange(this.onChangeTimerInGui);
    anim.add(this.params.animation, "stop").listen();
    anim.open();
    anim.hide();

    const a = this.gui.addFolder("ベクトルa");
    GUIHelper.addSlider(a, this.params.a, "x");
    GUIHelper.addSlider(a, this.params.a, "y");
    a.open();

    const b = this.gui.addFolder("ベクトルb");
    GUIHelper.addSlider(b, this.params.b, "x");
    GUIHelper.addSlider(b, this.params.b, "y");
    b.open();

    this.folders.anim = anim;
    this.folders.vecA = a;
    this.folders.vecB = b;
  }

  onChangeModeInGui(v:boolean) {
    this.setState((v)?State.Animation:State.Default);
  }

  onChangeTimerInGui() {
    this.params.animation.stop = true; this.updateAnimationFunc(); 
  }

  //---------------------------------------------------------------------------
  // State管理
  private setState(state:State) {
    switch(state) {
      case State.Default  : this.setStateToDefault(); break;
      case State.Animation: this.setStateToAnimation(); break;
    }
  }

  /** デフォルト状態へ遷移 */
  private setStateToDefault() {
    this.params.mode.state = State.Default;

    // init shape visibles
    this.setVisibleAll(true);

    // init gui
    this.folders.anim?.hide();
    this.folders.vecA?.show();
    this.folders.vecB?.show();

    this.updateDefault();
  }

  /** Animation状態へ遷移 */
  private setStateToAnimation() {
    this.params.mode.state = State.Animation;

    // init shape visibles
    this.setVisibleAll(true);
    this.shapes.pa.visible(false);
    this.shapes.pb.visible(false);

    // init gui
    this.folders.anim?.show();
    this.folders.vecA?.hide();
    this.folders.vecB?.hide();

    // init params
    const anim = this.params.animation;
    anim.timer = 0;
    anim.stop = false;
    this.setAnimatioinPhase(Animation.Phase1);
  }


  //---------------------------------------------------------------------------
  // Graph
  //---------------------------------------------------------------------------

  /** グラフ内の要素 */
  private shapes = {
    pa     : sShape.draggablePoint(),
    pb     : sShape.draggablePoint(),
    va     : sShape.arrow().opacity(0.4),
    vb     : sShape.arrow().opacity(0.4),
    vc     : sShape.arrow().color(sColor.green),
    labelA : sShape.text("a").fontSize(0.25).italic(),
    labelB : sShape.text("b").fontSize(0.25).italic(),
    labelC : sShape.text("c").fontSize(0.25).italic(),
  }

  initGraph() {
    sShape.map(this.shapes, (shape) => { this.add(shape); })

    this.shapes.pa.on("dragmove", this.onDragMovePA);
    this.shapes.pb.on("dragmove", this.onDragMovePB);

    this.setStateToDefault();
  }

  private onDragMovePA(e:Circle) {
    const { a } = this.params;
    a.x = Util.round(e.x());
    a.y = Util.round(e.y());
  }

  private onDragMovePB(e:Circle) {
    const { b } = this.params;
    b.x = Util.round(e.x());
    b.y = Util.round(e.y());
  }

  private setVisibleAll(flg:boolean) {
    sShape.map(this.shapes, (shape) => {
      shape.visible(flg);
    })
  }

  //---------------------------------------------------------------------------
  // Update
  //---------------------------------------------------------------------------
  update() {
    switch(this.params.mode.state) {
      case State.Default  : this.updateDefault(); break;
      case State.Animation: this.updateAnimation(); break;
    }
  }

  //---------------------------------------------------------------------------
  // default
  private updateDefault() {
    const { a, b } = this.params;
    this.shapes.va.points([0, 0, a.x, a.y]);
    this.shapes.vb.points([0, 0, b.x, b.y]);

    const c = Vector2.add(a, b);
    this.shapes.vc.points([0, 0, c.x, c.y]);

    this.shapes.labelA.pos(a.x, a.y).text(`a(${Util.round(a.x)}, ${Util.round(a.y)})`);
    this.shapes.labelB.pos(b.x, b.y).text(`b(${Util.round(b.x)}, ${Util.round(b.y)})`);
    this.shapes.labelC.pos(c.x, c.y).text(`c(${Util.round(c.x)}, ${Util.round(c.y)})`);

    this.shapes.pa.pos(a.x, a.y);
    this.shapes.pb.pos(b.x, b.y);
  }

  //---------------------------------------------------------------------------
  // update animation
  private updateAnimationFunc = () => {}
  private updateAnimation() 
  {
    const anim = this.params.animation;

    // 停止中は処理しない
    if (anim.stop) return;

    // 時間を進めつつ調整
    anim.timer += 0.02;
    anim.timer = Math.min(1, anim.timer);

    this.updateAnimationFunc();
  }

  private setAnimatioinPhase(phase:Animation) 
  {
    this.params.animation.phase = phase;
    this.params.animation.timer = 0;
    this.params.animation.stop = false;

    switch(phase) {
      case Animation.Phase1: this.setPhase1(); break;
    }
  }

  private setPhase1() {
    this.shapes.labelA.visible(false);
    this.shapes.labelB.visible(false);
    this.updateAnimationFunc = this.updatePhase1;
  }

  private updatePhase1() {
    const { a, b, animation } = this.params;

    const c = Vector2.add(a, b);

    const p = [
      a.x * animation.timer,
      a.y * animation.timer,
      b.x + (c.x - b.x) * animation.timer,
      b.y + (c.y - b.y) * animation.timer
    ]

    this.shapes.vb.points(p);
    this.shapes.labelB.pos(p[2], p[3])
  }
}