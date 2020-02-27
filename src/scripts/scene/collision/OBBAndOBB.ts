import SceneBase from '~/scripts/scene/SceneBase';
import { sColor, sGroup } from '~/scripts/system';
import { Vector2 } from 'math-lab';
import { Collision } from '~/scripts/helper';

/******************************************************************************
 * OBBとOBBの衝突
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
    return "OBBとOBBの衝突";
  }

  protected get description() {
    return `
`;
  }

  //---------------------------------------------------------------------------
  // Parameters
  //---------------------------------------------------------------------------
  private params = {
    update:true,
    pointer:false,
  }

  //---------------------------------------------------------------------------
  // GUI
  //---------------------------------------------------------------------------
  initGUI() {
    this.gui.add(this.params, "update");
    this.gui.add(this.params, "pointer").onChange(this.onChangePointer.bind(this));

    this.onChangePointer(this.params.pointer);
  }

  onChangePointer(v:boolean) {
    this.groups.r1.visiblePointers(v);
    this.groups.r2.visiblePointers(v);
  }

  //---------------------------------------------------------------------------
  // Graph
  //---------------------------------------------------------------------------
  private groups = {
    r1: sGroup.obb(Vector2.zero, 4, 1, 0),
    r2: sGroup.obb(Vector2.zero, 1, 1, 25),
  }
  initGraph() {
    this.addGroups(this.groups);
  }

  //---------------------------------------------------------------------------
  // Update
  //---------------------------------------------------------------------------
  private p = Vector2.zero;
  update() {

    if (this.params.update) {
      this.timer++;
      this.p.y = Math.sin(this.timer * 0.01) * 3;
      this.groups.r2.data.c.copy(this.p);
      this.groups.r2.data.angle = this.timer;
      this.groups.r2.sync();
    }

    this.updateCollision();
  }

  private updateCollision() {
    const { r1, r2 } = this.groups;
    const isHit = Collision.isHitOBBAndOBB(r1.data, r2.data);

    const color = (isHit)? sColor.yellow : sColor.main;
    r1.stroke(color);
    r2.stroke(color);
  }
}