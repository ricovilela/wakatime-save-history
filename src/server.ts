import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cons from "consolidate";
import { routes } from "./routes";
import { Utils } from "./utils";

// ADD GITMOJI

const folder = process.env.PWD ? process.env.PWD : process.env.pm_cwd;

require("dotenv").config(folder + "/.env");

const utils = new Utils();
utils.callDustHelpers();

const app = express();

app.engine("dust", cons.dust);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "dust");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.static(path.join(__dirname, "src")));

app.use(routes);

try {
  app.listen(4000, () => {
    console.clear();
    console.log(
      '\x1b[33m [** \x1b[37m Server is running on \x1b[36m "http://localhost:4000/" \x1b[33m **]'
    );
  });
} catch (error) {
  console.log("** ERROR INSTANCE SERVER **: " + error);
}
