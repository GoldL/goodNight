const CronJob = require('cron').CronJob
const { todo } = require('./utils/index')

const Koa = require('koa')
const app = new Koa()
todo()

// new CronJob('00 30 23 * * *', () => {
//   console.log('You will see this message every second')
// }, null, true, 'Asia/Shanghai')

app.listen(4000)


