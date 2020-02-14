
import SceneBase from '~/scripts/scene/SceneBase';
import { sShape } from '~/scripts/system';
import { Line, Text } from '~/scripts/node/shape';

/******************************************************************************
 * 直線 y=ax+bのシーン
 *****************************************************************************/
export default class SampleScene extends SceneBase 
{  
  constructor() {
    super();
  }

  //---------------------------------------------------------------------------
  // Overrideするプロパティ
  //---------------------------------------------------------------------------
  protected get title() {
    return "三平方の定理";
  }

  protected get formula() {
    return `$$c^2=a^2 + b^2$$`
  }

  protected get explanation() {
    return `
    <em>直角三角形</em>の斜辺を<b>c</b>、底辺を<b>a</b>、高さを<b>b</b>とすると上の式が成り立つ。<br>
    <em>ピタゴラスの定理</em>とも呼ばれる。
    `;
  }

  //---------------------------------------------------------------------------
  // GUI
  //---------------------------------------------------------------------------
  params = {
    bottom:4,
    height:3,
  }

  initGUI() {
    const f1 = this.gui.addFolder("三角形の底辺と高さ");
    f1.add(this.params, "bottom").step(0.1);
    f1.add(this.params, "height").step(0.1);
    f1.open();
  }

  //---------------------------------------------------------------------------
  // Graph
  //---------------------------------------------------------------------------

  /** グラフ内の要素 */
  private triangle:Line       = sShape.solidLine();
  private textBottom:Text     = sShape.text().fontSize(30).offsetY(-0.2);
  private textHeight:Text     = sShape.text().fontSize(30).offsetX(0.2);
  private textHypotenuse:Text = sShape.text().fontSize(30).offset(-0.1, 0.3);
  private formulaAxA:Text     = sShape.text().fontSize(50).offsetX(0.1).y(-2.0).fontFamily("Monaco");
  private formulaBxB:Text     = sShape.text().fontSize(50).offsetX(0.1).y(-2.5).fontFamily("Monaco");
  private formulaCxC:Text     = sShape.text().fontSize(50).offsetX(0.1).y(-3.0).fontFamily("Monaco");

  initGraph() {
    this.add(this.triangle);
    this.add(this.textBottom);
    this.add(this.textHeight);
    this.add(this.textHypotenuse);
    this.add(this.formulaAxA);
    this.add(this.formulaBxB);
    this.add(this.formulaCxC);
  }

  update() {
    const { bottom:x, height:y } = this.params;

    this.triangle.points([0, 0, x, 0, x, y, 0, 0]);

    this.textBottom.pos(x/2, 0).text(`a = ${x.toFixed(1)}`);
    this.textHeight.pos(x, y/2).text(`b = ${y.toFixed(1)}`);
    this.textHypotenuse.pos(x/2, y/2).text(`c`);
    this.formulaAxA.text(`a × a = ${(x**2).toFixed(2)}`);
    this.formulaBxB.text(`b × b = ${(y**2).toFixed(2)}`);
    this.formulaCxC.text(`c × c = ${(x**2 + y**2).toFixed(2)}`);
  }
}