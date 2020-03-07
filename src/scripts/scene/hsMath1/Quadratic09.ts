import SceneBase from '~/scripts/scene/SceneBase';
import { sShape, sCoord } from '~/scripts/system';
import { Line, Circle, Text } from '~/scripts/node/shape';
import { Quadratic } from 'math-lab';
import { GUI } from '~/scripts/helper';

/******************************************************************************
 * ２次関数　目的地に向かってモノを投げる動き
 *****************************************************************************/
export default class SampleScene extends SceneBase 
{  
  constructor() {
    super();
    this.onChangeGuide = this.onChangeGuide.bind(this);
    this.onDragMovePass1 = this.onDragMovePass1.bind(this);
    this.onDragMovePass2 = this.onDragMovePass2.bind(this);
    this.onDragMovePass3 = this.onDragMovePass3.bind(this);
  }

  //---------------------------------------------------------------------------
  // Overrideするプロパティ
  //---------------------------------------------------------------------------
  protected get title() {
    return "２次関数　狙った場所にモノを投げる";
  }

  protected get overview() {
    return `
２次関数は**通過する３点がわかれば軌道が決まる**

*狙った場所へモノを投げる軌道*を求めたい場合は  
出発点、通過点、終着点の３点を決める事で**その軌道を描く２次関数の式**を求める事ができます。
    `;
  }

  //---------------------------------------------------------------------------
  // Parameters
  //---------------------------------------------------------------------------
  private quad = new Quadratic();
  
  params = {
    // ３点の座標(初期値)
    points: [
      {x:-4, y:-4},
      {x:-1 , y:3},
      {x:4.5 , y:1},
    ],
    // ２次式パラメータ(表示用)
    quad: { a:0, b:0, c:0 },
    // オプション
    options: {
      guide:true,
      speed:0.1,
    }
  }

  //---------------------------------------------------------------------------
  // GUI
  //---------------------------------------------------------------------------
  initGUI() {
    const f1 = this.gui.addFolder("現在の２次関数の各値(一般形)");
    GUI.addLSN(f1, this.params.quad, "a");
    GUI.addLSN(f1, this.params.quad, "b");
    GUI.addLSN(f1, this.params.quad, "c");
    f1.open();

    const f2 = this.gui.addFolder("オプション");
    f2.add(this.params.options, "guide").onChange(this.onChangeGuide);
    GUI.addSMN(f2, this.params.options, "speed");
    f2.open();
  }

  private onChangeGuide(v:boolean) {
    this.quadLine.visible(v);
    this.points.map((p) => p.visible(v));
    this.labels.map((l) => l.visible(v));
  }

  //---------------------------------------------------------------------------
  // Graph
  //---------------------------------------------------------------------------

  /** グラフ内の要素 */
  private quadLine:Line = sShape.solidLine();
  private mover:Circle = sShape.point().radius(0.3);

  private points:Circle[] = [
    sShape.draggablePoint(),
    sShape.draggablePoint(),
    sShape.draggablePoint()
  ]

  private labels:Text[] = [
    sShape.text("出発点"),
    sShape.text("通過点"),
    sShape.text("終着点"),
  ];

  initGraph() {
    this.add(this.quadLine);
    this.add(this.mover);
    this.points.map((p) => { this.add(p); })
    this.labels.map((l) => { this.add(l); })

    this.points[0].on('dragmove', this.onDragMovePass1);
    this.points[1].on('dragmove', this.onDragMovePass2);
    this.points[2].on('dragmove', this.onDragMovePass3);

    this.updateShape();
  }

  private get minX() {
    return this.params.points.reduce((a, b) => (a.x < b.x)? a:b).x;
  }
  private get maxX() {
    return this.params.points.reduce((a, b) => (a.x > b.x)? a:b).x;
  }

  private onDragMovePass1(e:Circle) {
    const [p1, p2] = this.params.points;
    p1.x = (e.x() < p2.x)? e.x() : p1.x;
    p1.y = e.y();
    this.updateShape();
  }

  private onDragMovePass2(e:Circle) {
    const [p1, p2, p3] = this.params.points;
    const x = e.x();
    p2.x = (p1.x < x && x < p3.x)? x:p2.x;
    p2.y = e.y();
    this.updateShape();
  }

  private onDragMovePass3(e:Circle) {
    const [, p2, p3] = this.params.points;
    const x = e.x();
    p3.x = (p2.x < x)? x : p3.x;
    p3.y = e.y();
    this.updateShape();
  }

  //---------------------------------------------------------------------------
  // Update
  //---------------------------------------------------------------------------
  private x = 0;

  update() 
  {
    this.updateX();
    this.mover.pos(this.x, this.quad.fx(this.x));
  }

  private updateX() {
    // xを加算
    this.x += this.params.options.speed;

    if (this.x < this.minX) {
      this.x = this.maxX;
    }

    if (this.maxX < this.x) {
      this.x = this.minX;
    }
  }

  private updateShape() {
    this.updateShape_Line();
    this.updateShape_PointPosition();
  }
  
  private updateShape_Line() {
    const [p1, p2, p3] = this.params.points;
    this.quad.initBy3PassPoints(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
    this.quadLine.points(this.quad.getPoints(sCoord.left, sCoord.right, 0.1));

    // gui表示用のパラメータも更新
    this.params.quad.a = this.quad.a;
    this.params.quad.b = this.quad.b;
    this.params.quad.c = this.quad.c;
  }

  private updateShape_PointPosition() {
    // 赤丸とラベル
    this.params.points.map((pos, i) => {
      this.points[i].pos(pos.x, pos.y);
      this.labels[i].pos(pos.x, pos.y);
    })
  }
}
