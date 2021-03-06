import { Request, Response } from 'express'
import { Utils } from '../utils'
const db = require('../database/models/')

const utils = new Utils()

class TimelineController {
  async cronJob () {
    let consDataInDb: any
    let apiConsultHours: any
    let apiConsultLanguage: any

    const result = await db.devs_repository.findAll({
      raw: true
    })

    for (const reslt of result) {
      apiConsultHours = await utils.getApiData(reslt.urlhours)
      apiConsultLanguage = await utils.getApiData(reslt.urllanguage)

      for (const apiConsHrs of apiConsultHours.data) {
        consDataInDb = await db.wakatimeline.findOne({
          raw: true,
          where: {
            user: reslt.name,
            date: apiConsHrs.range.date
          }
        })

        if (!consDataInDb || consDataInDb.length === 0) {
          await db.wakatimeline.create({
            user: reslt.name,
            hours: apiConsHrs.grand_total.digital,
            date: apiConsHrs.range.date,
            languages: apiConsultLanguage.data
          })
        } else if (consDataInDb.date === utils.dateFormatNow()) {
          await db.wakatimeline.update(
            {
              hours: apiConsHrs.grand_total.digital,
              languages: apiConsultLanguage.data
            },
            {
              where: {
                user: reslt.name,
                date: apiConsHrs.range.date
              }
            }
          )
        }
      }
    }
  }

  async timeLine (req: Request, res: Response) {
    let contentData: any
    const chartColor = []
    const chartName = []
    const chartPercent = []
    let user = ''

    if (req.params.name) {
      user = ' - ' + req.params.name
      contentData = await db.wakatimeline.findAll({
        raw: true,
        where: {
          user: req.params.name
        },
        order: [['user'], ['date', 'DESC']]
      })
    } else {
      contentData = await db.wakatimeline.findAll({
        raw: true,
        order: [['user'], ['date', 'DESC']]
      })
    }

    for (const key in contentData) {
      const value: any = contentData[key]
      const lang = value.languages

      if (lang.length > 0) {
        chartColor.splice(0, chartColor.length)
        chartName.splice(0, chartName.length)
        chartPercent.splice(0, chartPercent.length)

        lang.reduce((entryMap, e) => chartColor.push(e.color))
        lang.reduce((entryMap, e) =>
          chartName.push(e.name === 'Other' ? 'TypeScript' : e.name)
        )
        lang.reduce((entryMap, e) => chartPercent.push(e.percent))

        contentData[key].chartColor = JSON.stringify(chartColor)
        contentData[key].chartName = JSON.stringify(chartName)
        contentData[key].chartPercent = JSON.stringify(chartPercent)
      }
    }

    res.render('timeline', {
      title: 'Users Timeline' + user,
      content: contentData
    })
  }
}

export { TimelineController }
