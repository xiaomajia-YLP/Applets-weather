import {
  fixChart,
  getChartConfig,
  drawEffect
} from '../../lib/util'
import Chart from '../../lib/chartjs/chart'
/*<remove trigger="prod">*/
import {
  geocoder,
  getWeather,
  getAir,
  getMood
} from '../../lib/api'
// import {
//   getWeather,
//   getAir
// } from '../../lib/api-mock'
/*<jdists trigger="prod">

</jdists>*/

//index.js
//获取应用实例
const app = getApp()
let isUpdate = false
let effectInstance
const EFFECT_CANVAS_HEIGHT = 768 / 2
const CHART_CANVAS_HEIGHT = 272 / 2

Page({
  data: {
    paddingTop: '',
    statusBarHeight: 32,
    backgroundColor: '#62aadc',
    backgroundImage: '../../images/cloud.jpg',
    lat: 30.2686,
    lon: 120.09679,
    address: '定位中…',
    city: '杭州市',
    width: 375,
    scale: 1,
    // 实时天气
    current: {
      temp: '0',
      weather: '数据获取中…',
      humidity: '1',
      icon: 'xiaolian'
    },
    // 空气质量
    air: {
      qualityColor: '#1BBA99',
      quality: '优',
      score: '33'
    },
    // 今日天气
    today: {
      temp: 'N/A',
      weather: '暂无'
    },
    // 明日天气
    tomorrow: {
      temp: 'N/A',
      weather: '暂无'
    },
    // 24小时天气
    hourlyData: [],
    // 每周天气
    weeklyData: [],
    // 生活指数
    lifeStyle: [],
    // 底部提示
    oneWord: ''
  },
  /**
   * 获取地理定位--处理逆地址
   * xiaomajia 2018.11.19
   * @param {*} lat 纬度
   * @param {*} lon 经度
   * @param {*} name 地点
   */
  getAddress(lat, lon, name) {
    wx.showLoading({
      title: '定位中',
      mask: true
    })
    let fail = (e) => {
      // console.log('geocoder:fail --- res')
      // console.log(e)
      this.setData({
        address: name || '杭州市西湖区文三西路'
      })
      wx.hideLoading()
      this.getWeatherData()
    }
    geocoder(
      lat,
      lon,
      (res) => {
        // console.log('geocoder:success --- res');
        // console.log(res);
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
          this.getWeatherData()
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
   * @param {*} res 定位数据
   */
  updateLocation(res) {
    // console.log('wx.getLocation:success ---- res');
    // console.log(res);
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
        // console.log('wx.getLocation:fail ---- e');
        // console.log(e);
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
   * 手动点击选择地理位置
   * xiaomajia 2018.11.21
   */
  chooseLocation() {
    wx.chooseLocation({
      success: (res) => {
        let {
          latitude,
          longitude
        } = res
        console.log(res);

        let {
          lat,
          lon
        } = this.data
        if (latitude == lat && lon == longitude) {
          this.getWeatherData()
        } else {
          this.updateLocation(res)
        }
      }
    })
  },
  /**
   * 获取天气信息 -- 和风天气api
   * xiaomajia 2018.11.19
   * @param {*} cb callback回调处理函数
   */
  getWeatherData(cb) {
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
    const {
      lat,
      lon,
      province,
      city,
      county
    } = this.data
    getWeather(lat, lon)
      .then((res) => {
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
      .catch((res) => {
        console.log(res);
      })
    // 获取空气质量
    getAir(city)
      .then((res) => {
        if (res && res.result) {
          this.setData({
            air: res.result
          })
        }
      })
      .catch((e) => {})

    // 获取心情
    getMood(province, city, county, (res) => {
      let result = (res.data || {}).data
      if (result && result.tips) {
        let tips = result.tips.observe
        let index = Math.floor(Math.random() * Object.keys(tips).length)
        tips = tips[index]
        this.setData({
          tips
        })
      }
    })
  },
  /**
   * 渲染天气数据及背景图片、颜色
   * xiaomajia 2018.11.21
   * @param {*} data 具体数据
   */
  render(data) {
    isUpdate = true
    console.log(data)
    const {
      width,
      scale
    } = this.data
    const {
      hourly,
      daily,
      current,
      lifeStyle,
      oneWord = '',
      effect
    } = data
    const {
      backgroundColor,
      backgroundImage
    } = current

    const _today = daily[0],
      _tomorrow = daily[1]
    const today = {
      temp: `${_today.minTemp}/${_today.maxTemp}°`,
      icon: _today.dayIcon,
      weather: _today.day
    }
    const tomorrow = {
      temp: `${_tomorrow.minTemp}/${_tomorrow.maxTemp}°`,
      icon: _tomorrow.dayIcon,
      weather: _tomorrow.day
    }
    this.setData({
      hourlyData: hourly,
      weeklyData: daily,
      current,
      backgroundImage,
      backgroundColor,
      today,
      tomorrow,
      oneWord,
      lifeStyle
    })
    this.stopEffect()

    if (effect && effect.name) {
      effectInstance = drawEffect('effect', effect.name, width, EFFECT_CANVAS_HEIGHT * scale, effect.amount)
    }
    // 延时画图
    this.drawChart()
    // 缓存数据
    this.dataCache()
  },
  /**
   * 生活指数-点击查看详情
   * xiaomajia 2018.11 .21
   * @param {*} e
   */
  lifeDetail(e) {
    const {
      name,
      detail
    } = e.currentTarget.dataset
    wx.showModal({
      title: name,
      content: detail,
      showCancel: false
    })
  },
  onLoad: function () {
    // 获取系统信息  -- 获取不同移动设备下的导航栏高度实现顶部适配
    wx.getSystemInfo({
      success: (res) => {
        let width = res.windowWidth
        let scale = width / 375
        // console.log(scale * res.statusBarHeight*2+24)
        this.setData({
          width,
          scale,
          paddingTop: res.statusBarHeight + 12
        })
      }
    })
    // 获取天气数据
    const pages = getCurrentPages() //获取加载的页面
    const currentPage = pages[pages.length - 1] //获取当前页面的对象
    const query = currentPage.options
    // 如果有地址，经纬度信息
    if (query && query.address && query.lat && query.lon) {
      let {
        province,
        city,
        county,
        address,
        lat,
        lon
      } = query
      // 取出这些数据，设置页面data
      // 利用setData的callback，保证数据设置完成后，获取天气信息
      this.setData({
          city,
          province,
          county,
          address,
          lat,
          lon
        },
        () => {
          this.getWeatherData()
        }
      )
    } else {
      // 获取缓存数据
      this.setDataFromCache()
      // 否则，正常逻辑：先获取地址，再获取天气数据
      this.getLocation()
    }
  },
  onPullDownRefresh() {
    this.getWeatherData(() => {
      wx.stopPullDownRefresh()
    })
  },
  /**
   * 设置小程序分享格式
   * @returns 分享格式
   */
  onShareAppMessage() {
    if (!isUpdate) {
      return {
        title: '我发现一个好玩的天气小程序，分享给你看看！',
        path: '/pages/weather/index'
      }
    } else {
      const {
        lat,
        lon,
        address,
        province,
        city,
        county
      } = this.data
      let url = `/pages/weather/index?lat=${lat}&lon=${lon}&address=${address}&province=${province}&city=${city}&county=${county}`

      return {
        title: `「${address}」现在天气情况，快打开看看吧！`,
        path: url
      }
    }
  },
  /**
   * 动画-stop
   * xiaomajia 2018.00.21
   */
  stopEffect() {
    if (effectInstance && effectInstance.clear) {
      effectInstance.clear()
    }
  },
  /**
   * 缓存数据到storage
   * xiaomajia 2018.11.21
   */
  dataCache() {
    const {
      current,
      backgroundColor,
      backgroundImage,
      today,
      tomorrow,
      address,
      tips,
      hourlyData
    } = this.data
    wx.setStorage({
      key: 'defaultData',
      data: {
        current,
        backgroundColor,
        backgroundImage,
        today,
        tomorrow,
        address,
        tips,
        hourlyData
      }
    })
  },
  /**
   * 从缓存storage中获取数据
   * xiaomajia 2018.11.21
   */
  setDataFromCache() {
    wx.getStorage({
      key: 'defaultData',
      success: ({
        data
      }) => {
        if (data && !isUpdate) {
          // 存在并且没有获取数据成功，那么可以给首屏赋值上次数据
          const {
            current,
            backgroundColor,
            backgroundImage,
            today,
            tomorrow,
            address,
            tips,
            hourlyData
          } = data
          this.setData({
            current,
            backgroundColor,
            backgroundImage,
            today,
            tomorrow,
            address,
            tips,
            hourlyData
          })
        }
      }
    })
  },
  /**
   * 绘制折线图
   * xiaomajia 2018.11.21
   * @returns
   */
  drawChart() {
    const {
      width,
      scale,
      weeklyData
    } = this.data
    let height = CHART_CANVAS_HEIGHT * scale
    let ctx = wx.createCanvasContext('chart')
    fixChart(ctx, width, height)
    // 添加温度
    Chart.pluginService.register({
      afterDatasetsDraw(e, t) {
        ctx.setTextAlign('center')
        ctx.setTextBaseline('middle')
        ctx.setFontSize(16)
        e.data.datasets.forEach((t, a) => {
          let r = e.getDatasetMeta(a)
          r.hidden ||
            r.data.forEach((e, r) => {
              // 昨天数据发灰
              ctx.setFillStyle(r === 0 ? '#e0e0e0' : '#ffffff')

              let i = t.data[r].toString() + '\xb0'
              let o = e.tooltipPosition()
              0 == a ? ctx.fillText(i, o.x + 2, o.y - 8 - 10) : 1 == a && ctx.fillText(i, o.x + 2, o.y + 8 + 10)
            })
        })
      }
    })
    return new Chart(ctx, getChartConfig(weeklyData))
  }
})
