"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
// --- //
const PORT = 3000;
// --- //
const app = express();
app.use("/", express.static("./web/dist"));
app.use("/assets", express.static("./web/src/assets"));
app.get("/", (req, res) => {
    res.sendFile("./web/dist/index.html");
});
app.listen(PORT, () => {
    console.log(`Now listening to port ${PORT}`);
});
