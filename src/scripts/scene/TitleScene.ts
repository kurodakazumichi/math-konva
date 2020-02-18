import SceneBase from '~/scripts/scene/SceneBase';
import { sShape, sCoord } from '~/scripts/system';
import { Line, Circle } from '~/scripts/node/shape';
import { Vector2 } from 'math-lab';
import { GUI, Util } from '~/scripts/helper';

/******************************************************************************
 * タイトルシーン
 *****************************************************************************/
export default class TitleScene extends SceneBase 
{  
  constructor() {
    super();
  }

  //---------------------------------------------------------------------------
  // Overrideするプロパティ
  //---------------------------------------------------------------------------
  protected get title() {
    return "数学ラボ";
  }

  protected get description() {
    return `
*数学*を学んだところで**結局何ができる？**

そんな思いから*数学を使って*なんか**いろいろしてみよう**

と思って作成しているサイトです。
`;
  }

  //---------------------------------------------------------------------------
  // Parameters
  //---------------------------------------------------------------------------
  params = {
    v: new Vector2(1, 1)
  }

  //---------------------------------------------------------------------------
  // GUI
  //---------------------------------------------------------------------------
  initGUI() {
    const f1 = this.gui.addFolder("ベクトルの成分");
    GUI.addSLR(f1, this.params.v, "x");
    GUI.addSTD(f1, this.params.v, "y");
    GUI.addLSN(f1, this.params.v, "magnitude").step(0.01);
    f1.open();
  }

  //---------------------------------------------------------------------------
  // Graph
  //---------------------------------------------------------------------------

  /** グラフ内の要素 */
  private arrow = sShape.arrow();
  private pointer = sShape.draggablePoint();
  private label = sShape.text();

  initGraph() {

    this.add(this.arrow);

    this.add(this.pointer);
    this.add(this.label);
    this.pointer.on('dragmove', (e:Circle) => {

      this.params.v.x = Util.round(e.x());
      this.params.v.y = Util.round(e.y());

    })
  }

  //---------------------------------------------------------------------------
  // Update
  //---------------------------------------------------------------------------

  update() {
    const v = this.params.v;
    this.arrow.points([0, 0, v.x, v.y]);

    const nv = v.normalize;
    this.pointer.offset(nv.x * 0.2, nv.y * 0.2);
    this.pointer.pos(v.x, v.y);
    this.updateLabel();

  }

  updateLabel() {
    const { v } = this.params;
    const v2    = v.clone().times(0.5);

    this.label
      .pos(v2.x, v2.y)
      .text(`大きさ=${Util.round(v.magnitude, 2)}`);

  }


}
