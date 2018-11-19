/*<remove trigger="prod">*/

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
    address: '杭州市西湖区文新街道',
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

  onLoad: function () {
    /**
     * 获取系统信息
     * -- 获取不同移动设备下的导航栏高度实现顶部适配
     * xiaomajia 
     */
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          paddingTop: res.statusBarHeight + 12
        })
      }
    })
  }
})
