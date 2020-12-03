const https = require('https')
const cheerio = require('cheerio')
const {
  GoodNight
} = require('./goodNightModel')

function crawler(url, callback) {
  https.get(url, (res => {
    let data = ''
    res.on('data', chunk => {
      data += chunk
    })
    res.on('end', () => {
      callback(data)
    })
  })).on('error', () => {
    callback(null)
  })
}

// const url = 'https://baijiahao.baidu.com/s?id=1600401539542362481&wfr=spider&for=pc'

// crawler(url, html => {
//   if (!html) {
//     console.log('爬取内容出错了')
//     return
//   }
//   const $ = cheerio.load(html)
//   $('.bjh-p', '#article').each(async (i, e) => {
//     const el = $(e)
//     let text = el.text()
//     if (text.includes('NO')) {
//       text = text.split('、')[1]
//       if (!text.includes('晚安')) {
//         text += '晚安！'
//       }
//       try {
//         const goodNight = { content: text }
//         await GoodNight.create(goodNight)
//       } catch(e) {
//         console.log(i, e)
//       }
//     }
//   })
// })

// const url = 'https://zhuanlan.zhihu.com/p/37383553'

// crawler(url, html => {
//   if (!html) {
//     console.log('爬取内容出错了')
//     return
//   }
//   const $ = cheerio.load(html)
//   $('p', '.Post-RichText').each(async (i, e) => {
//     const el = $(e)
//     let text = el.text()
//     if (text.includes('.') || text.includes('．')) {
//       if (text.includes('.')) {
//         text = text.split('.')[1]
//       }
//       if (text.includes('．')) {
//         text = text.split('．')[1]
//       }
//       if (!text.includes('晚安')) {
//         text += '   晚安！'
//       }
//       console.log(text)
//       try {
//         let goodNight = await GoodNight.findOne({ where: { id: i + 110 } })
//         if (!goodNight) {
//           const goodNight = { content: text }
//           await GoodNight.create(goodNight)
//         } else {
//           await goodNight.update({ content: text })
//         }
//       } catch (e) {
//         console.log(i, e)
//       }
//     }
//   })
// })

const url = 'https://www.zhihu.com/question/360859696/answer/1487695654'

crawler(url, html => {
  if (!html) {
    console.log('爬取内容出错了')
    return
  }
  const $ = cheerio.load(html)
  $('blockquote', '.RichContent-inner').each(async (i, e) => {
    const el = $(e)
    let text = el.text()
    if (!text.includes('晚安')) {
      text += '   晚安！'
    }
    try {
      const goodNight = { content: text }
      await GoodNight.create(goodNight)
    } catch (e) {
      console.log(i, e)
    }
  })
})