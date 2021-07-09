import { Router } from 'express'

import { TimelineController } from '@controllers/TimelineController'

const routes = Router()

const timelineController = new TimelineController()

routes.get('/:name?', timelineController.timeLine)

export { routes }
