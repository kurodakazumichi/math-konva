
import SceneBase from '~/scripts/scene/SceneBase';
import { sShape, sCoord, sColor } from '~/scripts/system';
import { Line, Circle, Text } from '~/scripts/node/shape';
import { GUI } from '~/scripts/helper';

/******************************************************************************
 * 直線 y=ax+bのシーン
 *****************************************************************************/
export default class Scene extends SceneBase 
{  
  constructor() {
    super();
    this.onDragMovePointX = this.onDragMovePointX.bind(this);
    this.onDragMoveTangentY = this.onDragMoveTangentY.bind(this);
  }

  //---------------------------------------------------------------------------
  // Overrideするプロパティ
  //---------------------------------------------------------------------------
  protected get title() {
    return "直線";
  }
  
  protected get overview() {
    return `
$y=ax+b$

*a*が直線の**傾き**になり*b*が**y切片**になる。
    `;
  }

  //---------------------------------------------------------------------------
  // GUI
  //---------------------------------------------------------------------------
  params = {
    a:1,
    b:0,
    x:3,
    y:1,
  }

  initGUI() {
    const f1 = this.gui.addFolder("１次関数のパラメータ");
    GUI.addS10(f1, this.params, "a");
    GUI.addSTD(f1, this.params, "b");
    f1.open();

    const f2 = this.gui.addFolder("xに対するyの値");
    GUI.addSLR(f2,  this.params, "x");
    f2.add(this.params, "y").step(0.1).listen();
    f2.open();
  }

  //---------------------------------------------------------------------------
  // Graph
  //---------------------------------------------------------------------------
  fx(x:number) {
    const { a, b } = this.params;
    return a * x + b;
  }

  /** グラフ内の要素 */
  private lineLinear:Line        = sShape.solidLine().points([0, 0, 1, 1]);
  private lineX2Y:Line           = sShape.brokenLine();
  private pointTangentY:Circle = sShape.draggablePoint();
  private pointX:Circle          = sShape.draggablePoint().fill(sColor.red);
  private pointY:Circle          = sShape.point();
  private coordX:Text            = sShape.text().offset(0.1, -0.1);
  private coordY:Text            = sShape.text().offset(-1.1, -0.1);
  private coordB:Text            = sShape.text().offset(0.1, -0.1);

  initGraph() {
    this.pointX.on('dragmove', this.onDragMovePointX);
    this.pointTangentY.on('dragmove', this.onDragMoveTangentY);

    this.add(this.lineLinear);
    this.add(this.lineX2Y);
    this.add(this.pointTangentY);
    this.add(this.coordX);
    this.add(this.coordY);
    this.add(this.pointX);
    this.add(this.pointY);
    this.add(this.coordB);
  }

  onDragMovePointX(e:Circle) {
    this.params.x = e.x();
  }

  onDragMoveTangentY(e:Circle) {
    this.params.b = e.y();
  }

  update() {
    // パラメータ更新、抽出
    this.params.y = this.fx(this.params.x);
    const { b, x, y } = this.params;

    // y=ax+bの直線 y座標(左端と右端)を計算して線を引き直す
    const y1 = this.fx(sCoord.left);
    const y2 = this.fx(sCoord.right);
    this.lineLinear.points([sCoord.left, y1, sCoord.right, y2]);

    // Y切片の位置更新(緑丸)
    this.pointTangentY.pos(0, b);

    // X点、Y点(赤丸)
    this.pointX.pos(x, 0);
    this.pointY.pos(0, y);

    // X -> Y の破線
    this.lineX2Y.points([x, 0, x, y, 0, y]);

    // X座標、Y座標(text)
    this.coordX.pos(x, 0).text("x=" + x.toFixed(1));
    this.coordY.pos(0, y).text("y=" + y.toFixed(1));
    this.coordB.pos(0, b).text("b=" + b.toFixed(1));
  }
}