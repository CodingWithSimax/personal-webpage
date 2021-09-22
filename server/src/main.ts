import express = require("express");
import fs = require("fs");
import path = require("path");

import { setupTelegramAPI } from "./telegram-api";
import { setupPorts } from "./port-redirects";
import { Config } from "./config-interface";
import { ExpressLogger } from "./utils/setupLogger";

// --- //
const PORT = 3000;
const PORT_REDIRECTS = 3001;

const CONFIG: Config = JSON.parse(
    fs.readFileSync("./data/config.json").toString()
);
// --- //

const expressLogger: ExpressLogger = new ExpressLogger();

setupPorts(CONFIG, PORT_REDIRECTS, expressLogger);

const app = express();

app.set("trust proxy", true);

expressLogger.addExpressApp(app, "main-web", false);

app.use("/", express.static("./web/dist"));
app.use("/assets", express.static("./web/src/assets"));

const handleAngularRequest = (req: express.Request, res: express.Response) => {
    res.sendFile(path.resolve("./web/dist/index.html"));
};
app.get("/", handleAngularRequest);
app.get("/error", handleAngularRequest);

setupTelegramAPI(app);

for (const portRedirect of CONFIG.portRedirects) {
    for (const prefix of portRedirect.prefixes) {
        if (prefix.startsWith("/")) {
            app.get(prefix, (req: express.Request, res: express.Response) => {
                res.send(portRedirect.url);
            });
        }
    }
}

expressLogger.addExpressApp(app, "main-web", true);
app.use((req: express.Request, res: express.Response) => {
    res.redirect("/error");
});

app.listen(PORT, () => {
    console.log(`Now listening to port ${PORT}`);
    console.log("started server");
});
