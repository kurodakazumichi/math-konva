import axios, { AxiosResponse } from 'axios';
import SystemBase from '~/scripts/system/SystemBase';
import { sEnv } from '~/scripts/system';

/******************************************************************************
 * マークダウンを扱うためのシステム
 *****************************************************************************/
class sAjax extends SystemBase{
  constructor() {
    super();
  }

  async loadMarkdown(key:string, cb:(data:string) => void) 
  {
    const url = `${this.mdBase}/${key}.md`

    try {
      const res = await axios.get(url);
      const data = this.isMarkdown(res)? res.data : "";
      cb(data);
    } catch {
      cb("");
    }
  }

  private isMarkdown(res:AxiosResponse) {
    return (this.getContextType(res) === "text/markdown");
  }

  private getContextType(res:AxiosResponse) {
    return res.headers["content-type"].split(";")[0] as string;
  }

  get mdBase() {
    return `${sEnv.baseUrl}md`;
  }
}

const instance = new sAjax();
export default instance;
