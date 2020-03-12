import SceneBase from '~/scripts/scene/SceneBase';
import { sShape, sColor, sCoord } from '~/scripts/system';
import { Circle } from '~/scripts/node/shape';
import { Vector2, Util } from 'math-lab';

/******************************************************************************
 * 三角関数のグラフ
 *****************************************************************************/
export default class Scene extends SceneBase 
{  
  constructor() {
    super();
  }

  //---------------------------------------------------------------------------
  // Overrideするプロパティ
  //---------------------------------------------------------------------------
  protected get title() {
    return "三角関数のグラフ";
  }

  protected get overview() {
    return `
- $x$軸：$\\theta$(1メモリ90度)
- $y$軸：$sin\\theta, cos\\theta, tan\\theta$の値

とした場合のsin, cos, tanのグラフ
    `;
  }

  //---------------------------------------------------------------------------
  // Parameters
  //---------------------------------------------------------------------------
  private params = {
    sin:true,
    cos:false,
    tan:false,
  }

  //---------------------------------------------------------------------------
  // GUI
  //---------------------------------------------------------------------------
  initGUI() {
    this.gui.add(this.params, "sin").onChange(this.onChangeSin.bind(this));
    this.gui.add(this.params, "cos").onChange(this.onChangeCos.bind(this));
    this.gui.add(this.params, "tan").onChange(this.onChangeTan.bind(this));
  }

  private onChangeSin(v:boolean) {
    this.shapes.sin.visible(v);
    this.shapes.sinP.visible(v);
  }
  private onChangeCos(v:boolean) {
    this.shapes.cos.visible(v);
    this.shapes.cosP.visible(v);
  }
  private onChangeTan(v:boolean) {
    const {tan1, tan2, tan3, tan4, tan5} = this.shapes;
    [tan1, tan2, tan3, tan4, tan5].map((tan) => {
      tan.visible(v);
    });
    this.shapes.tanP.visible(v);
  }

  //---------------------------------------------------------------------------
  // Graph
  //---------------------------------------------------------------------------
  private shapes = {
    sin  : sShape.solidLine().strokeWidth(1).stroke(sColor.green),
    cos  : sShape.solidLine().strokeWidth(1).stroke(sColor.red),
    tan1 : sShape.solidLine().strokeWidth(1).stroke(sColor.yellow),
    tan2 : sShape.solidLine().strokeWidth(1).stroke(sColor.yellow),
    tan3 : sShape.solidLine().strokeWidth(1).stroke(sColor.yellow),
    tan4 : sShape.solidLine().strokeWidth(1).stroke(sColor.yellow),
    tan5 : sShape.solidLine().strokeWidth(1).stroke(sColor.yellow),
    sinP : sShape.point().radius(0.05),
    cosP : sShape.point().radius(0.05).fill(sColor.red),
    tanP : sShape.point().radius(0.05).fill(sColor.yellow),
    p    : sShape.draggablePoint().pos(0, 0),
    lable: sShape.text().offsetY(-1),
  }

  initGraph() {
    sShape.map(this.shapes, (s) => { this.add(s); })
    const tan = this.tanPoints;

    this.shapes.sin.points(this.sinPoints);
    this.shapes.cos.points(this.cosPoints);
    this.shapes.tan1.points(tan[0]);
    this.shapes.tan2.points(tan[1]);
    this.shapes.tan3.points(tan[2]);
    this.shapes.tan4.points(tan[3]);
    this.shapes.tan5.points(tan[4]);

    this.onChangeSin(this.params.sin);
    this.onChangeCos(this.params.cos);
    this.onChangeTan(this.params.tan);

    this.shapes.p.on('dragmove', this.onDragP.bind(this));
  }

  private onDragP(e:Circle) {
    this.pos.x = e.x();
  }

  //---------------------------------------------------------------------------
  // Update
  //---------------------------------------------------------------------------
  private pos = new Vector2();

  update() {
    this.shapes.p.pos(this.pos);
    this.shapes.lable.pos(this.pos);
    this.shapes.lable.text(Util.round(this.pos.x * 90).toString() + "°");

    const theta = this.pos.x * Math.PI/2;

    if (this.params.sin) {
      this.shapes.sinP.x(this.pos.x).y(Math.sin(theta));
    }
    if (this.params.cos) {
      this.shapes.cosP.x(this.pos.x).y(Math.cos(theta));
    }
    if (this.params.tan) {
      this.shapes.tanP.x(this.pos.x).y(Math.tan(theta));
    }
  }

  //---------------------------------------------------------------------------
  // sin, cos, tanのグラフ座標
  //---------------------------------------------------------------------------
  private get sinPoints() {
    const points = [];
    for(let i = sCoord.left; i  < sCoord.right; i += 0.1) {
      points.push(i, Math.sin(i*Math.PI/2));
    }
    return points;
  }

  private get cosPoints() {
    const points = [];
    for(let i = sCoord.left; i <  sCoord.right; i += 0.1) {
      points.push(i, Math.cos(i * Math.PI/2));
    }
    return points;
  }

  private get tanPoints() {
    const points:number[][] = [[], [], [], [], []];
    
    for(let i = 0; i < 100; ++i) {
      if (i%20 === 0) continue;
      const index = Math.floor(i/20);
      const x = i/10 - sCoord.right;
      points[index].push(x, Math.tan(x*Math.PI/2));
    }
    return points;
  }
}