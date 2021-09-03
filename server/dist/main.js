"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const fs = require("fs");
const telegram_api_1 = require("./telegram-api");
const port_redirects_1 = require("./port-redirects");
const setupLogger_1 = require("./utils/setupLogger");
const setup_configs_1 = require("./setup-configs");
setup_configs_1.setupConfigs().then(() => {
    // --- //
    const PORT = 3000;
    const PORT_REDIRECTS = 3001;
    const CONFIG = JSON.parse(fs.readFileSync("./data/config.json").toString());
    // --- //
    const expressLogger = new setupLogger_1.ExpressLogger();
    port_redirects_1.setupPorts(CONFIG, PORT_REDIRECTS, expressLogger);
    const app = express();
    app.set("trust proxy", true);
    expressLogger.addExpressApp(app, "main-web", false);
    app.use("/", express.static("./web/dist"));
    app.use("/assets", express.static("./web/src/assets"));
    app.get("/", (req, res) => {
        res.sendFile("./web/dist/index.html");
    });
    telegram_api_1.setupTelegramAPI(app);
    expressLogger.addExpressApp(app, "main-web", true);
    app.listen(PORT, () => {
        console.log(`Now listening to port ${PORT}`);
        console.log("started server");
    });
});
