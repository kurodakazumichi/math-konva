import SceneBase from '~/scripts/scene/SceneBase';
import { sShape, sCoord, sGroup } from '~/scripts/system';
import { GUI as GUIHelper } from '~/scripts/helper';
import { Vector2 } from 'math-lab';
import { Circle } from '~/scripts/node/shape'

/******************************************************************************
 * 物理挙動
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
    return "物理挙動";
  }

  protected get description() {
    return `
重力による加速度運動と跳ね返り
`;
  }

  //---------------------------------------------------------------------------
  // Parameters
  //---------------------------------------------------------------------------
  private params = {
    gravity :0.001,
  }


  //---------------------------------------------------------------------------
  // GUI
  //---------------------------------------------------------------------------

  initGUI() {
    GUIHelper.addSlider(this.gui, this.params, "gravity").step(0.001);
  }

  //---------------------------------------------------------------------------
  // Graph
  //---------------------------------------------------------------------------
  private shapes =  {
    c: sShape.draggablePoint().x(0),
  }
  initGraph() {
    this.shapes.c
      .on('dragstart', this.onDragStart.bind(this))
      .on('dragend', this.onDragEnd.bind(this))
    
    this.addShapes(this.shapes);
  }

  private onDragStart(e:Circle) {
    this.start = e.pos()
    this.isPhysical = false;
  }

  private onDragEnd(e:Circle) {
    this.velocity = Vector2.sub(this.start, e.pos()).times(0.1);
    this.isPhysical = true;
  }
  

  //---------------------------------------------------------------------------
  // Update
  //---------------------------------------------------------------------------
  private isPhysical = true;
  private velocity:Vector2 = new Vector2(0, -0.01);
  private start:Vector2 = Vector2.zero;
  update() {
    if (!this.isPhysical) return;
    this.velocity.y -= this.params.gravity;

    const pos   = this.shapes.c.pos();
    pos.add(this.velocity);

    if (pos.y < 0){
      this.velocity.y *= -0.7;
      this.velocity.x *= 0.7;
      pos.y = 0;
    }

    if (sCoord.top < pos.y) {
      this.velocity.y *= -1;
    }
    if (pos.x < sCoord.left || sCoord.right < pos.x ) {
      this.velocity.x *= -1;
    }

    this.shapes.c.pos(pos);
  }
}