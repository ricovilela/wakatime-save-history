import db from '../database/models'
/* import { Op } from 'sequelize' */
import { Request, Response } from 'express'
// import { Utils } from '../utils'

console.log(process.env)

class TimelineController {
  async timeLine (req: Request, res: Response) {
    const result = JSON.parse(process.env.API_HOSTS)

    if (req.params.name) {
      const resDb = db.wakatimelines.findAll({
        where: {
          name: req.params.name
        }
      })
      console.log(resDb)
    }

    res.render('timeline', {
      title: 'Wakatime Timeline',
      result: result
    })
  }
}

export { TimelineController }
