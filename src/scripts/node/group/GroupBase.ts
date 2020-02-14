import Konva from 'konva';
import NodeBase from '~/scripts/node/NodeBase';

/******************************************************************************
 * 形状の基底クラス
 *****************************************************************************/
export default class GroupBase extends NodeBase<Konva.Group>
{
  constructor() {
    super();
  }

  //---------------------------------------------------------------------------
  // 継承先で上書きする必要あり
  //---------------------------------------------------------------------------

  /** Konva.Group系列のインスタンスを生成して返す */
  protected createNode(){
    return new Konva.Group();
  }

}

