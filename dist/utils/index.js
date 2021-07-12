"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
const dustjs_helpers_1 = __importDefault(require("dustjs-helpers"));
const dateformat_1 = __importDefault(require("dateformat"));
const node_fetch_1 = __importDefault(require("node-fetch"));
class Utils {
    async getApiData(url) {
        return new Promise((resolve) => {
            node_fetch_1.default(url, {
                method: 'get',
                headers: { 'Content-Type': 'application/json' }
            })
                .then(async (response) => {
                if (!response.ok) {
                    console.log('error on receive de datas');
                }
                else {
                    resolve(response.json());
                }
            }).catch(async (error) => {
                console.log(error);
            });
        });
    }
    dateFormatNow() {
        return dateformat_1.default(new Date(), 'yyyy-mm-dd');
    }
    async callDustHelpers() {
        dustjs_helpers_1.default.helpers.formatDateDay = function (chunk, context, bodies, params) {
            const value = dustjs_helpers_1.default.helpers.tap(params.value, chunk, context);
            const now = new Date(value);
            const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            const day = days[now.getDay()];
            return chunk.write(day);
        };
        dustjs_helpers_1.default.helpers.formatHour = function (chunk, context, bodies, params) {
            const value = dustjs_helpers_1.default.helpers.tap(params.value, chunk, context);
            const splitHour = value.split(':');
            const parseHour = parseInt(splitHour[0]);
            const parseMinute = parseInt(splitHour[1]);
            if (parseFloat(process.env.HOURS_DEV_PLUS) > 0) {
                let hoursMinutes = 0;
                if (parseHour > 0)
                    hoursMinutes = parseHour * 60;
                const sum = hoursMinutes + parseMinute;
                const percertPlus = sum * parseFloat(process.env.HOURS_DEV_PLUS);
                const consPerc = sum + percertPlus;
                const m = consPerc % 60;
                const h = (consPerc - m) / 60;
                const HHMM = h.toString() + ':' + (m < 10 ? '0' : '') + Math.round(m);
                return chunk.write(HHMM);
            }
            else {
                return chunk.write(parseHour + ':' + (parseMinute < 10 ? '0' : '') + parseMinute);
            }
        };
    }
}
exports.Utils = Utils;
