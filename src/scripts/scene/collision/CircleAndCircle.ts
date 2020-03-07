import SceneBase from '~/scripts/scene/SceneBase';
import { sShape, sGroup, sColor } from '~/scripts/system';
import { Vector2 } from 'math-lab';
import { Collision } from '~/scripts/helper/';

/******************************************************************************
 * 円と円の衝突判定
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
    return "円と円の衝突判定";
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
  private groups = {
    c1: sGroup.circle(new Vector2(-3, 3), 1),
    c2: sGroup.circle(new Vector2(2, -2), 1.5),
  }
  private shapes = {
    aux:sShape.auxLine().dash(0.1).strokeWidth(1),
  }

  initGraph() {
    sGroup.map(this.groups, (g) => { this.add(g); })
    sShape.map(this.shapes, (s) => { this.add(s); })
    this.onChangeGuide(this.params.guide);
  }

  //---------------------------------------------------------------------------
  // Update
  //---------------------------------------------------------------------------
  
  update() {
    if (this.params.update){
      this.timer++;
      this.groups.c1.data.p.x = Math.sin(this.timer * 0.01) * 3;
      this.groups.c1.data.p.y = Math.cos(this.timer * 0.01) * 3;
      this.groups.c1.sync();
    }

    this.updateGuide();
    this.updateCollision();

  }

  private updateGuide() {
    if (!this.params.guide) return;
    const c1 = this.groups.c1.data.p;
    const c2 = this.groups.c2.data.p;
    this.shapes.aux.points([c1.x, c1.y, c2.x, c2.y]);
  }

  private updateCollision() {
    const { c1, c2 } = this.groups;
    const isHit = Collision.isHitCircleAndCircle(c1.data, c2.data);

    const color = (isHit)? sColor.yellow:sColor.main;
    c1.stroke(color);
    c2.stroke(color);
  }
}