import Konva from 'konva';
import NodeBase from '~/scripts/node/NodeBase';

/******************************************************************************
 * Konva.Shapeのプロパティを再定義するための基底クラス
 *****************************************************************************/
export default abstract class ShapeBase<T extends Konva.Shape> extends NodeBase<T>
{
  //---------------------------------------------------------------------------
  // Konva.Shapeの属性をセットするメソッド郡
  //---------------------------------------------------------------------------

  fill(color:string) {
    this.node.setAttr("fill", color); return  this;
  }

  stroke(color:string) {
    this.node.setAttr("stroke", color); return this;
  }

  strokeWidth(width:number) {
    this.node.setAttr("strokeWidth", width); return this;
  }

  dash(width:number) {
    this.node.setAttr("dash", [width]); return this;
  }

  radius(radius:number) {
    this.node.setAttr("radius", radius); return this;
  }
}

