/******************************************************************************
 * Sceneデータの取りまとめ
 *****************************************************************************/
import SceneBase from '~/scripts/scene/SceneBase';
import SampleScene from '~/scripts/scene/SampleScene';

import * as MsMath2 from '~/scripts/scene/msMath2';
import * as MsMath3 from '~/scripts/scene/msMath3';

/** シーン列挙型 */
export enum Type {
  Sample1,
  MS_MATH2_LINEAR_01,
  MS_MATH3_PYTHAGOREAN_01,
}

//-----------------------------------------------------------------------------
// シーンデータテーブル
export interface ISceneRecord {
  name      :string;           // シーン名
  type      :Type;             // シーンタイプ
  sceneClass:typeof SceneBase; // シーンクラス
}

const configs:ISceneRecord[] = [
  {name:"Sample1", type:Type.Sample1, sceneClass:SampleScene  },
  {name:"ms_math2_linear_01", type:Type.MS_MATH2_LINEAR_01, sceneClass:MsMath2.Linear01},
  {name:"ms_math3_pythagorean_01", type:Type.MS_MATH3_PYTHAGOREAN_01, sceneClass:MsMath3.Pythagorean01}
];

const defaultConfig = configs[0];

//-----------------------------------------------------------------------------
// Helper
export const getConfigByName = (name:string) => {
  const config = configs.find((setting) => {
    return name === setting.name;
  });
  return (config)? config : defaultConfig;
}

export const getConfigByType = (type:Type) => {
  const config = configs.find((setting) => {
    return type === setting.type;
  });
  return (config)? config : defaultConfig;
}