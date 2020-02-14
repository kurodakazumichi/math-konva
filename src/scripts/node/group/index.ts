import GroupBase from './GroupBase';
import { sShape } from '~/scripts/system';

import Grid from '~/scripts/node/group/Grid';

/** Axis */
export class AxisXY extends GroupBase{
  constructor() {
    super();
    this
      .add(sShape.axisX())
      .add(sShape.axisY());
  }
}

export { Grid }