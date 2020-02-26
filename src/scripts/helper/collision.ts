import { Vector2, Line2D, Segment2D, Circle2D } from 'math-lab';
import { AABB2D } from 'math-lab/dist/Primitive2D';

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
export interface ISourceSegmentAndPoint {
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
export const getSourceSegmentAndPoint = (
  seg:Segment2D, 
  p:Vector2, 
  bias:number
):ISourceSegmentAndPoint => {
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
 * 点と円
 */
export const isHitCircleAndPoint = (circle:Circle2D, p:Vector2) => {
  const v = Vector2.sub(circle.p, p);
  return (v.magnitude < circle.r);
}

/**
 * 円と円
 */
export const isHitCircleAndCircle = (c1:Circle2D, c2:Circle2D) => {
  const v = Vector2.sub(c1.p, c2.p);
  return (v.magnitude < (c1.r + c2.r));
}

/**
 * 円と円の衝突に関する情報を取得
 */
export interface ISourceCircleAndCircle {
  len  :number;  // ２円の距離
  isHit:boolean; // 衝突結果
  isContain:boolean; // 一方の円に内包されているかどうか
  line:Line2D|null; // 交点を結ぶ線
  source:ISourceCircleAndLine|null;
}
export const getSourceCircleAndCircle = (
  c1:Circle2D, 
  c2:Circle2D
):ISourceCircleAndCircle => {

  const v = Vector2.sub(c1.p, c2.p);
  const len = v.magnitude;
  const isHit = (len < (c1.r + c2.r));
  const isContain = (len < Math.abs(c1.r - c2.r));

  if (!isHit) {
    return { len, isHit, isContain, line:null, source:null}
  }

  // 円の方程式の連立方程式
  const m = (-2 * c1.p.y) - (-2 * c2.p.y);
  const l = (-2 * c1.p.x) - (-2 * c2.p.x);
  const n = (c1.p.x**2 + c1.p.y**2 - c1.r**2) - (c2.p.x**2 + c2.p.y**2 - c2.r**2);

  // x=0の時、x=1の時の座標を取得
  const p1 = new Vector2(0, -n/m);
  const p2 = new Vector2(1, (-l -n)/m);

  // line2Dを生成
  const line = new Line2D(p1, Vector2.sub(p2, p1).normalize)

  const source = getSourceCircleAndLine(c1, line);

  return { len, isHit, isContain, line, source}
}

/**
 * 円と線
 */
export const isHitCircleAndLine = (circle:Circle2D, line:Line2D) => {
  // 線上の点から円の中心点に向かうベクトル
  const v1 = Vector2.sub(circle.p, line.p);

  // 線の方向ベクトル(正規化)とv1で外積を取り
  // 外積 < 円の半径だったら衝突
  const cross = Vector2.cross(line.v, v1);

  return (Math.abs(cross) < circle.r);
}

/**
 * 円と線の衝突に関する情報を取得
 */
export interface ISourceCircleAndLine {
  dot  :number,  // 内積
  cross:number,  // 外積
  isHit:boolean, // 衝突結果
  near :Vector2, // 円と直線の最近傍点
  pos1 :Vector2, // 衝突位置
  pos2 :Vector2, // 衝突位置
}

export const getSourceCircleAndLine = (
  circle:Circle2D,
  line:Line2D
):ISourceCircleAndLine => {
  // 線上の点から円の中心点に向かうベクトル
  const v1 = Vector2.sub(circle.p, line.p);
  // 線の方向ベクトルとv1の内積と外積
  const dot = Vector2.dot(line.v, v1);
  const cross = Vector2.cross(line.v, v1);

  // 外積 < 半径だったら当たってる
  const isHit = Math.abs(cross) < circle.r;

  // 最近傍点をHとすると、線の起点の位置から方向ベクトルをdotの値だけ伸ばした点
  const near = line.getPoint(dot);

  // 衝突点
  const len = Math.sqrt(circle.r**2 - cross**2);
  const pos1 = Vector2.add(near, Vector2.times(line.v, len));
  const pos2 = Vector2.add(near, Vector2.times(line.v, -len));

  return { dot, cross, isHit, near, pos1, pos2 }
}

/**
 * AABB同士の衝突判定
 */
export const isHitAABBAndAABB = (o1:AABB2D, o2:AABB2D) => {
  if ((Math.abs(o1.c.x - o2.c.x) > (o1.rx + o2.rx))) return false;
  if ((Math.abs(o1.c.y - o2.c.y) > (o1.ry + o2.ry))) return false;
  return true;
}