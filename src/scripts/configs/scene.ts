/******************************************************************************
 * Sceneデータの取りまとめ
 *****************************************************************************/
import SceneBase from '~/scripts/scene/SceneBase';
import SampleScene from '~/scripts/scene/SampleScene';

import * as MsMath2 from '~/scripts/scene/msMath2';
import * as MsMath3 from '~/scripts/scene/msMath3';
import * as HsMath1 from '~/scripts/scene/hsMath1';

/** シーン列挙型 */
export enum Type {
  Sample1,
  MS_MATH2_LINEAR_01,
  MS_MATH3_PYTHAGOREAN_01,
  HS_MATH1_QUADRATIC_01,
  HS_MATH1_QUADRATIC_02,
  HS_MATH1_QUADRATIC_03,
  HS_MATH1_QUADRATIC_04,
  HS_MATH1_QUADRATIC_05,
  HS_MATH1_QUADRATIC_06,
  HS_MATH1_QUADRATIC_07,
  HS_MATH1_QUADRATIC_08,
}

//-----------------------------------------------------------------------------
// シーンデータテーブル
export interface ISceneRecord {
  name      :string;           // シーン名
  type      :Type;             // シーンタイプ
  sceneClass:typeof SceneBase; // シーンクラス
}

const configs:ISceneRecord[] = [
  { name:"Sample1"                , type:Type.Sample1                , sceneClass:SampleScene   },
  { name:"ms_math2_linear_01"     , type:Type.MS_MATH2_LINEAR_01     , sceneClass:MsMath2.Linear01 },
  { name:"ms_math3_pythagorean_01", type:Type.MS_MATH3_PYTHAGOREAN_01, sceneClass:MsMath3.Pythagorean01 },
  { name:"hs_math1_quadratic_01"  , type:Type.HS_MATH1_QUADRATIC_01  , sceneClass:HsMath1.Quadratic01 },
  { name:"hs_math1_quadratic_02"  , type:Type.HS_MATH1_QUADRATIC_02  , sceneClass:HsMath1.Quadratic02 },
  { name:"hs_math1_quadratic_03"  , type:Type.HS_MATH1_QUADRATIC_03  , sceneClass:HsMath1.Quadratic03 },
  { name:"hs_math1_quadratic_04"  , type:Type.HS_MATH1_QUADRATIC_04  , sceneClass:HsMath1.Quadratic04 },
  { name:"hs_math1_quadratic_05"  , type:Type.HS_MATH1_QUADRATIC_05  , sceneClass:HsMath1.Quadratic05 },
  { name:"hs_math1_quadratic_06"  , type:Type.HS_MATH1_QUADRATIC_06  , sceneClass:HsMath1.Quadratic06 },
  { name:"hs_math1_quadratic_07"  , type:Type.HS_MATH1_QUADRATIC_07  , sceneClass:HsMath1.Quadratic07 },
  { name:"hs_math1_quadratic_08"  , type:Type.HS_MATH1_QUADRATIC_08  , sceneClass:HsMath1.Quadratic08 },
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