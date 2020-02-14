import * as SceneConfigs from '~/scripts/configs/scene';
import sStage from './sStage';
import SceneBase from '~/scripts/scene/SceneBase';

declare var window:{ sScene:sScene };
/******************************************************************************
 * Scene管理システム(SceneそのものはKonva.Layerに該当する)
 *****************************************************************************/
class sScene {

  constructor() {
    this.scene = null;
    window.sScene = this;
  }

  //---------------------------------------------------------------------------
  // Public メソッド
  //---------------------------------------------------------------------------
  /** 初期化 */
  init() {}

  /** 更新 */
  update() {
    if (!this.scene) return;
    
    this.scene.update();
    this.scene.draw();
  }

  loadSceneByType(type:SceneConfigs.Type) {
    this.load(SceneConfigs.getConfigByType(type));
  }

  loadSceneByName(name:string) {
    this.load(SceneConfigs.getConfigByName(name));
  }

  loadSceneFromUrlParam(key:string = "scene") {
    const maybeSceneName = this.getSceneTypeFromUrl(key);
    this.load(SceneConfigs.getConfigByName(maybeSceneName));
  }

  //---------------------------------------------------------------------------
  // Private メソッド
  //---------------------------------------------------------------------------

  /** 設定をもとにシーンをロード */
  private load(config:SceneConfigs.ISceneRecord|undefined) 
  {
    const newScene = this.createScene(config);

    if (!newScene) return;
    
    this.scene?.destroy();

    this.scene = newScene;
    this.scene.init();
    sStage.add(this.scene.layerOfKonva);
  }

  /** 設定をもとにシーンを作成 */
  private createScene(config:SceneConfigs.ISceneRecord|undefined) 
  {
    if (!config) return null;

    return new config.sceneClass();
  }
  
  /** URLのget parameterからシーンタイプを取得 */
  private getSceneTypeFromUrl(key:string) 
  {
    let maybeSceneName = "";
    
    location.search.substring(1).split("&").map((param) => {
      const data = param.split("=");
  
      if (data[0] === key) {
        maybeSceneName = data[1];
      }
    });

    return maybeSceneName
  }

  //---------------------------------------------------------------------------
  // Private 変数
  //---------------------------------------------------------------------------

  private scene:SceneBase|null;
}

const instance = new sScene();
export default instance;