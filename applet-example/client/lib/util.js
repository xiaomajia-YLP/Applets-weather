const crypto = require('crypto')
const KEY = '1e403936fae548319ed365f6de87ff8b'
const USER_ID = 'HE1811191156511957'

const $ = {
  generateSignature: (params) => {
    params.username = USER_ID
    let data =
      Object.keys(params)
      .filter((key) => {
        return params[key] !== '' && key !== 'sign' && key !== 'key'
      })
      .sort()
      .map((key) => {
        return `${key}=${params[key]}`
      })
      .join('&') + KEY
    return crypto.createHash('md5').update(data).digest('base64')
  },
}


module.exports = $
