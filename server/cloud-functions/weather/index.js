const API_URL = 'https://free-api.heweather.com/s6/weather'
const request = require('request')

/*<jdists import="../../inline/utils.js" />*/
// 普通 mock server 的代码直接将 utils 库当模块引入
/*<remove>*/
const $ = require('../../inline/utils')
/*</remove>*/

// 按照云函数的规定，必须导出 main 函数
exports.main = async (event) => {
  const {
    lat,
    lon
  } = event
  let location = `${lat},${lon}`
  let params = {
    location,
    t: Math.floor(Date.now() / 1e3),
    unit: 'm'
  }
  // 生成签名
  params.sign = $.generateSignature(params)
  let query = []
  for (let i in params) {
    query.push(`${i}=${encodeURIComponent(params[i])}`)
  }
  let url = API_URL + '?' + query.join('&')
  return new Promise((resolve, reject) => {
    request.get(url, (error, response, body) => {
      if (error || response.statusCode !== 200) {
        reject(error)
      } else {
        // 统一处理接口返回的数据
        try {
          let rs = $.handlerData(JSON.parse(body))
          resolve(rs)
        } catch (e) {
          reject(e)
        }
      }
    })
  })
}
