import Konva from 'konva';
import { sCoord } from '~/scripts/system';

/******************************************************************************
 * Konva.Nodeのプロパティを再定義するためのNode基底クラス
 *****************************************************************************/
export default abstract class NodeBase<T extends Konva.Node> {
  constructor() {
    this._node = this.createNode();
  }

  /** Konva.Nodeインスタンス */
  private _node:T;

  public get node():T {
    return this._node;
  }

  //---------------------------------------------------------------------------
  // 継承先でオーバーライド
  //---------------------------------------------------------------------------
  protected abstract createNode():T;

  //---------------------------------------------------------------------------
  // Konva.Nodeの属性をセットするメソッド郡
  //---------------------------------------------------------------------------
  width(v:number):this;
  width():number;
  width(...v: [] | [number]):this | number {
    if(typeof v[0] === 'number') {
      this.node.width(sCoord.u2px(v[0]));
      return this;
    } else {
      return sCoord.px2u(this.node.width());
    }
  }

  height(v:number): this;
  height():number;
  height(...v: [] | [number]): this | number {
    if(typeof v[0] === 'number') {
      this.node.height(sCoord.u2px(v[0]));
      return this;
    } else {
      return sCoord.px2u(this.node.height());
    }
  }

  x(ux:number) {
    this.node.setAttr("x", sCoord.x(ux)); return this;
  }

  y(uy:number) {
    this.node.setAttr("y", sCoord.y(uy)); return this;
  }

  pos(x:number, y:number) {
    this.x(x).y(y); return this;
  }

  visible(flg:boolean) {
    this.node.setAttr("visible", flg);
  }

  draggable(flg:boolean =  true) {
    this.node.setAttr("draggable", flg); return this;
  }

  offsetX(v:number) {
    this.node.offsetX(-sCoord.u2px(v));
    return this;
  }
  offsetY(v:number) {
    this.node.offsetY(sCoord.u2px(v));
    return this;
  }
  offset(x:number, y:number) {
    return this.offsetX(x).offsetY(y);
  }

  destroy() {
    this.node.destroy();
  }
}