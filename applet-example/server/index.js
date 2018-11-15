const express = require('express')
const { PORT } = require('../config.server.json')
const app = express()

// 开启了一个端口号为 3000 的本地服务
app.listen(PORT, () => {
    console.log(`开发服务器启动成功：http://127.0.0.1:${PORT}`)
})

// 添加static：使用 express.static 将 server/static 目录设置为静态资源服务器：
app.use(
    '/static',
    express.static(path.join(__dirname, 'static'), {
        index: false,
        maxage: '30d'
    })
)

// 引入对应的模块，然后分配一个路由
const test = require('./cloud-functions/test/').main
app.get('/api/test', (req, res, next) => {
    // 将 req.query 传入
    test(req.query).then(res.json.bind(res)).catch((e) => {
        console.error(e)
        next(e)
    })
    // next()
})