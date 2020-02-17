/**
 * 小数点第何位を指定して使者五入
 * @param num 
 * @param fixed 切り上げる桁数
 */
export const round = (num:number, fixed:number = 1) => {
  const fix = 10 ** fixed;
  return Math.round(num * fix) / fix;
}