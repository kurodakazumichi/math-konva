import GroupBase from './GroupBase';
import { sShape } from '~/scripts/system';

import Grid from '~/scripts/node/group/Grid';
import Triangle from '~/scripts/node/group/Triangle';
import Line from '~/scripts/node/group/Line';
import Segment from '~/scripts/node/group/Segment';
import Circle from '~/scripts/node/group/Circle';
import Vector from '~/scripts/node/group/Vector';
import AABB from '~/scripts/node/group/AABB';

/** Axis */
export class AxisXY extends GroupBase{
  constructor() {
    super();
    this
      .add(sShape.axisX())
      .add(sShape.axisY());
  }
}

export { Grid, Triangle, Line, Segment, Circle, Vector, AABB }