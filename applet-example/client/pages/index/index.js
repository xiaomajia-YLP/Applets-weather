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
      day: '今天',
      temp: '11/15',
      weather: '阴',
      icon: 'yin'
    }, {
      day: '明天',
      temp: '11/15',
      weather: '阴',
      icon: 'yin'
    }, {
      day: '后天',
      temp: '11/15',
      weather: '阴',
      icon: 'yin'
    }, {
      day: '周一',
      temp: '11/15',
      weather: '阴',
      icon: 'yin'
    }, {
      day: '周二',
      temp: '11/15',
      weather: '阴',
      icon: 'yin'
    }, {
      day: '周三',
      temp: '11/15',
      weather: '阴',
      icon: 'yin'
    }, {
      day: '周四',
      temp: '11/15',
      weather: '阴',
      icon: 'yin'
    }],
    
  },

  onLoad: function () {

  }
})
