"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const fs = require("fs");
const telegram_api_1 = require("./telegram-api");
const port_redirects_1 = require("./port-redirects");
// --- //
const PORT = 3000;
const CONFIG = JSON.parse(fs.readFileSync("./data/config.json").toString());
// --- //
port_redirects_1.setupPorts(CONFIG);
const app = express();
app.set("trust proxy", true);
app.use("/", express.static("./web/dist"));
app.use("/assets", express.static("./web/src/assets"));
app.get("/", (req, res) => {
    res.sendFile("./web/dist/index.html");
});
telegram_api_1.setupTelegramAPI(app);
app.listen(PORT, () => {
    console.log(`Now listening to port ${PORT}`);
    console.log("started server");
});
