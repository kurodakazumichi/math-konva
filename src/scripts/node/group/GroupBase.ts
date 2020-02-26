import Konva from 'konva';
import NodeBase from '~/scripts/node/NodeBase';
import ShapeBase from '~/scripts/node/shape/ShapeBase'

/******************************************************************************
 * Konva.Groupのプロパティを再定義するためのGroup基底クラス
 *****************************************************************************/
export default class GroupBase extends NodeBase<Konva.Group>
{
  constructor() {
    super();
  }
  //---------------------------------------------------------------------------
  // オーバーライド
  //---------------------------------------------------------------------------
  /** Konva.Group系列のインスタンスを生成して返す */
  protected createNode(){
    return new Konva.Group();
  }

  protected visibleAndSync(v:boolean, shape:ShapeBase<Konva.Shape>, syncFunc:Function) {
    shape.visible(v);
    syncFunc();
    return this;
  }

  /** matchPropNameから始まるメソッドに.bind(this)を設定する */
  protected binds<T extends Function>(c:T, matchPropName:string = "sync") {
    Object.getOwnPropertyNames(c.prototype).forEach((func) => {
      if (func.indexOf(matchPropName) !== -1) {
        (this as any)[func] = (this as any)[func].bind(this);
      }
    })
  }

  //---------------------------------------------------------------------------
  // Konva.Groupのメソッドのラッパー
  //---------------------------------------------------------------------------

  public add(children:ShapeBase<Konva.Shape>|GroupBase) {
    this.node.add(children.node);
    return this;
  }
}

