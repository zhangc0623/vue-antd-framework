/**
 * 手动写一个localstorge存储
 */
export class mockLocalstorage {
  constructor () {
    this.store = new Map() // 记录存储数据
  }

  getItem (key) {
    const stringKey = String(key)
    if (this.store.has(stringKey)) {
      return String(this.store.get(stringKey))
    } else {
      return null
    }
  }

  // time单位是小时
  setItem (key, val, time = 'undefined') {
    let stime = null
    if (typeof time !== 'number' && time !== 'undefined') {
      throw new Error('设置过期时间的基础单位是小时，请不要破坏规则！')
    }

    if (time !== 'undefined') {
      time = time * 60 * 60 * 1000 // h ---> ms
      try {
        let _this = this
        // 设置定时器 定时清空垃圾数据
        stime = setTimeout(() => {
          _this.removeItem(key)
          stime = null
        }, time)
        this.store.set(String(key), val)
      } catch (e) {
        stime = null
        throw new Error(e)
      }
    }
  }

  keys () {
    return Object.keys(this.store)
  }

  removeItem (key) {
    this.store.delete(String(key))
  }

  clear () {
    this.store.clear()
  }

  get length () {
    return this.store.size
  }
}
