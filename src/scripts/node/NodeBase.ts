import Konva from 'konva';
import { sCoord } from '~/scripts/system';

export default abstract class NodeBase<T extends Konva.Node> {
  constructor() {
    this._node = this.createNode();
  }

  //---------------------------------------------------------------------------
  // Public メソッド
  //---------------------------------------------------------------------------

  x(ux:number) {
    this.node.setAttr("x", sCoord.x(ux)); return this;
  }

  y(uy:number) {
    this.node.setAttr("y", sCoord.y(uy)); return this;
  }

  pos(p:{x:number, y:number}) {
    this.x(p.x).y(p.y); return this;
  }

  visible(flg:boolean) {
    this.node.setAttr("visible", flg);
  }

  draggable(flg:boolean =  true) {
    this.node.setAttr("draggable", flg); return this;
  }

  protected abstract createNode():T;
  public get node():T {
    return this._node;
  }
  private _node:T;
}