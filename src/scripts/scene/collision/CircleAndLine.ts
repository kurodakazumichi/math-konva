import SceneBase from '~/scripts/scene/SceneBase';
import { sShape, sGroup } from '~/scripts/system';
import { Vector2 } from 'math-lab';
import { Collision } from '~/scripts/helper/';

/******************************************************************************
 * 円の線の衝突判定
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
    return "円と線の衝突判定";
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

  }

  //---------------------------------------------------------------------------
  // Graph
  //---------------------------------------------------------------------------
  private groups = {
    circle: sGroup.circle(Vector2.zero, 2),
    line  : sGroup.line(Vector2.zero, Vector2.one),
  }
  private shapes = {
    hit : sShape.star(),
    hit2: sShape.star(),
  }

  initGraph() {
    sShape.map(this.shapes, (s) => { this.add(s); })
    sGroup.map(this.groups, (g) => { this.add(g); })
    this.onChangeGuide(this.params.guide);
  }

  //---------------------------------------------------------------------------
  // Update
  //---------------------------------------------------------------------------
  private p = new Vector2(0, 0);
  update() {
    if (this.params.update) {
      this.timer++;
      this.p.x = Math.cos(this.timer * 0.01) * 3;
      this.p.y = Math.sin(this.timer * 0.01) * 3;
      this.groups.circle.data.p.copy(this.p);
      this.groups.circle.sync();
    }

    this.updateGuide();
    this.updateCollision();
  }

  private updateGuide() {
    if (!this.params.guide) return;
  }

  private updateCollision() {
    const { circle, line } = this.groups;

    // 円と線の衝突検知
    const source = Collision.getSourceCircleAndLine(circle.data, line.data);

    if (source.isHit) {
      this.shapes.hit.pos(source.pos1);
      this.shapes.hit2.pos(source.pos2);
    }

    sShape.map(this.shapes, (s) => { s.visible(source.isHit); })
  }
}