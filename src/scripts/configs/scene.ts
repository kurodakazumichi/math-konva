/******************************************************************************
 * Sceneデータの取りまとめ
 *****************************************************************************/
import SceneBase from '~/scripts/scene/SceneBase';
import SampleScene from '~/scripts/scene/SampleScene';
import SampleScene2 from '~/scripts/scene/SampleScene2';

/** シーン列挙型 */
export enum Type {
  Sample1,
  Sample2
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
  {name:"Sample2", type:Type.Sample2, sceneClass:SampleScene2 }
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