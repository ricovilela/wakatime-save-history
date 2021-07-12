"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const consolidate_1 = __importDefault(require("consolidate"));
const routes_1 = require("./routes");
const utils_1 = require("./utils");
const folder = process.env.PWD ? process.env.PWD : process.env.pm_cwd;
require('dotenv').config(folder + '/.env');
const utils = new utils_1.Utils();
utils.callDustHelpers();
const app = express_1.default();
app.engine('dust', consolidate_1.default.dust);
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.set('view engine', 'dust');
app.set('views', path_1.default.join(__dirname, '/views'));
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use(express_1.default.static(path_1.default.join(__dirname, 'src')));
app.use(routes_1.routes);
try {
    app.listen(3000, () => {
        console.clear();
        console.log('\x1b[33m [** \x1b[37m Server is running on \x1b[36m "http://localhost:3000/" \x1b[33m **]');
    });
}
catch (error) {
    console.log('** ERROR INSTANCE SERVER **: ' + error);
}
