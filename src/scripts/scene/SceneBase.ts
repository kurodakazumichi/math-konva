
import Konva from 'konva';
import { GUI } from 'dat.gui';
import { sGroup } from '~/scripts/system';
import ShapeBase from '~/scripts/node/shape/ShapeBase';
import GroupBase from '~/scripts/node/group/GroupBase';

/******************************************************************************
 * interface declare
 *****************************************************************************/
interface IDOM {
  title  :HTMLElement;
  formula:HTMLElement;
  gui:HTMLElement;
  explanation:HTMLElement;
}

// mathJaxPreviewはindex.htmlに定義された関数
// MathJaxをちょっと使いたいので定義だけあることにしてる
declare function mathJaxPreview(elm:HTMLElement|null, text:string):void;

/******************************************************************************
 * シーンの基底クラス
 *****************************************************************************/
export default class SceneBase
{
  constructor() {
    this.layer = new Konva.Layer();
    this._gui  = new GUI({autoPlace:false});
    this._dom   = this.getRequiredElements();
  }
  
  //---------------------------------------------------------------------------
  // Public プロパティ
  //---------------------------------------------------------------------------

  /** Konva.Layerのgetter */
  get layerOfKonva() {
    return this.layer as Konva.Layer; // nullを無視したいのでキャスト
  }

  //---------------------------------------------------------------------------
  // 継承先で上書きする必要のあるプロパティ
  //---------------------------------------------------------------------------
  protected get title() {
    console.error("override title properity."); return "";
  }

  protected get formula() {
    console.error("orveride formula properity."); return "";
  }

  protected get explanation() {
    console.error("orveride explanation properity."); return "";
  }

  //---------------------------------------------------------------------------
  // Public メソッド
  //---------------------------------------------------------------------------
  /** 初期化 */
  init() {
    this.initDom();
    this.addAxisXY();
  }

  /** 更新 */
  update() {}

  /** 描画 */
  draw() {
    this.layer?.draw();
  }

  /** 破棄 */
  destroy() {
    this.gui.destroy()
    this.layer?.destroy();
    this.dom.title.innerHTML = "";
    this.dom.gui.innerHTML = "";
    this.dom.formula.innerHTML = "";
    this.dom.explanation.innerHTML = "";
    this._dom = null;
    this.layer = null;
    this._gui   = null;
  }

  //---------------------------------------------------------------------------
  // Protected メソッド
  //---------------------------------------------------------------------------
  protected add(children:ShapeBase<Konva.Shape>|GroupBase) {
    this.layer?.add(children.node);
    return this;
  }

  protected addAxisXY() {
    this.add(sGroup.axisXY()); return this;
  }

  //---------------------------------------------------------------------------
  // Private メソッド
  //---------------------------------------------------------------------------
  private getRequiredElements():IDOM 
  {
    // ID間違えたらnullっちゃうけどチェックめんどいので強制キャスト
    return {
      title      : document.getElementById('title') as HTMLElement,
      formula    : document.getElementById('formula') as HTMLElement,
      gui        : document.getElementById('gui-container') as HTMLElement,
      explanation: document.getElementById('explanation') as HTMLElement,
    }
  }

  /** DOMを初期処理 */
  private initDom() {
    this.dom.title.innerHTML = this.title;
    this.dom.explanation.innerHTML = this.explanation;
    this.dom.gui.appendChild(this.gui.domElement);
    mathJaxPreview(this.dom.formula, this.formula);
  }

  //---------------------------------------------------------------------------
  // Private 変数
  //---------------------------------------------------------------------------
  private layer:Konva.Layer|null;
  private _dom:IDOM|null;
  private _gui:GUI|null;

  // nullチェックを横着するための定義
  private get dom():IDOM { return this._dom as IDOM; }
  protected get gui():GUI { return this._gui as GUI; }
}
