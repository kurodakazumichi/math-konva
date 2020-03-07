import SceneBase from '~/scripts/scene/SceneBase';
import { sShape, sColor } from '~/scripts/system';
import { GUI as GUIHelper } from '~/scripts/helper';

/******************************************************************************
 * サインの利用例
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
    return "サインの利用例";
  }

  protected get description() {
    return ``;
  }

  //---------------------------------------------------------------------------
  // Parameters
  //---------------------------------------------------------------------------
  private params = {
    speed:0.03,
    x:() => { this.changeFlag("x") },
    y:() => { this.changeFlag("y") },
    angle:() => { this.changeFlag("angle"); },
    innerRadius:() => { this.changeFlag("innerRadius"); },
    outerRadius:() => { this.changeFlag("outerRadius"); },
    opacity:() => { this.changeFlag("opacity"); }
  }

  private flags = {
    x:false,
    y:false,
    angle:false,
    innerRadius:false,
    outerRadius:false,
    opacity:false,
  }

  private changeFlag(name:string) {
    this.timer = 0;
    const flags = this.flags as any;
    Object.keys(flags).map((key) => {
      flags[key] = false;
    })
    flags[name] = true;
    this.initStar();
  }

  //---------------------------------------------------------------------------
  // GUI
  //---------------------------------------------------------------------------


  initGUI() {
    this.gui.add(this.params, "speed", -0.1, 0.1).step(0.01);
    this.gui.add(this.params, "x");
    this.gui.add(this.params, "y");
    this.gui.add(this.params, "angle");
    this.gui.add(this.params, "innerRadius");
    this.gui.add(this.params, "outerRadius");
    this.gui.add(this.params, "opacity");
  }

  //---------------------------------------------------------------------------
  // Graph
  //---------------------------------------------------------------------------
  private star = sShape.star();

  private initStar() {
    this.star.pos(0, 0)
      .fill(sColor.yellow)
      .innerRadius(0.5)
      .outerRadius(1)
      .opacity(1)
      .rotation(0)
  }

  initGraph() {
    this.initStar();
    this.add(this.star);
  }

  //---------------------------------------------------------------------------
  // Update
  //---------------------------------------------------------------------------
  update() {
    const { speed } = this.params;
  
    this.timer++;
    
    const pos = this.star.pos();

    if (this.flags.x) {
      pos.x = Math.sin(this.timer * speed) * 4;
    }

    if (this.flags.y) {
      pos.y = Math.sin(this.timer * speed) * 4;
    }

    if (this.flags.angle) {
      this.star.rotation(Math.sin(this.timer * speed) * 360)
    }

    if (this.flags.innerRadius) {
      this.star.innerRadius(Math.sin(this.timer * speed));
    }

    if (this.flags.outerRadius) {
      this.star.outerRadius(Math.sin(this.timer * speed));
    }

    if (this.flags.opacity) {
      const sin = Math.sin(this.timer * speed);
      this.star.opacity(Math.abs(sin));
    }


    this.star.pos(pos);
  }
}