import axios from 'axios';

/******************************************************************************
 * マークダウンを扱うためのシステム
 *****************************************************************************/
class sAjax {
  constructor() {
    
  }

  async loadMarkdown(key:string, cb:(data:string) => void) 
  {
    const url = `${this.mdBase}/${key}.md`

    try {
      const res = await axios.get(url);
      cb(res.data);
    } catch {
      cb("");
    }
  }

  get mdBase() {
    if (process.env.NODE_ENV === "development") {
      return "/md";
    } else {
      return "/math2d/md";
    }
  }
}

const instance = new sAjax();
export default instance;
