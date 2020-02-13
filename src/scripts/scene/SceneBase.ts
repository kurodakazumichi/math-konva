
import Konva from 'konva';
import { GUI } from 'dat.gui';

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
export default class Scene 
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
  init() 
  {
    this.dom.title.innerHTML = this.title;
    this.dom.explanation.innerHTML = this.explanation;
    this.dom.gui.appendChild(this.gui.domElement);
    mathJaxPreview(this.dom.formula, this.formula);
  }

  /** 更新 */
  update() {}

  /** 描画 */
  draw() {
    this.layer?.draw();
  }

  /** 破棄 */
  destroy() {
    this._gui?.destroy();
    this.layer?.destroy();
    this._dom = null;
    this.layer = null;
    this._gui   = null;
  }

  //---------------------------------------------------------------------------
  // Protected メソッド
  //---------------------------------------------------------------------------
  protected add(children:Konva.Group|Konva.Shape) {
    this.layer?.add(children);
    return this;
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

  //---------------------------------------------------------------------------
  // Private・Protected プロパティ
  // ガベコレ対策でnull許容にしてるけど、実際の処理ではnullにはならないので
  // プロパティで無理やりキャストしてたりする。
  //---------------------------------------------------------------------------

  private layer:Konva.Layer|null;

  private _dom:IDOM|null;

  private get dom():IDOM {
    return this._dom as IDOM;
  }

  private _gui:GUI|null;

  protected get gui():GUI {
    return this._gui as GUI;
  }
}
