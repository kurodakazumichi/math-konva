import SystemBase from '~/scripts/system/SystemBase';

export enum Mode {
  Light,
  Dark,
};

interface IColorTable {
  backGround:string;
  axisXY:string;
  grid:string;
  main:string;
  text:string;
  red:string;
  green:string;
  yellow:string;
}

/******************************************************************************
 * 色システム
 * 
 * モードに対応した色の管理と、モード値をセッション経由で管理する。
 *****************************************************************************/
class sColor extends SystemBase implements IColorTable{

  /** とりあえず初期値入れとく */
  constructor() {
    super();
    this._mode = Mode.Dark;
  }

  //---------------------------------------------------------------------------
  // Public プロパティ
  //---------------------------------------------------------------------------
  get mode()  { return this._mode; }

  get backGround() { return this.table.backGround; }
  get axisXY() { return this.table.axisXY; }
  get grid() { return this.table.grid; }
  get main() { return this.table.main; }
  get text() { return this.table.text; }
  get red() { return this.table.red; }
  get green() { return this.table.green; }
  get yellow() { return this.table.yellow; }

  //---------------------------------------------------------------------------
  // Public メソッド
  //---------------------------------------------------------------------------
  /** 初期化 */
  init() {
    const maybeMode = sessionStorage.getItem("mode");

    switch(maybeMode) {
      case "0": this._mode = Mode.Light; break;
      default: this._mode = Mode.Dark; break;
    }
  }

  /** モードチェンジ */
  changeMode(mode:Mode) {
    sessionStorage.setItem("mode", mode.toString());
    location.reload();
  }

  //---------------------------------------------------------------------------
  // Private プロパティ
  //---------------------------------------------------------------------------
  private get table() {
    return (this.mode === Mode.Dark)? this.darkColors : this.lightColors;
  }

  //---------------------------------------------------------------------------
  // Private 変数
  //---------------------------------------------------------------------------

  /** モード */
  private _mode:Mode;

  /** light color table */
  private lightColors:IColorTable = {
    backGround: "#EFEFEF",
    axisXY    : "#000000",
    grid      : "#DDDDDD",
    main      : "#000000",
    red       : "#CA3C6E",
    green     : "#009F8C",
    yellow    : "#EDAD0B",
    text      : "#000000",
  }

  /** dark color table */
  private darkColors:IColorTable = {
    backGround: "#1C1C1C",
    axisXY    : "#FFFFFF",
    grid      : "#3C3C3C",
    main      : "#FFFFFF",
    red       : "#CA3C6E",
    green     : "#40BFB0",
    yellow    : "#EDAD0B",
    text      : "#FFFFFF",
  }

}

const instance = new sColor();
export default instance;