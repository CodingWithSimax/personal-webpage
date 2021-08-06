import express = require("express");
import fs = require("fs");

import { setupTelegramAPI } from "./telegram-api";
import { setupPorts } from "./port-redirects";
import {Config} from "./config-interface";

// --- //
const PORT = 3000;

const CONFIG: Config = JSON.parse(fs.readFileSync("./data/config.json").toString());
// --- //

setupPorts(CONFIG);

const app = express();

app.set("trust proxy", true);

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
