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
一直線に目的地にたどり着く
`;
  }

  //---------------------------------------------------------------------------
  // Parameters
  //---------------------------------------------------------------------------
  private params = {
    speed :0.1,
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
  update() {
    const { c, t } = this.shapes;
    const { speed } = this.params;

    // ターゲットとの間のベクトル
    const v = Vector2.sub(t.pos(), c.pos());

    // 位置を更新
    const pos = c.pos();
    pos.add(v.normalize.times(speed));

    // 距離が近かったらターゲットの位置に合わせる
    if (v.magnitude < speed) {
      pos.copy(t.pos());
    }

    this.shapes.c.pos(pos);
  }
}