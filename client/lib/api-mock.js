import Promise from './bluebird'
const QQ_MAP_KEY = 'SOBBZ-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX'

/**
 *  逆经纬度查询
 * @param {*} lat
 * @param {*} lon
 */
export const geocoder = (lat, lon, success = () => {}, fail = () => {}) => {
  return wx.request({
    url: 'https://apis.map.qq.com/ws/geocoder/v1/',
    data: {
      location: `${lat},${lon}`,
      key: QQ_MAP_KEY,
      get_poi: 0
    },
    success: success,
    fail: fail
  })
  // return wx.cloud.callFunction({
  //   name: 'geocoder',
  //   data: {
  //     lat,
  //     lon
  //   }
  // })
  //
  // return $.request({
  //   url: SERVER_URL + '/api/geocoder',
  //   data: {
  //     location: `${lat},${lon}`
  //   }
  // })
}

export const getWeather = (lat, lon) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'http://127.0.0.1:3000/api/weather',
      data: {
        lat,
        lon
      },
      success: (res) => {
        resolve({
          result: res.data
        })
      },
      fail: (e) => {
        reject(e)
      }
    })
  })
}

export const jscode2session = (code) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'http://127.0.0.1:3000/api/jscode2session',
      data: {
        code
      },
      success: (res) => {
        resolve({
          result: res.data
        })
      },
      fail: reject
    })
  })
}
export const getAir = (city) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'http://127.0.0.1:3000/api/air',
      data: {
        city
      },
      success: (res) => {
        resolve({
          result: res.data
        })
      },
      fail: (e) => {
        reject(e)
      }
    })
  })
}
