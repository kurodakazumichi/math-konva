
import SceneBase from './SceneBase';
import { sShape, sCoord } from '../system';
import { Line, Circle } from '~/scripts/node/shape';

/******************************************************************************
 * 直線 y=ax+bのシーン
 *****************************************************************************/
export default class SampleScene extends SceneBase 
{  
  constructor() {
    super();
  }

  //---------------------------------------------------------------------------
  // Overrideしないといけないやつ
  //---------------------------------------------------------------------------
  protected get title() {
    return "直線";
  }

  protected get formula() {
    return `$$y=ax+b$$`
  }

  protected get explanation() {
    return `
    <b>a</b>が直線の<em>傾き</em>になり<b>b</b>が<em>y切片</em>になる。
    `;
  }

  //---------------------------------------------------------------------------
  // メインの処理
  //---------------------------------------------------------------------------
  params = {
    a:1,
    b:0,
    x:1,
    y:1,
  }

  private line:Line = sShape.solidLine();
  private yIntercept:Circle = sShape.dot();
  private xCoord:Circle = sShape.dot().fill("red");
  private yCoord:Circle = sShape.dot().fill("red");
  private lineToYChood:Line = sShape.brokenLine();

  init() {
    super.init();
    
    const f1 = this.gui.addFolder("１次関数のパラメータ");
    
    f1.add(this.params, "a").step(0.1);
    f1.add(this.params, "b").step(0.1);
    f1.open();

    const f2 = this.gui.addFolder("xに対するyの値");
    f2.add(this.params, "x").step(0.1);
    f2.add(this.params, "y").step(0.1).listen();
    f2.open();

    this.line.points([0, 0, 1, 1]);
    this.add(this.line);

    this.add(this.yIntercept);
    this.add(this.xCoord);
    this.add(this.lineToYChood);
    this.add(this.yCoord);
  }

  fx(x:number) {
    const { a, b } = this.params;
    return a * x + b;
  }

  update() {
    this.params.y = this.fx(this.params.x);
    const y1 = this.fx(sCoord.left);
    const y2 = this.fx(sCoord.right);
    this.line.points([sCoord.left, y1, sCoord.right, y2]);

    this.yIntercept.x(0).y(this.params.b);

    this.xCoord.x(this.params.x).y(0);
    this.yCoord.x(this.params.x).y(this.params.y);
    this.lineToYChood.points([this.params.x, 0, this.params.x, this.params.y]);
  }
}