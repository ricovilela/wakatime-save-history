"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const TimelineController_1 = require("../controllers/TimelineController");
const routes = express_1.Router();
exports.routes = routes;
const timelineController = new TimelineController_1.TimelineController();
routes.get('/:name?', timelineController.timeLine);
