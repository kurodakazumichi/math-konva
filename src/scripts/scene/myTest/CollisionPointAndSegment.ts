import SceneBase from '~/scripts/scene/SceneBase';
import { sShape, sGroup } from '~/scripts/system';
import { Vector2 } from 'math-lab';
import { Collision } from '~/scripts/helper/';

/******************************************************************************
 * 点と線分の衝突判定
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
    return "点と線分の衝突判定";
  }

  protected get description() {
    return `
点と線分の衝突はやや手順が面倒。

1. **線分のベクトル**を$\\vec{a}$  
2. **線分の始点からの任意の点に向かうベクトル**を$\\vec{b}$

としたとき

### 条件２

点と線分が重なる時  
$\\vec{a}$の長さより、$\\vec{b}$の方が短くなければいけない


### 手順２

1. 内積は$|\\vec{a}||\\vec{b}|\\cos\\theta$で求められる
1. 点と線が重なる場合、$\\vec{a}$と$\\vec{b}$は平行になるので
1. $\\vec{a}$と$\\vec{b}$のなす角は0度
1. よって内積の値は$|\\vec{a}||\\vec{b}|\\cos(0)$
1. $cos(0)$は**1**なので
1. $|\\vec{a}||\\vec{b}|\\cos(0) = |\\vec{a}||\\vec{b}|$となり
1. *点と線がぶつかる時は*、**内積の値**と$\\vec{a}$と$\\vec{b}$の**長さをかけたものと一致**するはず

という事を衝突判定に利用する。


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
    this.shapes.aux1.visible(v);
    this.shapes.aux2.visible(v);
    this.segment.visibleDirArrow(v);
  }

  //---------------------------------------------------------------------------
  // Graph
  //---------------------------------------------------------------------------
  segment = sGroup.segment(new  Vector2(0, 0), new Vector2(-3, 3))
  
  private shapes = {
    p: sShape.point(),
    aux1:sShape.arrow().strokeWidth(1),
    aux2:sShape.auxLine().dash(0.1).strokeWidth(5),
    hit : sShape.star(),
  }

  initGraph() {
    this.add(this.segment);
    sShape.map(this.shapes, (s) => { this.add(s); })
    this.onChangeGuide(this.params.guide);
  }

  get segment2D() {
    return this.segment.data;
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
    const source = Collision.getSourceSegmentAndPoint(this.segment.data, this.p, 0.01);

    if (this.params.guide) {
      const { p } = this.segment.data;
      this.shapes.aux1.points([p.x, p.y, this.p.x, this.p.y])
      this.shapes.aux2.points([source.pos.x, source.pos.y, p.x, p.y])
    }

    // intersectは衝突結果のみわかる 
    // const isHit = this.segment.intersect(this.p, 0.01);
    const isHit = (source.l2 < source.l1) && (source.l2 - source.dot < 0.001);

    if (isHit) {

      this.shapes.hit.pos(source.pos.x, source.pos.y);
      this.shapes.hit.visible(true);
    } else {
      this.shapes.hit.visible(false);
    }
  }
}