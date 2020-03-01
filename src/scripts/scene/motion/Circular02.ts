import SceneBase from '~/scripts/scene/SceneBase';
import { sShape } from '~/scripts/system';
import { GUI as GUIHelper } from '~/scripts/helper';
import { Circle } from '~/scripts/node/group';

/******************************************************************************
 * 円運動
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
    return "円運動 その２";
  }

  protected get description() {
    return `
**任意の点を中心**とした円運動。

\`\`\`
// イメージコード
update() {
  this.timer++;
  circle.x = center.x + Math.cos(this.timer * speed) * radius;
  circle.y = center.y + Math.sin(this.timer * speed) * radius;
}
\`\`\`
`;
  }

  //---------------------------------------------------------------------------
  // Parameters
  //---------------------------------------------------------------------------
  private params = {
    radius:1,
    speed :0.01,
  }


  //---------------------------------------------------------------------------
  // GUI
  //---------------------------------------------------------------------------

  initGUI() {
    GUIHelper.addSlider(this.gui, this.params, "radius");
    GUIHelper.addSlider(this.gui, this.params, "speed").step(0.01);
  }

  //---------------------------------------------------------------------------
  // Graph
  //---------------------------------------------------------------------------
  private shapes =  {
    c : sShape.draggablePoint().pos(2, 2),
    c1: sShape.point(),
  }
  initGraph() {
    this.addShapes(this.shapes);
  }

  //---------------------------------------------------------------------------
  // Update
  //---------------------------------------------------------------------------
  update() {
    this.timer++;
    const { c } = this.shapes;
    const x = c.pos().x + Math.cos(this.timer * this.params.speed) * this.params.radius;
    const y = c.pos().y + Math.sin(this.timer * this.params.speed) * this.params.radius;
    this.shapes.c1.pos(x, y);
  }
}