import SystemBase from '~/scripts/system/SystemBase';

enum Device {
  PC,
  TAB,
  SP,
}

enum Orientation {
  Portrait,
  Landscape
}

/******************************************************************************
 * 環境クラス
 *****************************************************************************/
class sEnv extends SystemBase {

  get isDevelop() {
    return (process.env.NODE_ENV === "development");
  }

  get baseUrl() {
    if (this.isDevelop) {
      return "/";
    } else {
      return "/math2d/";
    }
  }

  get device() {
    const ua = navigator.userAgent;
    if (ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) {
      return Device.SP;
    } else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
      return Device.TAB;
    } else {
      return Device.PC;
    }
  }

  get isPC() {
    return (this.device === Device.PC)
  }

  get isMobile() {
    return !this.isPC;
  }

  get orientation () {
    return (window.innerWidth <  window.innerHeight)
      ? Orientation.Portrait
      : Orientation.Landscape;
  }

  get smallerWidth() {
    return Math.min(window.innerWidth, window.innerHeight);
  }

  get windowWidth() {
    return window.innerWidth;
  }

  get windowHeight() {
    return window.innerHeight;
  }

  get isLandscape() {
    return this.orientation === Orientation.Landscape;
  }

  get isPortrait() {
    return this.orientation === Orientation.Portrait;
  }
}

const instance = new sEnv();
export default instance;