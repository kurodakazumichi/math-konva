
import Konva from 'konva';
import { GUI } from 'dat.gui';
import { sGroup, sScene, sMarkdown, sAjax } from '~/scripts/system';
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
  markdown:HTMLElement;
}

/******************************************************************************
 * シーンの基底クラス
 *****************************************************************************/
export default class SceneBase
{
  constructor() {
    this._layer   = new Konva.Layer();
    this._bgLayer = new Konva.Layer();
    this._gui     = new GUI({autoPlace:false});
    this._dom     = this.getRequiredElements();
  }
  
  //---------------------------------------------------------------------------
  // Public プロパティ
  //---------------------------------------------------------------------------

  /** Konva.Layerのgetter */
  get layer() {
    return this._layer as Konva.Layer; // nullを無視したいのでキャスト
  }

  /** 背景レイヤーのgetter */
  get bgLayer() {
    return this._bgLayer as Konva.Layer; // nullを無視したいのでキャスト
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

  /** 
   * 背景レイヤーに登録するノードリストを返す
   * 標準ではグリッドが設定される。
   */
  protected get backgroundElements():(ShapeBase<Konva.Shape>|GroupBase)[] {
    return [sGroup.grid()]
  }
  /** 座標形の初期化 (initの先頭で呼ばれる) */
  protected initCoord() {}

  /** GUIの初期化処理(initで呼ばれる) */
  protected initGUI() {}

  /** グラフの初期化処理(initで呼ばれる) */
  protected initGraph() {}

  //---------------------------------------------------------------------------
  // 必要があれば継承先でオーバーライドしてもいい
  //---------------------------------------------------------------------------

  /** マークダウンの初期化(initで呼ばれる) */
  protected initMarkdown() {
    const sceneType = sScene.getSceneTypeFromUrl();
    sAjax.loadMarkdown(sceneType, (data) => {
      this.dom.markdown.innerHTML = sMarkdown.render(data);
    })
  }

  //---------------------------------------------------------------------------
  // Public メソッド
  //---------------------------------------------------------------------------
  /** 初期化 */
  init() {
    this.initCoord();
    this.initDom();
    
    // 背景レイヤーはinitで一度だけ描画する。
    this.backgroundElements.map((elm) => {
      this.bgLayer.add(elm.node);
    });
    this.bgLayer.draw();

    this.initGUI();
    this.initGraph();
    this.initMarkdown();
  }

  /** 更新 */
  update() {}

  /** 描画 */
  draw() {
    this._layer?.draw();
  }

  /** 破棄 */
  destroy() {
    this.gui.destroy()
    this._layer?.destroy();
    this._bgLayer?.destroy();
    this.dom.title.innerHTML = "";
    this.dom.gui.innerHTML = "";
    this.dom.formula.innerHTML = "";
    this.dom.explanation.innerHTML = "";
    this._dom = null;
    this._layer = null;
    this._gui   = null;
  }

  //---------------------------------------------------------------------------
  // Protected メソッド
  //---------------------------------------------------------------------------
  protected add(...children:ShapeBase<Konva.Shape>[]|GroupBase[]) {
    
    children.forEach((child:ShapeBase<Konva.Shape>|GroupBase) => {
      this._layer?.add(child.node);
    })
    return this;
  }

  protected addAxisXY() {
    this.add(sGroup.axisXY()); return this;
  }

  protected addGrid() {
    this.add(sGroup.grid()); return this;
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
      markdown   : document.getElementById('markdown') as HTMLElement,
    }
  }

  /** DOMを初期処理 */
  private initDom() {
    this.dom.title.innerHTML = this.title;
    this.dom.explanation.innerHTML = sMarkdown.render(this.explanation);
    this.dom.gui.appendChild(this.gui.domElement);
    this.dom.formula.innerHTML = sMarkdown.render(this.formula);
  }

  //---------------------------------------------------------------------------
  // Private 変数
  //---------------------------------------------------------------------------
  private _layer:Konva.Layer|null;
  private _bgLayer:Konva.Layer|null; /** シーン生成時に一度だけ描画される */
  private _dom:IDOM|null;
  private _gui:GUI|null;

  // nullチェックを横着するための定義
  private get dom():IDOM { return this._dom as IDOM; }
  protected get gui():GUI { return this._gui as GUI; }
}
