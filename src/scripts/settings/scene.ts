/******************************************************************************
 * シーンの設定
 *****************************************************************************/
import { ISceneSettings } from '~/scripts/system/sScene';
import uScene1 from '~/scripts/unit/scene/uScene1';
import uScene2 from '~/scripts/unit/scene/uScene2';

/** シーン名(key)と対応するクラスのマッピングを定義 */
const settings:ISceneSettings = {
  "Scene1": uScene1,
  "Scene2": uScene2,
}

export default settings;