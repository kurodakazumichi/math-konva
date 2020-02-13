import Konva from 'konva';
import { sCoord } from './index'

/******************************************************************************
 * Konva.Stageに該当
 *****************************************************************************/
class sStage 
{
  constructor() {
    this.stage = null;
  }

  /** 初期化 */
  init(divId:string) {
    this.stage = new Konva.Stage({
      container:divId,
      width    :sCoord.w,
      height   :sCoord.h,
    })
  }

  /** レイヤーを追加するためのadd */
  add(layer:Konva.Layer) {
    this.stage?.add(layer);
  }

  /** Stage */
  private stage:Konva.Stage|null;
}

const instance = new sStage();
export default instance;
