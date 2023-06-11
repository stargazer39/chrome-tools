export function getKey(obj: any, path: number[]): any {
  let o = obj;
  let strPath = [];

  for (const key of path) {
    strPath.push(o[key].title);
    o = o[key].children;
  }

  return [o, strPath];
}

export function setKey(
  obj: any,
  path: string[],
  bkmark: { name: string; url: string }
): any {
  let o = obj;

  for (const key of path) {
    if (!o[key]?.children) {
      o[key].name = path;
      o[key].children = [];
    }
    o = o[key].children;
  }

  o.push(bkmark);
  return o;
}
/* 
function _getKey(obj: any, index: number) {
  return obj[index].children;
}
 */
