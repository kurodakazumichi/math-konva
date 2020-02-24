import SceneBase from '~/scripts/scene/SceneBase';
import { sShape } from '~/scripts/system';
import { Circle } from '~/scripts/node/shape';
import { Vector2 } from 'math-lab';
import { GUI as GUIHelper } from '~/scripts/helper';

/******************************************************************************
 * ベクトル　ベクトルの加法
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
    return "点と線の衝突判定";
  }

  protected get description() {
    return `
点と線の衝突は**ベクトルの外積を使って判定**する。
`;
  }

  //---------------------------------------------------------------------------
  // Parameters
  //---------------------------------------------------------------------------
  private params = {

  }

  //---------------------------------------------------------------------------
  // GUI
  //---------------------------------------------------------------------------
  initGUI() {

  }

  //---------------------------------------------------------------------------
  // Graph
  //---------------------------------------------------------------------------
  initGraph() {
    
  }

  //---------------------------------------------------------------------------
  // Update
  //---------------------------------------------------------------------------
  update() {

  }
}