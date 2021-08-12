import express = require("express");
import fs = require("fs");

import { setupTelegramAPI } from "./telegram-api";
import { setupPorts } from "./port-redirects";
import { Config } from "./config-interface";
import { setupLogger } from "./utils/setupLogger";

// --- //
const PORT = 3000;
const PORT_REDIRECTS = 3001;

const CONFIG: Config = JSON.parse(
    fs.readFileSync("./data/config.json").toString()
);
// --- //

setupPorts(CONFIG, PORT_REDIRECTS);

const app = express();

app.set("trust proxy", true);

setupLogger(app, "main-web");

app.use("/", express.static("./web/dist"));
app.use("/assets", express.static("./web/src/assets"));

app.get("/", (req: express.Request, res: express.Response) => {
    res.sendFile("./web/dist/index.html");
});

setupTelegramAPI(app);

app.listen(PORT, () => {
    console.log(`Now listening to port ${PORT}`);
    console.log("started server");
});
