import express = require("express");

import { setupTelegramAPI } from "./telegram-api";

// --- //
const PORT = 3000;
// --- //

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
});
