import SceneBase from '~/scripts/scene/SceneBase';
import { sShape, sColor, sGroup } from '~/scripts/system';
import { Vector2 } from 'math-lab';
import { Util } from '~/scripts/helper';

/******************************************************************************
 * ベクトル　ベクトルの実数倍
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
    return "ベクトルの実数倍(スカラー倍とも呼ぶ)";
  }

  protected get overview() {
    return `
1. ベクトルに実数をかけると**ベクトルを伸ばしたり縮めたり**できる。

基準とするベクトル$\\vec{a}$(白)を$k$倍すると$k\\vec{a}$(緑)になる。

- $k > 0$の時、**向きを変えず**にk倍される
- $k = 0$の時、零ベクトルになる
- $k < 0$の時、**向きが反対**になってk倍される
`;
  }

  //---------------------------------------------------------------------------
  // Parameters
  //---------------------------------------------------------------------------
  private params = {
    k:3,
    x0:() => { this.params.k = 0; },
    x1:() => { this.params.k = 1; },
    x2:() => { this.params.k = 2; },
    x3:() => { this.params.k = 3; },
  }


  //---------------------------------------------------------------------------
  // GUI
  //---------------------------------------------------------------------------


  initGUI() {
    this.gui.add(this.params, "k", -5, 5).listen().onChange((v:number) => {
      this.params.k = Util.round(v, 1);
    });
    this.gui.add(this.params, "x0");
    this.gui.add(this.params, "x1");
    this.gui.add(this.params, "x2");
    this.gui.add(this.params, "x3");
  }



  //---------------------------------------------------------------------------
  // Graph
  //---------------------------------------------------------------------------
  private groups = {
    v: sGroup.vector(Vector2.zero, Vector2.one),
  }
  private shapes = {
    t: sShape.arrow().color(sColor.green).strokeWidth(10),
  }

  initGraph() {
    sShape.map(this.shapes, (s) => { this.add(s); })
    sGroup.map(this.groups, (g) => { this.add(g); })
  }


  //---------------------------------------------------------------------------
  // Update
  //---------------------------------------------------------------------------
  update() {
    this.shapes.t.visible(this.params.k !== 0);
    if (this.params.k === 0) {
      return;
    }
    const { data } = this.groups.v;
    const v1 = Vector2.sub(data.p2, data.p1);
    const v2 = Vector2.times(v1, this.params.k);
    this.shapes.t.points([
      data.p1.x, data.p1.y, 
      data.p1.x + v2.x, data.p1.y + v2.y
    ]);
  }
}