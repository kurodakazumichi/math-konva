import MarkdownIt from 'markdown-it';
const katex = require('markdown-it-katex');

/******************************************************************************
 * マークダウンを扱うためのシステム
 *****************************************************************************/
class sMarkdown {
  constructor() {
    this.markdown = new MarkdownIt();
    this.markdown.use(katex);
  }

  render(md:string) {
    return this.markdown.render(md);
  }
  private markdown:MarkdownIt;
}

const instance = new sMarkdown();
export default instance;
