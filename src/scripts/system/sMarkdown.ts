import MarkdownIt from 'markdown-it';
const katex = require('markdown-it-katex');

import SystemBase from '~/scripts/system/SystemBase';

/******************************************************************************
 * マークダウンを扱うためのシステム
 *****************************************************************************/
class sMarkdown extends SystemBase {
  constructor() {
    super();
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
