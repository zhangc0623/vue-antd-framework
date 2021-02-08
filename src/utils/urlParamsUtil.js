/**
 * 匹配url后面的关于某字段的值
 * @param url
 * @param param
 * @returns {Promise<string|string[]>}
 */
export async function getUrlParam (url = '', param = '') {
  let result = ''

  // 比如取得"name"这个字段的参数
  if (!url || !param) {
    return ''
  }

  // result = new URLSearchParams(url).get(param); // 内置api方法实现

  // 方法二
  let _a =
    url.split('?').length > 1
      ? url
        .replace('?', '?&')
        .split('?')
        .join()
        .replace(/&/g, '&&&')
        .split('&&')
      : [url] // 这里取数组第一个参数后的内容
  _a.length > 1 ? (_a = _a.slice(1)) : (_a = [])
  _a.forEach(item => {
    if (item.indexOf(param + '=') > -1) {
      result = item.split('=')[1]
    }
  })

  // 方法三 正则表达式匹配
  // 匹配 ? or & 之后的内容
  // result = url.match(/(?<=elective=)(\d+(,\d+)*)/);

  return result.split(',').length === 1
    ? result.split(',')[0] === ''
      ? []
      : result.split(',')
    : result.split(',')
}
