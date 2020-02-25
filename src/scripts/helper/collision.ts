import { Vector2, Line2D, Segment2D, Circle2D } from 'math-lab';

/**
 * 点と点
 */
export const isHitPointAndPoint = (p1:Vector2, p2:Vector2, bias:number) => {
  return (Vector2.sub(p1, p2).magnitude < bias);
}

/**
 * 線と点
 */
export const isHitLineAndPoint = (line:Line2D, p:Vector2, bias:number) => {
  // 線分から点に向かうベクトル
  const v1 = Vector2.sub(p, line.p);

  // 線分の方向ベクトルとの外積
  const cross = Vector2.cross(line.v, v1);

  return (cross < bias);
}

/**
 * 線と点の衝突に関する情報を取得する
 */
export interface ISourceLineAndPoint {
  v1:Vector2,
  cross:number,
  dot:number,
  perp:Vector2,
  isHit:boolean,
}
export const getSourceLineAndPoint = (line:Line2D, p:Vector2, bias:number):ISourceLineAndPoint => {
  // 線分から点に向かうベクトル
  const v1 = Vector2.sub(p, line.p);
  // 外積と内積
  const cross = Vector2.cross(line.v, v1);
  const dot   = Vector2.dot(line.v, v1);
  // v1からlineに落とした垂線の位置
  const perp  = line.getPoint(dot);
  // 衝突
  const isHit   = (Math.abs(cross) < bias);
  return { v1, cross, dot, perp, isHit }
}

/**
 * 線分と点
 */
export const isHitSegmentAndPoint = (seg:Segment2D, p:Vector2, bias:number) => {
  const { p1, p2 } = seg;
  // 線分のベクトル
  const v1 = Vector2.sub(p2, p1);
  const l1 = v1.magnitude;
  // 線分の始点から点に向かうベクトル
  const v2 = Vector2.sub(p, p1);
  const l2 = v2.magnitude;
  // 内積
  const dot = Vector2.dot(v1, v2);

  return (l2 <= l1) && (l1 * l2 - dot) < bias;
}

/**
 * 線分と点の衝突に関する情報を取得
 */
export interface ICollisionSource {
  v1:Vector2,    // 始点から点Pへ向かうベクトル
  v2:Vector2,    // 始点から終点へ向かうベクトル
  l1:number,     // v1の長さ
  l2:number,     // v2の長狭
  dot:number,    // v1・v2(v1は正規化)
  pos:Vector2,   // 衝突位置
  isHit:boolean, // 衝突結果
}
/**
 * 線分と点
 */
export const getSourceSegmentAndPoint = (seg:Segment2D, p:Vector2, bias:number) => {
  const { p1, p2 } = seg;
  // 線分のベクトル
  const v1 = Vector2.sub(p2, p1);
  const l1 = v1.magnitude;
  // 線分の始点から点に向かうベクトル
  const v2 = Vector2.sub(p, p1);
  const l2 = v2.magnitude;
  // 正規化した結果とその内積
  const nv = v1.normalize;
  const dot = Vector2.dot(nv, v2);
  const pos = Vector2.add(p1, nv.times(dot));
  // 衝突結果
  const isHit = (l2 <= l1) && (l1 * l2 - dot) < bias;
  return { v1, v2, l1, l2, dot, pos, isHit }
}

/**
 * 線分と点
 */
export const isHitCircleAndPoint = (circle:Circle2D, p:Vector2) => {
  const v = Vector2.sub(circle.p, p);
  return (v.magnitude < circle.r);
}