import SceneBase from '~/scripts/scene/SceneBase';
import { sShape } from '~/scripts/system';
import { Circle } from '~/scripts/node/shape';
import { Vector2 } from 'math-lab';
import { GUI as GUIHelper, Collision } from '~/scripts/helper';

/******************************************************************************
 * 点と点の衝突
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
    return "点と点の衝突判定";
  }

  protected get description() {
    return `
点と点の衝突は**２つの点のx座標とy座標が一致**しているかどうかで判定できる。

:::note
プログラムには**小数点誤差**があるので、完全に一致させるのはむずかしい。  
そのため*ある程度近づいたら当たった事にする*という少し緩めの判定が必要。
:::
`;
  }

  //---------------------------------------------------------------------------
  // Parameters
  //---------------------------------------------------------------------------
  private params = {
    update: true,
    A: new Vector2(-3, 3),
    B: new Vector2(3, 3),
  }



  //---------------------------------------------------------------------------
  // GUI
  //---------------------------------------------------------------------------
  initGUI() {
    this.gui.add(this.params, "update");

    const A = this.gui.addFolder("緑");
    GUIHelper.addSlider(A, this.params.A, "x");
    GUIHelper.addSlider(A, this.params.A, "y");
    A.open();

    const B = this.gui.addFolder("赤");
    GUIHelper.addSlider(B, this.params.B, "x");
    GUIHelper.addSlider(B, this.params.B, "y");
    B.open();
  }

  //---------------------------------------------------------------------------
  // Graph
  //---------------------------------------------------------------------------
  private shapes = {
    hit: sShape.star().outerRadius(0.5).innerRadius(0.3),
    A:sShape.point(),
    B:sShape.draggablePoint().on('dragmove', (e:Circle) => {
      this.params.B.x = e.x2();
      this.params.B.y = e.y2();
    }),
  }
  initGraph() {
    sShape.map(this.shapes, (s) => { this.add(s); })
  }

  //---------------------------------------------------------------------------
  // Update
  //---------------------------------------------------------------------------
  private velocity = new Vector2();
  update() {
    const { A, B, update } = this.params;

    if (!update) return;

    this.velocity = Vector2.sub(B, A).normalize.times(0.03);
    A.add(this.velocity);

    const isHit = Collision.isHitPointAndPoint(A, B, 0.1);

    if (isHit) {
      A.x = B.x;
      A.y = B.y;
    }

    this.shapes.A.pos(A.x, A.y);
    this.shapes.B.pos(B.x, B.y)
    this.shapes.hit.pos(A.x, A.y);
    this.shapes.hit.visible(isHit);
  }
}