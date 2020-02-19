import SceneBase from '~/scripts/scene/SceneBase';
import { sShape, sColor } from '~/scripts/system';
import { Circle } from '~/scripts/node/shape';
import { Vector2 } from 'math-lab';
import { GUI as GUIHelper, Util } from '~/scripts/helper';
import { GUI } from 'dat.gui';

/******************************************************************************
 * ベクトル　ベクトルの加法
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
    return "ベクトルの減法(引き算)";
  }

  protected get description() {
    return `
２つのベクトル$\\vec{a}$, $\\vec{b}$の引き算は$\\vec{a}$に$\\vec{b}$の**逆ベクトルを足したモノ**として

$\\vec{a} + (-\\vec{b})$と表すことができる。

- **ベクトルの減法**：それぞれの*x成分*と*y成分*同士を引く
- $\\vec{OA}-\\vec{OB}$は**BからAに向かうベクトル**$\\vec{BA}$になる


:::note
ある点Aからある点Bに向かうベクトルが欲しい場合は$\\vec{b}-\\vec{a}$で求められるので便利
`;
  }

  //---------------------------------------------------------------------------
  // Parameters
  //---------------------------------------------------------------------------
  private params = {
    a:new Vector2( 1, 1),
    b:new Vector2(-1, 1),
    c:new Vector2(),
  }

  //---------------------------------------------------------------------------
  // GUI
  //---------------------------------------------------------------------------
  initGUI() {

  }

  //---------------------------------------------------------------------------
  // Graph
  //---------------------------------------------------------------------------
  private arrowA = sShape.arrow();
  private arrowB = sShape.arrow();
  private arrowC = sShape.arrow().color(sColor.green);
  private labelO = sShape.text("O");
  private labelA = sShape.text("A");
  private labelB = sShape.text("B");
  private labelV = sShape.text("OA-OB").fontSize(0.17).italic();
  private pointA = sShape.draggablePoint();
  private pointB = sShape.draggablePoint();

  initGraph() {
    // TODO:pointA,BのonDragMove
    this.add(this.pointA, this.pointB);
    this.add(this.labelO, this.labelA, this.labelB, this.labelV);
    this.add(this.arrowA, this.arrowB, this.arrowC);
  }

  //---------------------------------------------------------------------------
  // Update
  //---------------------------------------------------------------------------
  update() {
    const { a, b } = this.params;
    const c = Vector2.sub(a, b);

    this.pointA.pos(a.x, a.y);
    this.pointB.pos(b.x, b.y);

    this.labelA.pos(a.x, a.y);
    this.labelB.pos(b.x, b.y);
    this.labelV.pos(c.x, c.y);

    this.arrowA.points([0, 0, a.x, a.y]);
    this.arrowB.points([0, 0, b.x, b.y]);
    this.arrowC.points([0, 0, c.x, c.y]);
  }
}