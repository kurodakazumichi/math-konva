import SceneBase from '~/scripts/scene/SceneBase';
import { sShape, sCoord } from '~/scripts/system';
import { Line, Circle, Text } from '~/scripts/node/shape';
import { Quadratic } from 'math-lab';
import { GUI } from '~/scripts/helper';

/******************************************************************************
 * ２次関数　２つの放物線が交わる点
 *****************************************************************************/
export default class SampleScene extends SceneBase 
{  
  constructor() {
    super();
    this.onChangeParams = this.onChangeParams.bind(this);
  }

  //---------------------------------------------------------------------------
  // Overrideするプロパティ
  //---------------------------------------------------------------------------
  protected get title() {
    return "２つの放物線が交わる点";
  }

  protected get description() {
    return `交点は２つの**２次関数の連立方程式**を解く事で交点が求める事ができる。`;
  }

  //---------------------------------------------------------------------------
  // Graph
  //---------------------------------------------------------------------------
  private quad1 = new Quadratic();
  private quad2 = new Quadratic();

  //---------------------------------------------------------------------------
  // GUI
  //---------------------------------------------------------------------------
  params = {
    quad1: { a:1, b:-1, c:-1 },
    quad2: { a:-1, b:-1, c:1 },
  }

  initGUI() {
    const f1 = this.gui.addFolder("放物線１");
    GUI.addS10(f1, this.params.quad1, "a").onChange(this.onChangeParams);
    GUI.addS10(f1, this.params.quad1, "b").onChange(this.onChangeParams);
    GUI.addSTD(f1, this.params.quad1, "c").onChange(this.onChangeParams);
    f1.open();

    const f2 = this.gui.addFolder("放物線２");
    GUI.addS10(f2, this.params.quad2, "a").onChange(this.onChangeParams);
    GUI.addS10(f2, this.params.quad2, "b").onChange(this.onChangeParams);
    GUI.addSTD(f2, this.params.quad2, "c").onChange(this.onChangeParams);
    f2.open();
  }

  //---------------------------------------------------------------------------
  // Graph
  //---------------------------------------------------------------------------

  /** グラフ内の要素 */
  private quad1Line:Line   = sShape.solidLine();
  private quad2Line:Line   = sShape.solidLine();
  private intersectPoints:Circle[] = [
    sShape.point(),
    sShape.point(),
  ]
  private intersectCoords:Text[] = [
    sShape.text().offset(0.2, -0.1),
    sShape.text().offset(0.2, -0.1),
  ]

  initGraph() 
  {
    this.onChangeParams();

    this.add(this.quad1Line);
    this.add(this.quad2Line);
    this.add(...this.intersectPoints);
    this.add(...this.intersectCoords);
  }

  onChangeParams() {
    const { quad1:q1, quad2:q2} = this.params;
    this.quad1.initGeneralForm(q1.a, q1.b, q1.c);
    this.quad2.initGeneralForm(q2.a, q2.b, q2.c);

    this.quad1Line.points(
      this.quad1.getPoints(sCoord.left, sCoord.right, 0.1)
    );
    this.quad2Line.points(
      this.quad2.getPoints(sCoord.left, sCoord.right, 0.1)
    )

    this.updateIntersectPoint();
  }

  updateIntersectPoint() {
    const p = Quadratic.intersect(this.quad1, this.quad2);

    this.intersectPoints.map((p) => { p.visible(false); })
    this.intersectCoords.map((p) => { p.visible(false); })

    for(let i = 0; i < p.count; ++i) {
      const x = p.points[i*2];
      const y = p.points[i*2+1];
      const point = this.intersectPoints[i];
      const coord = this.intersectCoords[i];

      point.visible(true);
      point.pos(x, y);

      coord.visible(true);
      coord.pos(x, y).text(`交点${i+1}`);
    }

  }

  update() {

  }
}