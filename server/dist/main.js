"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const fs = require("fs");
const path = require("path");
const telegram_api_1 = require("./telegram-api");
const port_redirects_1 = require("./port-redirects");
const setupLogger_1 = require("./utils/setupLogger");
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
app.use("/", express.static("./server/extra_assets"));
app.use("/assets", express.static("./web/src/assets"));
const handleAngularRequest = (req, res) => {
    res.sendFile(path.resolve("./web/dist/index.html"));
};
app.get("/", handleAngularRequest);
app.get("/error", handleAngularRequest);
telegram_api_1.setupTelegramAPI(app);
for (const portRedirect of CONFIG.portRedirects) {
    for (const prefix of portRedirect.prefixes) {
        if (prefix.startsWith("/")) {
            console.log("setting prefix " + prefix);
            app.get(prefix, (req, res) => {
                res.sendFile(path.resolve("./data", portRedirect.url));
            });
        }
    }
}
expressLogger.addExpressApp(app, "main-web", true);
app.use((req, res) => {
    res.redirect("/error");
});
app.listen(PORT, () => {
    console.log(`Now listening to port ${PORT}`);
    console.log("started server");
});
