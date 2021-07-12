"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelineController = void 0;
const utils_1 = require("../utils");
const db = require('../database/models');
const utils = new utils_1.Utils();
class TimelineController {
    async timeLine(req, res) {
        let consDataInDb;
        let contentData;
        let apiConsultHours;
        let apiConsultLanguage;
        let chartColor = [];
        let chartName = [];
        let chartPercent = [];
        let user = '';
        const result = JSON.parse(process.env.API_HOSTS);
        console.log(result);
        for (const reslt of result) {
            apiConsultHours = await utils.getApiData(reslt.urlHours);
            apiConsultLanguage = await utils.getApiData(reslt.urlLanguage);
            for (const apiConsHrs of apiConsultHours.data) {
                consDataInDb = await db.wakatimeline.findAll({
                    raw: true,
                    where: {
                        user: reslt.user,
                        date: apiConsHrs.range.date
                    }
                });
                if (consDataInDb.length === 0) {
                    await db.wakatimeline.create({
                        user: reslt.user,
                        hours: apiConsHrs.grand_total.digital,
                        date: apiConsHrs.range.date,
                        languages: apiConsultLanguage.data
                    });
                }
                else if (consDataInDb[0].date === utils.dateFormatNow()) {
                    await db.wakatimeline.update({
                        hours: apiConsHrs.grand_total.digital,
                        languages: apiConsultLanguage.data
                    }, {
                        where: {
                            user: reslt.user,
                            date: apiConsHrs.range.date
                        }
                    });
                }
            }
        }
        if (req.params.name) {
            user = ' - ' + req.params.name;
            contentData = await db.wakatimeline.findAll({
                raw: true,
                where: {
                    user: req.params.name
                },
                order: [
                    ['user'], ['date', 'DESC']
                ]
            });
            for (const [key, value] of Object.entries(contentData)) {
                chartColor = [];
                chartName = [];
                chartPercent = [];
                value.languages.reduce((entryMap, e) => chartColor.push(e.color));
                value.languages.reduce((entryMap, e) => chartName.push(e.name === 'Other' ? 'TypeScript' : e.name));
                value.languages.reduce((entryMap, e) => chartPercent.push(e.percent));
                contentData[key].chartColor = JSON.stringify(chartColor);
                contentData[key].chartName = JSON.stringify(chartName);
                contentData[key].chartPercent = JSON.stringify(chartPercent);
            }
        }
        else {
            contentData = await db.wakatimeline.findAll({
                raw: true,
                order: [
                    ['user'], ['date', 'DESC']
                ]
            });
            for (const [key, value] of Object.entries(contentData)) {
                chartColor = [];
                chartName = [];
                chartPercent = [];
                value.languages.reduce((entryMap, e) => chartColor.push(e.color));
                value.languages.reduce((entryMap, e) => chartName.push(e.name === 'Other' ? 'TypeScript' : e.name));
                value.languages.reduce((entryMap, e) => chartPercent.push(e.percent));
                contentData[key].chartColor = JSON.stringify(chartColor);
                contentData[key].chartName = JSON.stringify(chartName);
                contentData[key].chartPercent = JSON.stringify(chartPercent);
            }
        }
        res.render('timeline', {
            title: 'Users Timeline' + user,
            result: result,
            content: contentData
        });
    }
}
exports.TimelineController = TimelineController;
