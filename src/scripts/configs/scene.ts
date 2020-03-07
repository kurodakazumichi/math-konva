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
import * as Collision from '~/scripts/scene/collision';
import * as Motion from '~/scripts/scene/motion';

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
  HS_MAth1_TRIANGLE_RATIO_01,
  HS_MAth1_TRIANGLE_RATIO_02,
  HS_MAth1_TRIANGLE_RATIO_03,
  HS_MATHB_VECTOR_01,
  HS_MATHB_VECTOR_02,
  HS_MATHB_VECTOR_03,
  HS_MATHB_VECTOR_04,
  HS_MATHB_VECTOR_05,
  HS_MATHB_VECTOR_06,
  HS_MATHB_VECTOR_07,
  HS_MATHB_VECTOR_08,
  HS_MATHB_VECTOR_09,
  HS_MATHB_VECTOR_10,
  MY_TEST_TRIANGLE_01,
  COLISION_POINT_AND_POINT,
  COLISION_POINT_AND_LINE,
  COLISION_POINT_AND_SEGMENT,
  COLISION_POINT_AND_CIRCLE,
  COLISION_CIRCLE_AND_CIRCLE,
  COLISION_CIRCLE_AND_LINE,
  COLISION_CIRCLE_AND_CIRCLE2,
  COLISION_AABB_AND_AABB,
  COLISION_OBB_AND_OBB01,

  MOTION_CIRCULAR_01,
  MOTION_CIRCULAR_02,
  MOTION_LINEAR_01,
  MOTION_PYHSICAL_01,
  MOTION_TRACKING_01,
  MOTION_TRACKING_02,
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

  { name:"hs_math1_triangle_ratio_01", type:Type.HS_MAth1_TRIANGLE_RATIO_01, sceneClass:HsMath1.TriangleRatio01 },
  { name:"hs_math1_triangle_ratio_02", type:Type.HS_MAth1_TRIANGLE_RATIO_02, sceneClass:HsMath1.TriangleRatio02 },
  { name:"hs_math1_triangle_ratio_03", type:Type.HS_MAth1_TRIANGLE_RATIO_03, sceneClass:HsMath1.TriangleRatio03 },

  { name:"hs_mathb_vector_01"     , type:Type.HS_MATHB_VECTOR_01     , sceneClass:HsMathB.Vector01 },
  { name:"hs_mathb_vector_02"     , type:Type.HS_MATHB_VECTOR_02     , sceneClass:HsMathB.Vector02 },
  { name:"hs_mathb_vector_03"     , type:Type.HS_MATHB_VECTOR_03     , sceneClass:HsMathB.Vector03 },
  { name:"hs_mathb_vector_04"     , type:Type.HS_MATHB_VECTOR_04     , sceneClass:HsMathB.Vector04 },
  { name:"hs_mathb_vector_05"     , type:Type.HS_MATHB_VECTOR_05     , sceneClass:HsMathB.Vector05 },
  { name:"hs_mathb_vector_06"     , type:Type.HS_MATHB_VECTOR_06     , sceneClass:HsMathB.Vector06 },
  { name:"hs_mathb_vector_07"     , type:Type.HS_MATHB_VECTOR_07     , sceneClass:HsMathB.Vector07 },
  { name:"hs_mathb_vector_08"     , type:Type.HS_MATHB_VECTOR_08     , sceneClass:HsMathB.Vector08 },
  { name:"hs_mathb_vector_09"     , type:Type.HS_MATHB_VECTOR_09     , sceneClass:HsMathB.Vector09 },
  { name:"hs_mathb_vector_10"     , type:Type.HS_MATHB_VECTOR_10     , sceneClass:HsMathB.Vector10 },

  { name:"my_test_triangle_01" , type:Type.MY_TEST_TRIANGLE_01 , sceneClass:MyTest.Triangle01 },

  { name:"collision_point_and_point"   , type:Type.COLISION_POINT_AND_POINT   , sceneClass:Collision.PointAndPoint },
  { name:"collision_point_and_line"    , type:Type.COLISION_POINT_AND_LINE    , sceneClass:Collision.PointAndLine },
  { name:"collision_point_and_segment" , type:Type.COLISION_POINT_AND_SEGMENT , sceneClass:Collision.PointAndSegment },
  { name:"collision_point_and_circle"  , type:Type.COLISION_POINT_AND_CIRCLE  , sceneClass:Collision.PointAndCircle },
  { name:"collision_circle_and_circle" , type:Type.COLISION_CIRCLE_AND_CIRCLE , sceneClass:Collision.CircleAndCircle },
  { name:"collision_circle_and_line"   , type:Type.COLISION_CIRCLE_AND_LINE   , sceneClass:Collision.CircleAndLine },
  { name:"collision_circle_and_circle2", type:Type.COLISION_CIRCLE_AND_CIRCLE2, sceneClass:Collision.CircleAndCircle2 },
  { name:"collision_aabb_and_aabb"     , type:Type.COLISION_AABB_AND_AABB     , sceneClass:Collision.AABBAndAABB },
  { name:"collision_obb_and_obb_01"    , type:Type.COLISION_OBB_AND_OBB01     , sceneClass:Collision.OBBAndOBB01 },

  { name:"motion_circular_01", type:Type.MOTION_CIRCULAR_01, sceneClass:Motion.Circular01 },
  { name:"motion_circular_02", type:Type.MOTION_CIRCULAR_02, sceneClass:Motion.Circular02 },
  { name:"motion_linear_01"  , type:Type.MOTION_LINEAR_01  , sceneClass:Motion.Linear01 },
  { name:"motion_pyhsical_01", type:Type.MOTION_PYHSICAL_01, sceneClass:Motion.Physical01 },
  { name:"motion_tracking_01", type:Type.MOTION_TRACKING_01, sceneClass:Motion.Tracking01 },
  { name:"motion_tracking_02", type:Type.MOTION_TRACKING_02, sceneClass:Motion.Tracking02 },
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