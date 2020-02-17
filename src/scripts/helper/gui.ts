import { GUI } from 'dat.gui';
import { sCoord } from '~/scripts/system';

const DEFAULT_STEP = 0.1;

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