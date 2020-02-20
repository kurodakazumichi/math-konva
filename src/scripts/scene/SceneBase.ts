
import Konva from 'konva';
import { GUI } from 'dat.gui';
import { sGroup, sScene, sMarkdown, sAjax } from '~/scripts/system';
import ShapeBase from '~/scripts/node/shape/ShapeBase';
import GroupBase from '~/scripts/node/group/GroupBase';
import { GUI as GuiHelper, Util } from '~/scripts/helper';

/******************************************************************************
 * interface declare
 *****************************************************************************/
interface IDOM {
  title  :HTMLElement;
  gui:HTMLElement;
  description:HTMLElement;
  markdown:HTMLElement;
  comment:HTMLElement;
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
    this._step    = new Step(this);
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
  /** 座標形の初期化 (initの先頭で呼ばれる) */
  protected initCoord() {}

  /** GUIの初期化処理(initで呼ばれる) */
  protected initGUI() {}

  /** グラフの初期化処理(initで呼ばれる) */
  protected initGraph() {}

  /** ステップの初期化処理(initで呼ばれる) */
  protected initStep() {}

  //---------------------------------------------------------------------------
  // 必要があれば継承先でオーバーライドしてもいい
  //---------------------------------------------------------------------------

  /** マークダウンの初期化(initで呼ばれる) */
  protected initMarkdown() {
    const sceneType = sScene.getSceneTypeFromUrl();
    sAjax.loadMarkdown(sceneType, (data) => {

      if (data) {
        this.dom.markdown.innerHTML = sMarkdown.render(data);
      } else {
        const parent = this.dom.markdown.parentElement;
        parent && (parent.style.display = "none");
      }

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
    this.initStep();
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
    this.dom.description.innerHTML = "";
    this._dom = null;
    this._layer = null;
    this._gui   = null;
    this._step  = null;
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
      title      : document.getElementById('title_forJs') as HTMLElement,
      description: document.getElementById('description_forJs') as HTMLElement,
      gui        : document.getElementById('gui_forJs') as HTMLElement,
      markdown   : document.getElementById('markdown_forJs') as HTMLElement,
      comment    : document.getElementById('comment_forJs') as HTMLElement,
    }
  }

  /** DOMを初期処理 */
  private initDom() {
    this.setTitle(this.title);
    this.setDescription(this.description);
    this.dom.gui.appendChild(this.gui.domElement);
  }

  protected setTitle(title:string) {
    this.dom.title.innerHTML = title;
  }

  protected setDescription(text:string) {
    this.dom.description.innerHTML = sMarkdown.render(text);
  }

  protected setComment(text:string) {
    this.dom.comment.style.display = (text)? 'block':'none';
    if (typeof text === 'string'){
      this.dom.comment.innerHTML = sMarkdown.render(text);
    }
  }

  //---------------------------------------------------------------------------
  // Private 変数
  //---------------------------------------------------------------------------
  private _layer:Konva.Layer|null;
  private _bgLayer:Konva.Layer|null; /** シーン生成時に一度だけ描画される */
  private _dom:IDOM|null;
  private _gui:GUI|null;
  private _step:Step|null;

  // キャストはnullチェックを横着するためにしている
  protected get gui():GUI { return this._gui as GUI; }
  protected get step():Step { return this._step as Step; }

  protected initGuiForStep() {
    const f = this.gui.addFolder('ステップ実行');
    f.add(this.step, "next");
    f.add(this.step, "prev");
    f.add(this.step, "no", this.step.min, this.step.max).step(1).listen();
    f.open();
    return f;
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
