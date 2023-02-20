import express from "express";
// import "dotenv/config";
import * as dotenv from "dotenv";
dotenv.config();
import * as path from "path";
import bodyParser from "body-parser";
import { SOURCE_PATH } from "./consts.js";
import { create } from "express-handlebars";
import { home } from "./controllers/home.js";
import HandlebarsHelpers from "./lib/HandlebarsHelpers.js";
import { deleteInterest, getInterest, postInterest, updateInterest } from "./controllers/api/interest.js";
import { deleteUser, getUser, postUser, updateUser } from "./controllers/api/user.js";

const app = express();
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Handlebars Init
 */
const hbs = create({
  helpers: HandlebarsHelpers,
  extname: "hbs",
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(SOURCE_PATH, "views"));

/**
 * App Routes
 */
app.get("/", home);

/**
 * API app Routes
 */
// Interests
app.get("/api/interest", getInterest);
app.post("/api/interest", postInterest);
app.put("/api/interest", updateInterest);
app.delete("/api/interest/:id", deleteInterest);

// Users
app.get("/api/user", getUser);
app.post("/api/user", postUser);
app.put("/api/user/:id", updateUser);
app.delete("/api/user/:id", deleteUser);

/**
 * Serve App
 */
app.listen(process.env.PORT, () => {
  console.log(`Application is runninig on http://localhost:${process.env.PORT}/.`);
});
