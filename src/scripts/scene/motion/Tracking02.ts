import SceneBase from '~/scripts/scene/SceneBase';
import { sShape } from '~/scripts/system';
import { Vector2 } from 'math-lab';


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
    return "目的地を目指す";
  }

  protected get description() {
    return `
速度を補間しながら目的にたどり着く
`;
  }

  //---------------------------------------------------------------------------
  // Parameters
  //---------------------------------------------------------------------------
  private params = {
    speed :0.01,
  }


  //---------------------------------------------------------------------------
  // GUI
  //---------------------------------------------------------------------------

  initGUI() {
    this.gui.add(this.params, "speed", 0, 1)
  }

  //---------------------------------------------------------------------------
  // Graph
  //---------------------------------------------------------------------------
  private shapes =  {
    c: sShape.point().radius(0.2),
    t: sShape.draggablePoint().pos(0, 0),
  }
  initGraph() {
    this.addShapes(this.shapes);
  }

  //---------------------------------------------------------------------------
  // Update
  //---------------------------------------------------------------------------
  private velocity = Vector2.zero;

  update() {
    const { c, t } = this.shapes;
    const { speed } = this.params;

    // ターゲットとの間のベクトル
    const v1 = Vector2.sub(t.pos(), c.pos());
    this.velocity.lerp(v1, speed);

    // 位置を更新
    const pos = c.pos();
    pos.add(this.velocity);

    this.shapes.c.pos(pos);
  }
}
