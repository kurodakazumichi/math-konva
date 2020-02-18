import { GUI } from 'dat.gui';
import { sCoord, sColor } from '~/scripts/system';
import { isNumber } from 'util';

const DEFAULT_STEP = 0.1;

export const addLSN = (gui:GUI, target:Object, propName:string) => {
  return gui.add(target, propName).step(0.1).listen();
}
export const addSMN = (gui:GUI, target:Object, propName:string, range:number = 0.3) => {
  return gui.add(target, propName).min(-range).max(range).step(0.01).listen();
}

export const addS01 = (gui:GUI, target:Object, propName:string) => {
  return gui.add(target, propName, -1, 1).step(0.1).listen();
}
export const addS10 = (gui:GUI, target:Object, propName:string) => {
  return gui.add(target, propName, -10, 10).step(DEFAULT_STEP).listen();
}

export const addSLR =  (gui:GUI, target:Object, propName:string) => {
  return gui.add(target,propName, sCoord.left, sCoord.right)
    .step(DEFAULT_STEP).listen();
}

export const addSTD = (gui:GUI, target:Object, propName:string) => {
  return gui.add(target, propName, sCoord.down, sCoord.top)
    .step(DEFAULT_STEP).listen();
}

/** Enumを元にセレクとボックスを追加する */
export const addSelect = <T>(gui:GUI, target:Object, propName:string, e:T) => {

  const list:any = {};
  Object.entries(e).forEach(([key,  value]) => {
    if (isNaN(Number(key))){
      list[key] = value;
    }
  })

  return gui.add(target, propName, list).listen();
}

/** スライダー形式のGUIを追加する */
export const addSlider = (gui:GUI, target:Object, propName:string) => {
  const min = getSliderMinByPropName(propName);
  const max = getSliderMaxByPropName(propName);

  return gui.add(target, propName, min, max)
    .step(DEFAULT_STEP).listen()
}

/** スライダーの最小値をpropNameから判断して取得 */
function getSliderMinByPropName(propName:string) 
{
  switch(propName) {
    case "x": return sCoord.left;
    case "y": return sCoord.down;
    case "timer": return 0;
  }
  return -1;
}

/** スライダーの最大値をpropNameから判断して取得 */
function getSliderMaxByPropName(propName:string) {
  switch(propName) {
    case "x": return sCoord.right;
    case "y": return sCoord.top;
    case "timer": return 1;
  }
  return 1;
}

