/**
 * 將Action附加上Promise輔助功能讓Saga與dispatch流程中使用
 * 這不是一個pure function
 * 使用shallow複製原始的Action，但原本目的就是針對Action硬附加Promise，應該還好
 * @export
 * @param {Object} obj
 * @returns {Object}
 */
export default function appendPromise(obj) {
  if (obj === null) throw new Error('appendPromise needs an Object');
  if (typeof obj !== 'object') throw new Error('appendPromise needs an Object');
  if (obj.Promise !== undefined) throw new Error('Object already has propertyName "Promise"');
  if (obj.resolve !== undefined) throw new Error('Object already has propertyName "resolve"');
  if (obj.reject !== undefined) throw new Error('Object already has propertyName "reject"');
  // shallow clone 淺複製
  const objClone = { ...obj };
  objClone.then = (resolve, reject) => {
    objClone.resolve = resolve;
    objClone.reject = reject;
  };
  objClone.Promise = Promise.race([objClone]);
  return objClone;
}
