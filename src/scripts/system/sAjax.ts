import axios, { AxiosResponse } from 'axios';

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

      const data = (this.isMarkdown(res))? res.data : "";
      
      cb(data);
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

  private isMarkdown(response:AxiosResponse) {
    return (response.headers['content-type'] === "text/markdown; charset=UTF-8");
  }
}

const instance = new sAjax();
export default instance;
