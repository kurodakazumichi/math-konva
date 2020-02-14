
import Konva from 'konva';
import SceneBase from './SceneBase';

/******************************************************************************
 * 直線 y=ax+bのシーン
 *****************************************************************************/
export default class SampleScene extends SceneBase 
{
  constructor() {
    super();
    this.circle = null;
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
  // Override
  //---------------------------------------------------------------------------
  params = {
    x:0
  }
  circle:Konva.Circle|null;
  init() {
    super.init();
    // create our shape
    this.circle = new Konva.Circle({
      x: 100,
      y: 100,
      radius: 70,
      fill: 'red',
      stroke: 'black',
      strokeWidth: 4
    });

    //this.add(this.circle);

    
    this.gui.add(this.params, "x");

  }

  update() {
    this.circle?.setAttr("x", this.params.x);
  }

  
  destroy() {
    super.destroy();
    this.circle = null;
  }
}