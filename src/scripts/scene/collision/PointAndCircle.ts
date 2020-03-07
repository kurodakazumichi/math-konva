import SceneBase from '~/scripts/scene/SceneBase';
import { sShape, sGroup } from '~/scripts/system';
import { Vector2 } from 'math-lab';
import { Collision } from '~/scripts/helper/';

/******************************************************************************
 * 点と円の衝突判定
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
    return "点と円の衝突判定";
  }

  protected get overview() {
    return `
`;
  }

  //---------------------------------------------------------------------------
  // Parameters
  //---------------------------------------------------------------------------
  private params = {
    update:true,
    guide:false,
  }

  //---------------------------------------------------------------------------
  // GUI
  //---------------------------------------------------------------------------
  initGUI() {
    this.gui.add(this.params, "update");
    this.gui.add(this.params, "guide").onChange(this.onChangeGuide.bind(this));
  }

  onChangeGuide(v:boolean) {
    this.shapes.aux.visible(v);
  }

  //---------------------------------------------------------------------------
  // Graph
  //---------------------------------------------------------------------------
  private circle = sGroup.circle(Vector2.zero, 2);

  private shapes = {
    hit : sShape.star(),
    p: sShape.point(),
    aux:sShape.auxLine().dash(0.1).strokeWidth(1),
  }

  initGraph() {
    this.add(this.circle);
    sShape.map(this.shapes, (s) => { this.add(s); })
    this.onChangeGuide(this.params.guide);
  }

  //---------------------------------------------------------------------------
  // Update
  //---------------------------------------------------------------------------
  p:Vector2 = new Vector2();
  update() {
    if (this.params.update){
      this.timer++;

      // 点Pの円運動
      this.p.x = Math.cos(this.timer * 0.01) * 3;
      this.p.y = Math.sin(this.timer * 0.01) * 3;
      this.shapes.p.pos(this.p.x, this.p.y);
    }

    this.updateGuide();
    this.updateCollision();

  }

  private updateGuide() {
    if (!this.params.guide) return;
    const center = this.circle.data.p;
    this.shapes.aux.points([center.x, center.y, this.p.x, this.p.y]);
  }

  private updateCollision() {
    const isHit =  Collision.isHitCircleAndPoint(this.circle.data, this.p);
    if (isHit) {
      this.shapes.hit.pos(this.p);
    }
    this.shapes.hit.visible(isHit);
  }
}