const CronJob = require('cron').CronJob
const { todo } = require('./utils/index')

const Koa = require('koa')
const app = new Koa()

new CronJob('00 30 23 * * *', () => {
  todo()
}, null, true, 'Asia/Shanghai')

app.listen(4000)


