
import SceneBase from '~/scripts/scene/SceneBase';
import { sShape, sCoord } from '~/scripts/system';
import { Line, Text, Circle } from '~/scripts/node/shape';
import { GUI, Util } from '~/scripts/helper';

/******************************************************************************
 * 直線 y=ax+bのシーン
 *****************************************************************************/
export default class SampleScene extends SceneBase 
{  
  constructor() {
    super();
    this.onDragMovePoint = this.onDragMovePoint.bind(this);
  }

  //---------------------------------------------------------------------------
  // Overrideするプロパティ
  //---------------------------------------------------------------------------
  protected get title() {
    return "三平方の定理";
  }

  protected get overview() {
    return `
$c^2=a^2+b^2$

直角三角形の**斜辺**を*c*、**底辺**を*a*、**高さ**を*b*とする。   
また、**ピタゴラスの定理**とも呼ばれる。
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
    GUI.addSLR(f1, this.params, "bottom");
    GUI.addSTD(f1, this.params, "height");
    f1.open();
  }

  //---------------------------------------------------------------------------
  // Graph
  //---------------------------------------------------------------------------

  /** グラフ内の要素 */
  private triangle:Line       = sShape.solidLine();
  private textBottom:Text     = sShape.text().offsetY(-0.2);
  private textHeight:Text     = sShape.text().offsetX(-0.6);
  private textHypotenuse:Text = sShape.text().offset(-0.2, 0.2);
  private formulaAxA:Text     = sShape.text().offsetX(0.1).y(-2.5).fontFamily("Monaco");
  private formulaBxB:Text     = sShape.text().offsetX(0.1).y(-3.0).fontFamily("Monaco");
  private formulaCxC:Text     = sShape.text().offsetX(0.1).y(-3.5).fontFamily("Monaco");
  private point:Circle        = sShape.draggablePoint();

  initGraph() {
    this.point.on('dragmove', this.onDragMovePoint);

    this.add(this.triangle);
    this.add(this.textBottom);
    this.add(this.textHeight);
    this.add(this.textHypotenuse);
    this.add(this.formulaAxA);
    this.add(this.formulaBxB);
    this.add(this.formulaCxC);
    this.add(this.point);
  }

  onDragMovePoint(e:Circle) {
    this.params.bottom = Util.round(e.x());
    this.params.height = Util.round(e.y());
  }

  update() {
    const { bottom:x, height:y } = this.params;

    this.triangle.points([0, 0, x, 0, x, y, 0, 0]);

    const biasX = sCoord.calcRateX(x);
    const biasY = sCoord.calcRateY(y);

    this.textBottom.pos(x/2, 0).text(`a = ${x.toFixed(1)}`);
    this.textHeight.pos(x - biasX, y/2).text(`b = ${y.toFixed(1)}`);
    this.textHypotenuse.pos(x/2 - biasX * 0.3, y/2 + biasY * 0.3).text(`c`);
    this.formulaAxA.text(`a × a = ${(x**2).toFixed(2)}`);
    this.formulaBxB.text(`b × b = ${(y**2).toFixed(2)}`);
    this.formulaCxC.text(`c × c = ${(x**2 + y**2).toFixed(2)}`);

    this.point.pos(x, y);
  }
}