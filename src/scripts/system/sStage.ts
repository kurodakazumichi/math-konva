import Konva from 'konva';
import { sCoord } from './index'

/******************************************************************************
 * Konva.Stageに該当
 *****************************************************************************/
class sStage 
{
  constructor() {
    this.stage     = null;
    this.container = null;
  }

  /** 初期化 */
  init(divId:string, fill:string = "") 
  {
    const div:HTMLDivElement = document.getElementById(divId) as HTMLDivElement;
    this.container = div;

    this.stage = new Konva.Stage({
      container:div,
      width    :sCoord.w,
      height   :sCoord.h,
    })

    this.fill(fill);
  }

  /** レイヤーを追加するためのadd */
  add(layer:Konva.Layer) {
    this.stage?.add(layer);
  }

  /** 背景色を設定 */
  fill(color:string) {
    if (!this.container) return;
    this.container.style.backgroundColor = color;
  }

  /** Stage */
  private stage:Konva.Stage|null;

  /** Container */
  private container:HTMLDivElement|null;
}

const instance = new sStage();
export default instance;
