
import Konva from 'konva';
import { GUI } from 'dat.gui';
import { sGroup, sScene, sMarkdown, sAjax } from '~/scripts/system';
import ShapeBase from '~/scripts/node/shape/ShapeBase';
import GroupBase from '~/scripts/node/group/GroupBase';
import { Util } from '~/scripts/helper';

/******************************************************************************
 * シーンの基底クラス
 *****************************************************************************/
export default class SceneBase
{
  constructor() {
    this._layer   = new Konva.Layer();
    this._bgLayer = new Konva.Layer();
    this._gui     = new GUI({autoPlace:false});
    this._step    = new Step(this);
    this._dom     = new Dom();
  }

  private _layer:Konva.Layer|null;
  private _bgLayer:Konva.Layer|null; /** シーン生成時に一度だけ描画される */
  private _dom:Dom|null;
  private _gui:GUI|null;
  private _step:Step|null;
  protected timer = 0; // シーン制御で使用するタイマー
  
  //---------------------------------------------------------------------------
  // 初期表示に関する定義
  //---------------------------------------------------------------------------
  protected get title() {
    console.error("override title properity."); return "";
  }

  protected get description() {
    console.error("orveride explanation properity."); return "";
  }

  /** 
   * 背景レイヤーに登録するノードリストを返す
   * 標準ではグリッドが設定される。
   */
  protected get backgroundElements():(ShapeBase<Konva.Shape>|GroupBase)[] {
    return [sGroup.grid()]
  }

  //---------------------------------------------------------------------------
  // 初期処理に関する定義
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
    this.initStep();
    this.initGUI();
    this.initGraph();
    this.initMarkdown();
  }

  /** 座標形の初期化 (initの先頭で呼ばれる) */
  protected initCoord() {}

  /** DOMを初期処理 */
  private initDom() {
    this.setTitle(this.title);
    this.setDescription(this.description);
    this.dom.deployGui(this.gui);
  }

  /** ステップの初期化処理(initで呼ばれる) */
  protected initStep() {}

  /** GUIの初期化処理(initで呼ばれる) */
  protected initGUI() {}

  /** グラフの初期化処理(initで呼ばれる) */
  protected initGraph() {}

  /** マークダウンの初期化(initで呼ばれる) */
  protected initMarkdown() {
    const sceneType = sScene.getSceneTypeFromUrl();
    sAjax.loadMarkdown(sceneType, (data) => {
      this.dom.markdown = data;
    })
  }

  //---------------------------------------------------------------------------
  // 更新・破棄
  //---------------------------------------------------------------------------
  /** 更新 */
  update() {}

  /** 破棄 */
  destroy() {
    this.gui.destroy()
    this._layer?.destroy();
    this._bgLayer?.destroy();
    this.step.destroy();
    this.dom.destroy();
    this._dom = null;
    this._layer = null;
    this._gui   = null;
    this._step  = null;
  }

  //---------------------------------------------------------------------------
  // Konva.Layerに関する定義
  //---------------------------------------------------------------------------

  /** Konva.Layerのgetter */
  get layer() {
    return this._layer as Konva.Layer; // nullを無視したいのでキャスト
  }

  /** 背景レイヤーのgetter */
  get bgLayer() {
    return this._bgLayer as Konva.Layer; // nullを無視したいのでキャスト
  }

  /** レイヤーにオブジェクトを追加 */
  protected add(...children:ShapeBase<Konva.Shape>[]|GroupBase[]) {
    
    children.forEach((child:ShapeBase<Konva.Shape>|GroupBase) => {
      this._layer?.add(child.node);
    })
    return this;
  }

  /** 描画 */
  draw() {
    this._layer?.draw();
  }

  //---------------------------------------------------------------------------
  // DOMに関する定義
  //---------------------------------------------------------------------------

  protected setTitle(title:string) {
    this.dom.title = title;
  }

  protected setDescription(text:string) {
    this.dom.description = text;
  }

  setComment(text:string) {
    this.dom.comment = text;
  }

  //---------------------------------------------------------------------------
  // GUIに関する定義
  //---------------------------------------------------------------------------
  protected createStepGui() {
    const f = this.gui.addFolder('ステップ実行');
    f.add(this.step, "next");
    f.add(this.step, "prev");
    f.add(this.step, "no", this.step.min, this.step.max).step(1).listen();
    f.open();
    return f;
  }

  //---------------------------------------------------------------------------
  // その他
  //---------------------------------------------------------------------------
  // キャストはnullチェックを横着するためにしている
  private get dom():Dom { return this._dom as Dom; }
  protected get gui():GUI { return this._gui as GUI; }
  protected get step():Step { return this._step as Step; }
}

