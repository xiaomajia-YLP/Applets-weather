const QQ_MAP_KEY = 'SOBBZ-xxxx-xxxx-xxxx-xxxx-VKBID'

// 填写 env
wx.cloud.init({
    env: 'yun-xxxx-xxxx'
})

/**
 * 获取地理定位--逆地址查询
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
      success,
      fail
    })
  }