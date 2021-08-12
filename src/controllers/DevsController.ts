import { Request, Response } from 'express'
// import { Utils } from '../utils'
const db = require('../database/models/')

// const utils = new Utils()

export interface IGetUserAuthInfoRequest extends Request {
  session: any;
  _parsedOriginalUrl: any;
}

class DevsController {
  async devsRepo (req: Request, res: Response) {
    const devs = await db.devs_repository.findAll({
      raw: true,
      order: [
        ['name', 'ASC']
      ]
    })

    res.render('devsrepolist', {
      title: 'Devs List',
      result: devs
    })
  }

  async devsRepoAdd (req: IGetUserAuthInfoRequest, res: Response) {
    const id = req._parsedOriginalUrl.query

    const devs = await db.devs_repository.findAll({
      raw: true,
      where: { id }
    })

    res.render('devrepoadd', {
      title: 'Add Devs',
      data: devs[0]
    })
  }

  async devsRepoUpd (req: IGetUserAuthInfoRequest, res: Response) {
    const { name, urlhours, urllanguage, id } = req.body
    let result: any

    if (id) {
      result = await db.devs_repository.update({
        name,
        urlhours,
        urllanguage
      },
      {
        where: { id }
      })
    } else {
      result = await db.devs_repository.create({
        name,
        urlhours,
        urllanguage
      })
    }

    if (await result) {
      res.status(200).json(result)
    } else {
      res.status(401).json({ error: 'Error with add user' })
    }
  }

  async devsRepoDel (req: IGetUserAuthInfoRequest, res: Response) {
    const id = req._parsedOriginalUrl.query

    await db.devs_repository.destroy({
      where: { id }
    })

    res.redirect('/adddevs')
  }
}

export { DevsController }
