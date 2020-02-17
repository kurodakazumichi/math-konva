import SystemBase from '~/scripts/system/SystemBase';
import { sEnv } from '~/scripts/system';

const DEFAULT_WIDTH  = 720;
const DEFAULT_HEIGHT = 720;
const DEFAULT_UNIT   = 72;

/******************************************************************************
 * 座標システム
 * 
 * canvasは左上を起点とした座標型だが、扱いにくいので
 * canvasの中心を原点とした独自座標系への変換システム
 *****************************************************************************/
class sCoord extends SystemBase {

  /** とりあえず初期値入れとく */
  constructor() {
    super();
    this.width = this.height = this._unit = 0;
    this.halfWidth = this.halfHeight = 0;
    this._left = this._right = this._top = this._down = 0;
  }

  //---------------------------------------------------------------------------
  // Public プロパティ
  //---------------------------------------------------------------------------
  get w()     { return this.width; }
  get h()     { return this.height; }
  get top()   { return this._top; }
  get down()  { return this._down; }
  get left()  { return this._left; }
  get right() { return this._right; }
  get unit()  { return this._unit; }

  /** 幅(unit) */
  get uw() {
    return (this.right - this.left);
  }
  /** 高さ(unit) */
  get uh() {
    return (this.top - this.down);
  }
  
  //---------------------------------------------------------------------------
  // Public メソッド
  //---------------------------------------------------------------------------
  /** 初期化 */
  init()
  {
    const config = {
      width : DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT,
      unit  : DEFAULT_UNIT,
    }

    // Mobileの場合
    // window幅が600を超えているなら、canvasサイズはwindow幅 - 300にする
    if (sEnv.isMobile) {
      if (sEnv.windowWidth <  600) {
        config.width = sEnv.windowWidth;
      } else {
        config.width = sEnv.windowWidth - 300;
      }

      config.height = config.width;
      config.unit   = config.width / 10;
    }

    // Step1:幅・高さ・その半分のサイズをまず計算
    this.width  = config.width;
    this.height = config.height;
    this.reCalcHalf();

    // Step2:Step1の値をもとに独自座標型を設定
    this.setUnit(config.unit);
  }

  /** 1ユニットあたりのピクセル数を設定 */
  setUnit(unit:number) {
    this._unit = unit;
    this.reCalcUpDownLeftRight();
  }

  /** 指定されたX座標(unit)がグラフ横幅のどの割合のいちになるかを-1~1で返す */
  calcRateX(ux:number) {
    return ux / this.uw * 2;
  }
  /** 指定されたY座標(unit)がグラフ縦幅のどの割合の位置になるかを-1~1で返す */
  calcRateY(uy:number) {
    return uy / this.uh * 2;
  }
  //---------------------------------------------------------------------------
  // unit -> px
  u2px(_u:number) {
    return this.unit * _u;
  }
  x(_ux:number) {
    return _ux * this._unit + this.halfWidth;
  }
  y(_uy:number) {
    return -_uy * this._unit + this.halfHeight;
  }
  xy(_ux:number, _uy:number) {
    return {x:this.x(_ux), y:this.y(_uy)};
  }
  points(nums:number[]){
    return nums.map((p, i) => {
      return (i%2 === 0)? this.x(p) : this.y(p);
    });
  }

  //---------------------------------------------------------------------------
  // px -> unitへの変換
  px2u(px:number) {
    return px / this._unit;
  }
  ux(x:number) {
    return (x - this.halfWidth) / this._unit;
  }
  uy(y:number) {
    return -((y - this.halfHeight) / this._unit);
  }

  //---------------------------------------------------------------------------
  // Private メソッド
  //---------------------------------------------------------------------------

  /** ハーフサイズを再計算 */
  private reCalcHalf() {
    this.halfWidth  = this.width  / 2;
    this.halfHeight = this.height / 2;
  }

  /** 上下左右を再計算 */
  private reCalcUpDownLeftRight() {
    this._top   = this.halfHeight / this._unit;
    this._down  = -this._top;
    this._right = this.halfWidth / this._unit;
    this._left  = -this._right;
  }

  //---------------------------------------------------------------------------
  // Private 変数
  //---------------------------------------------------------------------------

  /** canvasの幅 */
  private width:number;

  /** canvasの高さ */
  private height:number;
  
  /** 1unitあたりのピクセル数 */
  private _unit:number;
  
  /** canvas幅の1/2 */
  private halfWidth:number;

  /** canvas高さの1/2 */
  private halfHeight:number;
  
  /** 独自座標における一番上の座標値 */
  private _top:number;

  /** 独自座標における一番下の座標値 */
  private _down:number;

  /** 独自座標における左端 */
  private _left:number;

  /** 独自座標における右端 */
  private _right:number;
}

const instance = new sCoord();
export default instance;