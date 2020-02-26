/******************************************************************************
 * Sceneデータの取りまとめ
 *****************************************************************************/
import SceneBase from '~/scripts/scene/SceneBase';
import TitleScene from '~/scripts/scene/TitleScene';

import * as MsMath2 from '~/scripts/scene/msMath2';
import * as MsMath3 from '~/scripts/scene/msMath3';
import * as HsMath1 from '~/scripts/scene/hsMath1';
import * as HsMathB from '~/scripts/scene/hsMathB';
import * as MyTest from '~/scripts/scene/myTest';

/** シーン列挙型 */
export enum Type {
  Title,
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
  HS_MATH1_QUADRATIC_09,
  HS_MATH1_QUADRATIC_10,
  HS_MATHB_VECTOR_01,
  HS_MATHB_VECTOR_02,
  HS_MATHB_VECTOR_03,
  HS_MATHB_VECTOR_04,
  HS_MATHB_VECTOR_05,
  HS_MATHB_VECTOR_06,
  HS_MATHB_VECTOR_07,
  MY_TEST_TRIANGLE_01,
  MY_TEST_COLISION_POINT_AND_POINT,
  MY_TEST_COLISION_POINT_AND_LINE,
  MY_TEST_COLISION_POINT_AND_SEGMENT,
  MY_TEST_COLISION_POINT_AND_CIRCLE,
  MY_TEST_COLISION_CIRCLE_AND_CIRCLE,
  MY_TEST_COLISION_CIRCLE_AND_LINE,
  MY_TEST_COLISION_CIRCLE_AND_CIRCLE2,
}

//-----------------------------------------------------------------------------
// シーンデータテーブル
export interface ISceneRecord {
  name      :string;           // シーン名
  type      :Type;             // シーンタイプ
  sceneClass:typeof SceneBase; // シーンクラス
}

const configs:ISceneRecord[] = [
  { name:"title"                  , type:Type.Title                  , sceneClass:TitleScene   },
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
  { name:"hs_math1_quadratic_09"  , type:Type.HS_MATH1_QUADRATIC_09  , sceneClass:HsMath1.Quadratic09 },
  { name:"hs_math1_quadratic_10"  , type:Type.HS_MATH1_QUADRATIC_10  , sceneClass:HsMath1.Quadratic10 },

  { name:"hs_mathb_vector_01"     , type:Type.HS_MATHB_VECTOR_01     , sceneClass:HsMathB.Vector01 },
  { name:"hs_mathb_vector_02"     , type:Type.HS_MATHB_VECTOR_02     , sceneClass:HsMathB.Vector02 },
  { name:"hs_mathb_vector_03"     , type:Type.HS_MATHB_VECTOR_03     , sceneClass:HsMathB.Vector03 },
  { name:"hs_mathb_vector_04"     , type:Type.HS_MATHB_VECTOR_04     , sceneClass:HsMathB.Vector04 },
  { name:"hs_mathb_vector_05"     , type:Type.HS_MATHB_VECTOR_05     , sceneClass:HsMathB.Vector05 },
  { name:"hs_mathb_vector_06"     , type:Type.HS_MATHB_VECTOR_06     , sceneClass:HsMathB.Vector06 },
  { name:"hs_mathb_vector_07"     , type:Type.HS_MATHB_VECTOR_07     , sceneClass:HsMathB.Vector07 },

  { name:"my_test_triangle_01" , type:Type.MY_TEST_TRIANGLE_01 , sceneClass:MyTest.Triangle01 },
  { name:"my_test_collision_point_and_point" , type:Type.MY_TEST_COLISION_POINT_AND_POINT , sceneClass:MyTest.CollisionPointAndPoint },
  { name:"my_test_collision_point_and_line" , type:Type.MY_TEST_COLISION_POINT_AND_LINE , sceneClass:MyTest.CollisionPointAndLine },
  { name:"my_test_collision_point_and_segment" , type:Type.MY_TEST_COLISION_POINT_AND_SEGMENT , sceneClass:MyTest.CollisionPointAndSegment },
  { name:"my_test_collision_point_and_circle" , type:Type.MY_TEST_COLISION_POINT_AND_CIRCLE , sceneClass:MyTest.CollisionPointAndCircle },
  { name:"my_test_collision_circle_and_circle" , type:Type.MY_TEST_COLISION_CIRCLE_AND_CIRCLE , sceneClass:MyTest.CollisionCircleAndCircle },
  { name:"my_test_collision_circle_and_line" , type:Type.MY_TEST_COLISION_CIRCLE_AND_LINE , sceneClass:MyTest.CollisionCircleAndLine },
  { name:"my_test_collision_circle_and_circle2" , type:Type.MY_TEST_COLISION_CIRCLE_AND_CIRCLE2 , sceneClass:MyTest.CollisionCircleAndCircle2 },
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