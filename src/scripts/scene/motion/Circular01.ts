import SceneBase from '~/scripts/scene/SceneBase';
import { sShape } from '~/scripts/system';
import { GUI as GUIHelper } from '~/scripts/helper';

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
    return "円運動 その１";
  }

  protected get overview() {
    return `
原点(0, 0)を中心とした円運動は**x座標をcosθ**、**y座標をsinθ**にする。

\`\`\`
// イメージコード
update() {
  this.timer++;
  circle.x = Math.cos(this.timer * speed) * radius;
  circle.y = Math.sin(this.timer * speed) * radius;
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

    const x = Math.cos(this.timer * this.params.speed) * this.params.radius;
    const y = Math.sin(this.timer * this.params.speed) * this.params.radius;
    this.shapes.c1.pos(x, y);
  }
}