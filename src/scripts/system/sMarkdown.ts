import MarkdownIt from 'markdown-it';
const katex = require('markdown-it-katex');
const container = require('markdown-it-container');
const video = require('markdown-it-video');
import SystemBase from '~/scripts/system/SystemBase';

/******************************************************************************
 * マークダウンを扱うためのシステム
 *****************************************************************************/
class sMarkdown extends SystemBase {
  constructor() {
    super();
    this.markdown = new MarkdownIt();
    this.markdown
      .use(katex)
      .use(container, "note")
      // .use(container, "warning") // containerを追加する場合はuseを追加していく
      .use(video)
      ;
    
  }

  render(md:string) {
    return this.markdown.render(md);
  }
  private markdown:MarkdownIt;
}

const instance = new sMarkdown();
export default instance;
