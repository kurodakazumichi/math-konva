/**
 * 小数点第何位を指定して使者五入
 * @param num 
 * @param fixed 切り上げる桁数
 */
export const round = (num:number, fixed:number = 1) => {
  const fix = 10 ** fixed;
  return Math.round(num * fix) / fix;
}

/**
 * Enumの要素数を返す
 * Enumはkey, valueの２種類の同列に持つのでenumの要素数は定義数の2倍になっている
 * なので単純に2で割れば列挙数になる(はず)
 * @param e 列挙型
 */
export const enumLength = <T>(e:T) => {
  return Object.values(e).length / 2;
}

/** min <= no <= max */
export const cramp = (no:number, min:number, max:number) => {
  no = Math.min(no, max);
  no = Math.max(no, min);
  return no;
}