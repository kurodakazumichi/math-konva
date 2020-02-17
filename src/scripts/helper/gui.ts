import { GUI } from 'dat.gui';
import { sCoord } from '~/scripts/system';

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

