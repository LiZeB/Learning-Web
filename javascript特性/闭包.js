// 闭包漏洞
var func = (function() {
  var obj = {
    a: 1,
    b: 2
  }

  return function(key) {
    return obj[key]
    // return obj[key]()
  }
})()

var res

res = func('h')
console.log('res', res)

// 直接修改原型属性
Object.defineProperty(Object.prototype, 'm', {
  value: 3,
  enumerable: true,
  configurable: true,
  writable: true
})
res = func('m')
console.log('res', res)

// valueOf获取对象本身,注意this指向
const _valueOf = Object.prototype.valueOf
console.log('valueOf', {a:1, b:2}.valueOf())

// 通过访问器属性访问对象
Object.defineProperty(Object.prototype, 'n', {
  get() {
    console.log('this', this)
    return this
  },
  set(val) {
    
  },
  enumerable: true,
  configurable: true
})

res = func('valueOf')

res = func('n')
res['test'] = 'aaaa'
console.log('res', res)

