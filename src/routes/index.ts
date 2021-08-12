import { Router } from 'express'

import { TimelineController } from '../controllers/TimelineController'
import { DevsController } from '../controllers/DevsController'

const routes = Router()

const timelineController = new TimelineController()
const devsController = new DevsController()

routes.get('/cronjob', timelineController.cronJob)
routes.get('/', devsController.devsRepo)
routes.get('/timeline/:name?', timelineController.timeLine)
routes.get('/updateWaka', timelineController.timeLine)
routes.get('/adddevs', devsController.devsRepo)
routes.post('/adddevs', devsController.devsRepoUpd)
routes.get('/adddevrepo/:id?', devsController.devsRepoAdd)
routes.get('/deldevrepo/:id?', devsController.devsRepoDel)

export { routes }
