import SceneBase from '~/scripts/scene/SceneBase';
import { sShape, sColor, sGroup } from '~/scripts/system';
import { Circle } from '~/scripts/node/shape';
import { Vector2, Util } from 'math-lab';
import { GUI as GUIHelper } from '~/scripts/helper';
import { GUI } from 'dat.gui';

/******************************************************************************
 * sin, cos, tan
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
    return "サイン、コサイン、タンジェント";
  }

  protected get description() {
    return `
それぞれ直角三角形の**辺の長さの比率**。
`;
  }

  //---------------------------------------------------------------------------
  // Parameters
  //---------------------------------------------------------------------------
  private params = {
    sin: this.showSin.bind(this),
    cos: this.showCos.bind(this),
    tan: this.showTan.bind(this),
    visibleLength:false,
  }

  showSin() {
    const pos = this.shapes.p.pos();
    const text1 = this.createFormula1("sin");
    const text2 = this.createFormula2("sin", this.angle, pos.y, pos.magnitude);

    this.setComment(`${text1}\n\n${text2}`)
    this.groups.t.visibleSide(false).visibleAB(true).visibleCA(true);
  }

  showCos() {
    const pos = this.shapes.p.pos();
    const text1 = this.createFormula1("cos");
    const text2 = this.createFormula2("cos", this.angle, pos.x, pos.magnitude);

    this.setComment(`${text1}\n\n${text2}`)
    this.groups.t.visibleSide(false).visibleAB(true).visibleBC(true);
  }

  showTan() {
    const pos = this.shapes.p.pos();
    const text1 = this.createFormula1("tan");
    const text2 = this.createFormula2("tan", this.angle, pos.y, pos.x);

    this.setComment(`${text1}\n\n${text2}`)
    this.groups.t.visibleSide(false).visibleBC(true).visibleCA(true);
  }

  onChangeVisibleLengthByGUI(v:boolean) {
    this.groups.t
      .visibleLengthC(v)
      .visibleLengthXY(v)
  }

  private createFormula1(type:string) {
    switch(type) {
      case "sin": return "$\\sin \\theta = \\frac{b}{c}$";
      case "cos": return "$\\cos \\theta = \\frac{a}{c}$";
      default   : return "$\\tan \\theta = \\frac{b}{a}$";
    }
  }

  private createFormula2(type:string, angle:number, nume:number, deno:number) {
    angle = Util.round(angle, 1);
    return `$\\${type} (${angle}) \\fallingdotseq \\frac{${nume}}{${deno}} \\fallingdotseq ${Util.round(nume/deno, 3)}$`
  }

  //---------------------------------------------------------------------------
  // GUI
  //---------------------------------------------------------------------------


  initGUI() {
    this.gui.add(this.params, "sin");
    this.gui.add(this.params, "cos");
    this.gui.add(this.params, "tan");
    const visibleLength = this.gui.addFolder('各辺のだいたいの長さを表示');
    visibleLength.add(this.params, "visibleLength").onChange(this.onChangeVisibleLengthByGUI.bind(this));
  }



  //---------------------------------------------------------------------------
  // Graph
  //---------------------------------------------------------------------------
  private groups = {
    t: sGroup.triangle([3, 3, 0, 0, 3, 0])
  }

  private shapes = {
    p: sShape.draggablePoint(),
    angle: sShape.wedge().pos(0, 0),
    theta: sShape.text().pos(0.5, 0.7).fontSize(0.25),
  }
  initGraph() {

    this.shapes.p.on('dragmove', (e:Circle) => {
      const x = e.x();
      const y = e.y();
      this.groups.t.data.A.set(x, y);
      this.groups.t.data.C.set(x, 0);
      this.groups.t.sync();
    })

    this.addShapes(this.shapes);
    this.add(this.groups.t);
    this.groups.t
      .visibleLabelSide(true);
  }

  get rad() {
    return this.shapes.p.pos().rad;
  }
  get angle() {
    return Util.rad2deg(this.rad);
  }

  //---------------------------------------------------------------------------
  // Update
  //---------------------------------------------------------------------------
  update() {
    this.shapes.p.pos(this.groups.t.data.A);

    const angle = this.angle;
    this.shapes.angle.angle(angle).rotation(-angle);
    this.shapes.theta.text(`θ = ${Util.round(angle)}`);
  }
}