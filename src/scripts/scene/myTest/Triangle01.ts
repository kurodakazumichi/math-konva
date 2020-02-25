import SceneBase from '~/scripts/scene/SceneBase';
import { sGroup } from '~/scripts/system';

/******************************************************************************
 * 三角形クラスのテスト
 *****************************************************************************/
export default class Scene extends SceneBase 
{  
  constructor() {
    super();
  }

  //---------------------------------------------------------------------------
  // Overrideするプロパティ
  //---------------------------------------------------------------------------
  protected get title() {
    return "三角形クラスのテスト";
  }

  protected get description() {
    return `
自作三角形クラスの動作確認用ページ
`;
  }

  //---------------------------------------------------------------------------
  // Parameters
  //---------------------------------------------------------------------------
  private params = {
    showAll:() => { this.triangle.visibleAll(true); this.resetParams(true); },
    hideAll:() => { this.triangle.visibleAll(false); this.resetParams(false); },
    PointerA:false,
    PointerB:false,
    PointerC:false,
    Main:false,
    Name:false,
    NameText:"O",
    AB:false,
    BC:false,
    CA:false,
    LabelAB:false,
    LabelBC:false,
    LabelCA:false,
    LengthA:false,
    LengthB:false,
    LengthC:false,
    LabelA:false,
    LabelB:false,
    LabelC:false,
    WedgeA:false,
    WedgeB:false,
    WedgeC:false,
    AngleA:false,
    AngleB:false,
    AngleC:false,
    Center:false,
    OuterCenter:false,
    InnerCenter:false,
    OuterCircle:false,
    InnerCircle:false,
  }

  private resetParams(v:boolean) {
    const params = this.params as any;
    Object.keys(params).map((key) => {
      if (typeof params[key] === "boolean") {
        params[key] = v;
      }
    })
  }

  //---------------------------------------------------------------------------
  // GUI
  //---------------------------------------------------------------------------
  initGUI() {
    const main = this.setupVisibleGUI("三角形", ["Main", "Name"]);

    main.add(this.params, "NameText").onChange((v:string) => {
      this.triangle.name(v);
    });
    main.add(this.params, "showAll");
    main.add(this.params, "hideAll");
    main.open();


    this.setupVisibleGUI("３頂点ラベル", ["LabelA", "LabelB", "LabelC"]);
    this.setupVisibleGUI("ポインター", ["PointerA", "PointerB", "PointerC"]);

    this.setupVisibleGUI("３つの辺", ["AB", "BC", "CA"]);
    this.setupVisibleGUI("３つの辺のラベル", ["LabelAB", "LabelBC", "LabelCA"]);
    this.setupVisibleGUI("３辺の長さ", ["LengthA", "LengthB", "LengthC"]);

    this.setupVisibleGUI("３つの角度",[
      "WedgeA", "AngleA", 
      "WedgeB", "AngleB", 
      "WedgeC", "AngleC", 
    ]);

    this.setupVisibleGUI("重心、外心、内心", ["Center", "OuterCenter", "InnerCenter"]);
    this.setupVisibleGUI("外接円、内接円", ["OuterCircle", "InnerCircle"]);
  }

  setupVisibleGUI(name:string, propNames:string[]) {
    const gui = this.gui.addFolder(name);
    propNames.map((propName) => {
      gui.add(this.params, propName).listen().onChange((v:boolean) => {
        this.onVisibleChange(v, `visible${propName}`);
      })
    });
    gui.open();
    return gui;
  }
  onVisibleChange(v:boolean, propName:string) {
    (this.triangle as any)[propName](v);
  }

  //---------------------------------------------------------------------------
  // Graph
  //---------------------------------------------------------------------------
  private triangle = sGroup.triangle([0, 4, -2, -1, 2, -1]);

  initGraph() {
    this.triangle.visibleAll(false);

    this.params.Main = true;
    this.triangle.visibleMain(this.params.Main);
    this.params.LabelA = this.params.LabelB = this.params.LabelC = true;
    this.triangle.visibleLabel(true);
    
    this.add(this.triangle);
  }

  //---------------------------------------------------------------------------
  // Update
  //---------------------------------------------------------------------------
  update() {

  }


}