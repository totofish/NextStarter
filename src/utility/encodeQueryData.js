/**
 * EncodeQueryData
 * Usage: EncodeQueryData({id: 1, search: 'key'});
 *
 * @param  Object data  物件資料
 * @return String       e.q. 'id=1&search=key'
 */
export default function encodeQueryData(data) {
  return Object.keys(data).map(key => ([key, data[key]].map(encodeURIComponent).join('='))).join('&');
}

/**
 * Get URL Query Data
 * @param  String 'id=1&t=1473175489888'
 * @return Object { id:'1', t:'1473175489888' }
 */
export function getUrlQuery(query = window.location.search.substring(1)) {
  let match;
  const pl = /\+/g;
  const search = /([^&=]+)=?([^&]*)/g;
  const decode = s => decodeURIComponent(s.replace(pl, ' '));
  const urlParams = {};
  while (match = search.exec(query)) urlParams[decode(match[1])] = decode(match[2]); // eslint-disable-line no-cond-assign, max-len
  return urlParams;
}
