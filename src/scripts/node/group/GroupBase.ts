import Konva from 'konva';
import NodeBase from '~/scripts/node/NodeBase';
import ShapeBase from '~/scripts/node/shape/ShapeBase'

/******************************************************************************
 * Konva.Groupのプロパティを再定義するためのGroup基底クラス
 *****************************************************************************/
export default class GroupBase extends NodeBase<Konva.Group>
{
  //---------------------------------------------------------------------------
  // オーバーライド
  //---------------------------------------------------------------------------
  /** Konva.Group系列のインスタンスを生成して返す */
  protected createNode(){
    return new Konva.Group();
  }

  //---------------------------------------------------------------------------
  // Konva.Groupのメソッドのラッパー
  //---------------------------------------------------------------------------

  public add(children:ShapeBase<Konva.Shape>|GroupBase) {
    this.node.add(children.node);
    return this;
  }
}

