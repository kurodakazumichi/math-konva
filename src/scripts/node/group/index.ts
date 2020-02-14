import GroupBase from './GroupBase';
import { sShape } from '~/scripts/system';

/** Axis */
export class Axis extends GroupBase{
  constructor() {
    super();
    this.node.add(sShape.axisX().node).add(sShape.axisY().node);
  }
}