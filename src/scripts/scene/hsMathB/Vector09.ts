import SceneBase from '~/scripts/scene/SceneBase';
import { sShape, sColor, sGroup } from '~/scripts/system';
import { Vector2 } from 'math-lab';
import { Util } from '~/scripts/helper';

/******************************************************************************
 * ベクトルの内積
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
    return "ベクトルの内積";
  }

  protected get description() {
    return `
２つのベクトル$\\vec{a} = (x1, y1)$と$\\vec{b} = (x2, y2)$があり、ベクトルの間の角を$\\theta$とした時

ベクトル内積は$\\vec{a} \\cdot \\vec{b}$と書き、計算方法は以下のようになる

- **θの角度がわかって**いる場合(ベクトルの長さをかけたものに、さらにcosθをかける)

$\\vec{a} \\cdot \\vec{b}=|\\vec{a}||\\vec{b}|\\cos\\theta$

- **θの角度がわからない**場合(それぞれのx、yをかけたものを足す)

$\\vec{a} \\cdot \\vec{b}=x1x2 + y1y2$
`;
  }

  //---------------------------------------------------------------------------
  // Parameters
  //---------------------------------------------------------------------------
  private params = {
    normalizeA:false,
  }


  //---------------------------------------------------------------------------
  // GUI
  //---------------------------------------------------------------------------
  initGUI() {
    this.gui.add(this.params, "normalizeA");
  }

  //---------------------------------------------------------------------------
  // Graph
  //---------------------------------------------------------------------------
  private groups = {
    a: sGroup.vector(Vector2.zero, Vector2.right),
    b: sGroup.vector(Vector2.zero, Vector2.one.times(3)),
  }
  private shapes = {
    dot     : sShape.point(),
    aux1    : sShape.auxLine(),
    aux2    : sShape.auxLine(),
    labelDot: sShape.text(),
  }

  private initStyle() {
    this.groups.a.nameText("a")
      .visibleName(true)
      .visibleAuxLine(true)
      .visiblePointerP1(false)

    this.groups.b.nameText("b")
      .visibleName(true)
      .visiblePointerP1(false)

    this.shapes.aux1.stroke(sColor.main);
    this.shapes.aux2.dash(0.1);
  }

  initGraph() {
    this.initStyle();
    this.addGroups(this.groups);
    this.addShapes(this.shapes);
  }

  //---------------------------------------------------------------------------
  // Update
  //---------------------------------------------------------------------------
  update() {
    const { a, b } = this.groups;

    // 基準となるベクトルaの正規化フラグがたっていたら
    // ベクトルaは常に正規化された状態をキープする
    if (this.params.normalizeA) {
      a.data.p2.copy(a.vec.normalize);
      a.sync();
    }

    // 更新に必要な値を産出
    const v1     = a.vec;
    const v2     = b.vec;
    const dot    = Vector2.dot(v1, v2);
    const dotPos = v1.normalize.times(dot);

    // 内積の位置を表す点
    this.shapes.dot.pos(dotPos);

    // 内積の値
    this.shapes.labelDot.text(`${Util.round(dot,2)}`)
      .pos(dotPos);

    // ベクトルbからベクトルaに射影した補助線
    this.shapes.aux2.points([
      v2.x, v2.y, dotPos.x, dotPos.y
    ])
  }
}