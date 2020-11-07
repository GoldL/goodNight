const nodemailer = require('nodemailer')
const https = require('https')
const querystring = require('querystring')
const config = require('../config/config')
const { GoodNight } = require('./goodNightModel')

const transporter = nodemailer.createTransport({
  service: 'qq', //类型qq邮箱
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: config.email.user, // 发送方的邮箱
    pass: config.email.pass // smtp 的授权码
  }
})

/**
 * 
 * @param {*} to 收件人
 * @param {*} subject 右键主题
 * @param {*} text 邮件文本内容
 * @param {*} html 邮件富文本
 */
function sendMail (text = '晚安', to = '1525922633@qq.com,760532048@qq.com,136895062@qq.com', subject = '【晚安计划】每天和你说一句晚安', html = '') {
  const mailOptions = {
    from: '"say I love you." <136895062@qq.com>',
    to,
    subject,
    text,
    html,
  }

  transporter.sendMail(mailOptions, (e) => {
    if (e) {
      console.log(e)
    }
  })
}

function sendSms (content = '晚安', mobile = '15905992320', appCode = 'fd77c927253245959c223c5b364db6c7') {
  let query = { content, mobile }
  query = querystring.stringify(query)
  const options = {
    hostname: "dxyzm.market.alicloudapi.com",
    port: 443, //443
    path: `/chuangxin/dxjk?${query}`,
    method: "POST",
    rejectUnauthorized: false,
    headers: {
      Accept: "*/*",
      "Accept-Encoding": "utf-8",
      "Accept-Language": "zh-CN,zh;q=0.8",
      Connection: "keep-alive",
      Host: "dxyzm.market.alicloudapi.com",
      Authorization: `APPCODE${appCode}`
    }
  }
  const req = https.request(options, res => {
    res.on('data', chunk => {
      console.log(chunk)
    })
  })
  req.on('error', e => {
    console.log(e)
  })
}
/**
 * 发送邮件并且短信
 */
async function todo () {
  const goodNight = await GoodNight.findOne({ where: { status: 1 } })
  const content = `第${goodNight.id}晚~ ${goodNight.content}`
  sendMail(content)
  goodNight.update({ status: 0 })
}

module.exports = {
  sendMail,
  todo
}