/******************************************************************************
 * DOM管理
 *****************************************************************************/
class Dom 
{
  constructor() {
    this._dom = this.getRequiredElements();
  }

  set title(v:string) {
    if (!this.dom.title) return;
    this.dom.title.innerHTML = v;
  }

  set description(text:string) {
    if(!this.dom.description) return;
    this.dom.description.innerHTML = sMarkdown.render(text);
  }

  set comment(text:string) {
    if (!this.dom.comment) return;
    const { comment } = this.dom;
    comment.style.display = this.getDisplay(text);
    comment.innerHTML = sMarkdown.render(text);
  }

  set markdown(text:string) {
    if (!this.dom.markdown) return;

    if (text) {
      this.dom.markdown.innerHTML = sMarkdown.render(text);
    } else {
      const parent = this.dom.markdown.parentElement;
      parent && (parent.style.display = "none");
    }
  }

  deployGui(gui:GUI) {
    if (!this.dom.gui) return;
    this.dom.gui.appendChild(gui.domElement);
  }

  destroy() {
    this.title       = "";
    this.description = "";
    this.markdown    = "";
    this.comment     = "";
    
    this.dom.title       = null;
    this.dom.description = null;
    this.dom.gui         = null;
    this.dom.markdown    = null;
    this.dom.comment     = null;
  }

  //---------------------------------------------------------------------------
  // Private メソッド
  //---------------------------------------------------------------------------
  /** データの中身からstyle.displyaの内容を決める */
  private getDisplay(data:string) {
    return (data)? "block" : "none";
  }

  private _dom: {
    title       : HTMLElement | null,
    description : HTMLElement | null,
    gui         : HTMLElement | null,
    markdown    : HTMLElement | null,
    comment     : HTMLElement | null
  };

  private get dom() { return this._dom; }

  private getRequiredElements() 
  {
    return {
      title      : document.getElementById('title_forJs'),
      description: document.getElementById('description_forJs'),
      gui        : document.getElementById('gui_forJs'),
      markdown   : document.getElementById('markdown_forJs'),
      comment    : document.getElementById('comment_forJs'),
    }
  }
}

/******************************************************************************
 * Step管理クラス
 *****************************************************************************/
class Step 
{
  constructor(scene:SceneBase) {
    this.scene = scene;
  }

  set no(no:number) { this.set(no); }
  get no() { return this._no; }
  get min() { return 0; }
  get max() { return this.funcs.length - 1; }

  init(configs:[Function, string][]) {
    configs.map((config) => {
      this.push(config[0], config[1]);
    })
  }

  push(f:Function, comment:string) {
    this.funcs.push(f);
    this.comments.push(comment);
  }

  /** 最初のステップへ */
  first() { 
    this.set(this.min); 
  }

  /** 次のステップへ */
  next() { 
    this.set(this.no + 1); 
  }

  /** 前のステップへ */
  prev() {
     this.set(this.no - 1); 
  }

  /** 破棄 */
  destroy() {
    this.scene    = null;
    this.funcs    = [];
    this.comments = [];
  }

  //---------------------------------------------------------------------------
  // private
  private scene:SceneBase|null;
  private _no:number = 0;
  private funcs:Function[] = [];
  private comments:string[] = [];

  private set(stepNo:number) {
    stepNo = Util.cramp(stepNo, this.min, this.max);
    this._no = stepNo;
    
    this.func();
    this.scene?.setComment(this.comment);
  }

  private get func() {
    const f = this.funcs[this.no];
    return (f)? f:() => {}
  }

  private get comment() {
    const msg = this.comments[this.no];
    return (msg)? msg:"";
  }
}