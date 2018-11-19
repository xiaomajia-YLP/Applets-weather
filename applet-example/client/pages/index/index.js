/*<remove trigger="prod">*/
import {
  geocoder
} from '../../lib/api'

/*</remove>*/

/*<jdists trigger="prod">

</jdists>*/

//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    bgColor: '#5F7A95',
    bgImage: '',
    paddingTop: '',
    address: '杭州市西湖区纪检委(浙大路南)',
    lat: '30.25961',
    lon: '120.13026',
    // 实时天气
    current: {
      icon: 'yin',
      temp: '16',
      weather: '阴',
      wet: '79%',
      wind: '西北风 3级',
      tips: '现在的温度比较凉爽哦~'
    },
    // 空气质量
    air: {
      qualityColor: '#1BBA99',
      quality: '优',
      score: '33'
    },
    // 今日天气
    today: {
      temperature: '13/16°',
      icon: 'yin',
      weather: '阴'
    },
    // 明日天气
    tomorrow: {
      temperature: '12/16°',
      icon: 'xiaoyu',
      weather: '小雨'
    },
    // 24小时天气
    hourlyData: [{
      time: '8:00',
      icon: 'yin',
      temp: '11'
    }, {
      time: '8:00',
      icon: 'yin',
      temp: '11'
    }, {
      time: '8:00',
      icon: 'yin',
      temp: '11'
    }, {
      time: '8:00',
      icon: 'yin',
      temp: '11'
    }, {
      time: '8:00',
      icon: 'yin',
      temp: '11'
    }, {
      time: '8:00',
      icon: 'yin',
      temp: '11'
    }, {
      time: '8:00',
      icon: 'yin',
      temp: '11'
    }, {
      time: '8:00',
      icon: 'yin',
      temp: '11'
    }],
    // 每周天气
    weeklyData: [{
      date: '今天',
      dayTemp: '15',
      dayIcon: 'yin',
      dayWeather: '阴',
      nightTemp: '11',
      nightWeather: '阴',
      nightIcon: 'yin',
      wind: '西北风',
      windInfo: '4-5级'
    }, {
      date: '明天',
      dayTemp: '15',
      dayIcon: 'yin',
      dayWeather: '阴',
      nightTemp: '11',
      nightWeather: '阴',
      nightIcon: 'yin',
      wind: '西北风',
      windInfo: '4-5级'
    }, {
      date: '后天',
      dayTemp: '15',
      dayIcon: 'yin',
      dayWeather: '阴',
      nightTemp: '11',
      nightWeather: '阴',
      nightIcon: 'yin',
      wind: '西北风',
      windInfo: '4-5级'
    }, {
      date: '周一',
      dayTemp: '15',
      dayIcon: 'yin',
      dayWeather: '阴',
      nightTemp: '11',
      nightWeather: '阴',
      nightIcon: 'yin',
      wind: '西北风',
      windInfo: '4-5级'
    }, {
      date: '周二',
      dayTemp: '15',
      dayIcon: 'yin',
      dayWeather: '阴',
      nightTemp: '11',
      nightWeather: '阴',
      nightIcon: 'yin',
      wind: '西北风',
      windInfo: '4-5级'
    }, {
      date: '周三',
      dayTemp: '15',
      dayIcon: 'yin',
      dayWeather: '阴',
      nightTemp: '11',
      nightWeather: '阴',
      nightIcon: 'yin',
      wind: '西北风',
      windInfo: '4-5级'
    }, {
      date: '周四',
      dayTemp: '15',
      dayIcon: 'yin',
      dayWeather: '阴',
      nightTemp: '11',
      nightWeather: '阴',
      nightIcon: 'yin',
      wind: '西北风',
      windInfo: '4-5级'
    }],
    lifeStyle: [{
      icon: 'yin',
      name: '舒适度',
      info: '舒适'
    }, {
      icon: 'yin',
      name: '舒适度',
      info: '舒适'
    }, {
      icon: 'yin',
      name: '舒适度',
      info: '舒适'
    }, {
      icon: 'yin',
      name: '舒适度',
      info: '舒适'
    }, {
      icon: 'yin',
      name: '舒适度',
      info: '舒适'
    }, {
      icon: 'yin',
      name: '舒适度',
      info: '舒适'
    }, {
      icon: 'yin',
      name: '舒适度',
      info: '舒适'
    }, {
      icon: 'yin',
      name: '舒适度',
      info: '舒适'
    }, ]
  },
  /**
   * 获取地理定位--处理逆地址
   * xiaomajia 2018.11.19
   * @param {*} lat
   * @param {*} lon
   * @param {*} name
   */
  getAddress(lat, lon, name) {
    wx.showLoading({
      title: '定位中',
      mask: true
    })
    let fail = (e) => {
      console.log('geocoder:fail --- res')
      console.log(e)
      this.setData({
        address: name || '杭州市西湖区文三西路'
      })
      wx.hideLoading()
      // this.getWeatherData()
    }
    geocoder(
      lat,
      lon,
      (res) => {
        console.log('geocoder:success --- res');
        console.log(res);
        wx.hideLoading()
        let result = (res.data || {}).result
        // console.log(1, res, result)
        if (res.statusCode === 200 && result && result.address) {
          let {
            address,
            formatted_addresses,
            address_component
          } = result
          if (formatted_addresses && (formatted_addresses.recommend || formatted_addresses.rough)) {
            address = formatted_addresses.recommend || formatted_addresses.rough
          }
          let {
            province,
            city,
            district: county
          } = address_component
          this.setData({
            province,
            county,
            city,
            address: name || address
          })
          // this.getWeatherData()
        } else {
          //失败
          fail()
        }
      },
      fail
    )
  },
  /**
   * 获取地理定位--经纬度获取成功，更新data数据，调用 getAddress
   * xiaomajia 2018.11.19
   */
  updateLocation(res) {
    console.log('wx.getLocation:success ---- res');
    console.log(res);

    let {
      latitude: lat,
      longitude: lon,
      name
    } = res
    let data = {
      lat,
      lon
    }
    if (name) {
      data.address = name
    }
    this.setData(data)
    this.getAddress(lat, lon, name)
  },
  /**
   * 获取地理定位--调用wx.getLocation获取经纬度
   * xiaomajia 2018.11.19
   */
  getLocation() {
    wx.getLocation({
      type: 'gcj02',
      success: this.updateLocation,
      fail: (e) => {
        console.log('wx.getLocation:fail ---- e');
        console.log(e);
        this.openLocation()
      }
    })
  },
  /**
   * 获取地理定位--获取坐标失败，提示用户打开位置权限
   * xiaomajia 2018.11.19
   */
  openLocation() {
    wx.showToast({
      title: '检测到您未授权使用位置权限，请先开启哦',
      icon: 'none',
      duration: 3000
    })
  },
  /**
   * 获取天气信息 -- 和风天气api
   * xiaomajia 2018.11.19
   */
  getWeatherData() {
    wx.showLoading({
      title: '获取数据中',
      mask: true
    })
    const fail = (e) => {
      wx.hideLoading()
      if (typeof cb === 'function') {
        cb()
      }
      wx.showToast({
        title: '加载失败，请稍后再试',
        icon: 'none',
        duration: 3000
      })
    }
    const { lat, lon, province, city, county } = this.data
    getWeather(lat, lon).then((res) => {
        wx.hideLoading()
        if (typeof cb === 'function') {
          cb()
        }
        if (res.result) {
          this.render(res.result)
        } else {
          fail()
        }
      })
      .catch(fail)
  },
  onLoad: function () {
    /**
     * 获取系统信息
     * -- 获取不同移动设备下的导航栏高度实现顶部适配
     * xiaomajia 2018.11.19
     */
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          paddingTop: res.statusBarHeight + 12
        })
      }
    })
    // 获取地理定位
    this.getLocation()
  },
})
