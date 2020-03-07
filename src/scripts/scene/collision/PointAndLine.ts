import { Vector2 } from 'math-lab';
import SceneBase from '~/scripts/scene/SceneBase';
import { sShape, sGroup } from '~/scripts/system';
import { Collision } from '~/scripts/helper/';

/******************************************************************************
 * 点と線の衝突判定
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
    return "点と線の衝突判定";
  }

  protected get description() {
    return `
1. **線の方向を表すベクトル**を$\\vec{a}$  
2. **線の任意の点から動く点に向かうベクトル**を$\\vec{b}$

この２つのベクトルの**外積が0**になったとき(*ベクトルが平行*)  
**点と線が衝突**した時であると判定できる。
`;
  }

  //---------------------------------------------------------------------------
  // Parameters
  //---------------------------------------------------------------------------
  private params = {
    update:true,
    guide:true,
  }

  //---------------------------------------------------------------------------
  // GUI
  //---------------------------------------------------------------------------
  initGUI() {
    this.gui.add(this.params, "update");
    this.gui.add(this.params, "guide").onChange(this.onChangeGuide.bind(this));
  }

  onChangeGuide(v:boolean) {
    this.shapes.aux1.visible(v);
    this.shapes.aux2.visible(v);
    this.line.visibleDirArrow(v);
  }

  //---------------------------------------------------------------------------
  // Graph
  //---------------------------------------------------------------------------
  line = sGroup.line(new  Vector2(0, 0), new Vector2(1, 1))

  private shapes = {
    p: sShape.point(),
    aux1:sShape.arrow().strokeWidth(1),
    aux2:sShape.auxLine().dash(0.1),
    hit : sShape.star(),
  }

  initGraph() {
    sShape.map(this.shapes, (s) => { this.add(s); })
    this.add(this.line);
    this.onChangeGuide(this.params.guide);
  }

  get line2D() {
    return this.line.data;
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

    // 衝突判定
    const source = Collision.getSourceLineAndPoint(this.line2D, this.p, 0.1)

    if (this.params.guide) {
      const { p } = this.line.data;
      this.shapes.aux1.points([p.x, p.y, this.p.x, this.p.y])
      this.shapes.aux2.points([source.perp.x, source.perp.y, this.p.x, this.p.y])
    }

    if (source.isHit) {
      this.shapes.hit.pos(source.perp.x, source.perp.y);
      this.shapes.hit.visible(true);
    } else {
      this.shapes.hit.visible(false);
    }
  }
}