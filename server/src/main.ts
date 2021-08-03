import express = require("express");

// --- //
const PORT = 3000;
// --- //

const app = express();

app.use("/", express.static("./web/dist"));

app.get("/", (req: express.Request, res: express.Response) => {
    res.sendFile("./web/dist/index.html");
});

app.listen(PORT, () => {
    console.log(`Now listening to port ${PORT}`);
});
