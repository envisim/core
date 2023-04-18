export const createTable = (...arrs: number[][]): number[][] => {
  const c = [];
  for (let i = 0; i < arrs[0].length; i++) {
    c.push(arrs.map((e) => e[i]));
  }
  return c;
};
