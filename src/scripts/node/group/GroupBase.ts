import Konva from 'konva';
import NodeBase from '~/scripts/node/NodeBase';

/******************************************************************************
 * Konva.Groupのプロパティを再定義するためのGroup基底クラス
 *****************************************************************************/
export default class GroupBase extends NodeBase<Konva.Group>
{
  /** Konva.Group系列のインスタンスを生成して返す */
  protected createNode(){
    return new Konva.Group();
  }
}

