/**
 * 將Action附加上Promise輔助功能讓Saga與dispatch流程中使用
 * 
 * @export
 * @param {Object} obj 
 * @returns {Object}
 */
export default function appendPromise(obj) {
  if (obj === null) throw new Error('appendPromise needs an Object');
  if (typeof obj !== 'object') throw new Error('appendPromise needs an Object');
  if(obj.Promise !== undefined) throw new Error('Object already has propertyName "Promise"');
  if(obj.resolve !== undefined) throw new Error('Object already has propertyName "resolve"');
  if(obj.reject !== undefined) throw new Error('Object already has propertyName "reject"');
  obj.then = (resolve, reject) => {
    obj.resolve = resolve;
    obj.reject = reject;
  }
  obj.Promise = Promise.race([obj]);
  return obj;
}