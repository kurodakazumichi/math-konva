
import SceneBase from './SceneBase';
import { sShape, sCoord } from '../system';
import { Line } from '~/scripts/node/shape';

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
    aが直線の傾きになりbが接線になる。
    `;
  }

  //---------------------------------------------------------------------------
  // メインの処理
  //---------------------------------------------------------------------------
  params = {
    a:0,
    b:0,
  }

  private line:Line = sShape.solidLine();
  
  init() {
    super.init();
    
    this.gui.add(this.params, "a").step(0.1);
    this.gui.add(this.params, "b").step(0.1);


    this.line.points([0, 0, 1, 1]);
    this.add(this.line);
  }

  fx(x:number) {
    const { a, b } = this.params;
    return a * x + b;
  }

  update() {
    
    const y1 = this.fx(sCoord.left);
    const y2 = this.fx(sCoord.right);
    this.line.points([sCoord.left, y1, sCoord.right, y2]);
  }

  
  destroy() {
    super.destroy();

  }
}