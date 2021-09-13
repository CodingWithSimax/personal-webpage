import express = require("express");
import fs = require("fs");

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

app.get("/", (req: express.Request, res: express.Response) => {
    res.sendFile("./web/dist/index.html");
});

setupTelegramAPI(app);

expressLogger.addExpressApp(app, "main-web", true);

app.listen(PORT, () => {
    console.log(`Now listening to port ${PORT}`);
    console.log("started server");
});

