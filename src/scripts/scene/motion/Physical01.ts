import SceneBase from '~/scripts/scene/SceneBase';
import { sShape, sCoord } from '~/scripts/system';
import { GUI as GUIHelper } from '~/scripts/helper';
import { Vector2 } from 'math-lab';
import { Circle } from '~/scripts/node/shape'


/******************************************************************************
 * 物理挙動
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
    return "物理挙動";
  }

  protected get description() {
    return `
重力による加速度運動と跳ね返り
`;
  }

  //---------------------------------------------------------------------------
  // Parameters
  //---------------------------------------------------------------------------
  private params = {
    gravity :0.001,
  }


  //---------------------------------------------------------------------------
  // GUI
  //---------------------------------------------------------------------------

  initGUI() {
    GUIHelper.addSlider(this.gui, this.params, "gravity").step(0.001);
  }

  //---------------------------------------------------------------------------
  // Graph
  //---------------------------------------------------------------------------
  private shapes =  {
    c: sShape.draggablePoint().x(0),
    p: sShape.draggablePoint().x(0),
    aux: sShape.auxLine().dash(0.1),
  }
  initGraph() {
    this.shapes.p
      .on('dragstart', this.onDragStart.bind(this))
      .on('dragmove' , this.onDragMove.bind(this))
      .on('dragend'  , this.onDragEnd.bind(this))
    
    this.addShapes(this.shapes);
  }

  private onDragStart(e:Circle) {
    this.start = e.pos()
    this.isPhysical = false;
  }

  private onDragMove(e:Circle) {
    this.current = e.pos();
  }

  private onDragEnd(e:Circle) {
    this.velocity = Vector2.sub(this.start, e.pos()).times(0.1);
    this.isPhysical = true;
  }

  //---------------------------------------------------------------------------
  // Update
  //---------------------------------------------------------------------------
  private isPhysical       = true;
  private velocity:Vector2 = new Vector2(0, -0.01);
  private start:Vector2    = Vector2.zero;
  private current:Vector2  = Vector2.zero;

  update() {
    const { start, current } = this;

    // ひっぱりの補助線
    this.shapes.aux.points([start.x,  start.y, current.x, current.y]);

    // 物理挙動させるフラグがON
    if (this.isPhysical){

      // 補助線を徐々に短かく
      current.add(Vector2.sub(start, current).times(0.45));

      // 重力加速度を加算
      this.velocity.y -= this.params.gravity;

      // 丸の座標を速度分移動
      const pos   = this.shapes.c.pos();
      pos.add(this.velocity);
  
      // y座標が0以下になったら、速度を低下させつつ、座標もy=0に押し戻す
      if (pos.y < 0){
        this.velocity.y *= -0.7;
        this.velocity.x *= 0.7;
        pos.y = 0;
      }
  
      // 画面上、左右に当たったら速度を反転(原則はなし)
      if (sCoord.top < pos.y) {
        this.velocity.y *= -1;
      }
      if (pos.x < sCoord.left || sCoord.right < pos.x ) {
        this.velocity.x *= -1;
      }
  
      // 画面外に行かないように調整
      sCoord.confine(pos);
  
      // 座標をセット
      this.shapes.p.pos(pos);
      this.shapes.c.pos(pos);
    } 

  }
}