import SceneBase from '~/scripts/scene/SceneBase';
import { sShape, sCoord, sGroup } from '~/scripts/system';
import { GUI as GUIHelper } from '~/scripts/helper';
import { Vector2 } from 'math-lab';

/******************************************************************************
 * 等速直線運動
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
    return "等速直線運動";
  }

  protected get description() {
    return `
一定方向に等速で進む運動。
`;
  }

  //---------------------------------------------------------------------------
  // Parameters
  //---------------------------------------------------------------------------
  private params = {
    speed :0.02,
  }


  //---------------------------------------------------------------------------
  // GUI
  //---------------------------------------------------------------------------

  initGUI() {
    GUIHelper.addSlider(this.gui, this.params, "speed").step(0.01);
  }

  //---------------------------------------------------------------------------
  // Graph
  //---------------------------------------------------------------------------
  private groups = {
    velocity: sGroup.vector(Vector2.zero, Vector2.one)
  }
  private shapes =  {
    c1: sShape.point(),
  }
  initGraph() {
    this.addGroups(this.groups);
    this.addShapes(this.shapes);
  }

  //---------------------------------------------------------------------------
  // Update
  //---------------------------------------------------------------------------
  update() {
    this.timer++;

    const pos   = this.shapes.c1.pos();
    pos.x += this.groups.velocity.vec.x * this.params.speed;
    pos.y += this.groups.velocity.vec.y * this.params.speed;

    sCoord.cramp(pos);
    this.shapes.c1.pos(pos);
  }
}