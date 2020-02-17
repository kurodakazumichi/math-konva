declare const window:any;

export default class SystemBase {
  constructor() {
    if (process.env.NODE_ENV === "development") {
      const name = this.constructor.name as string;
      window[name] = this;
    }
  }
}