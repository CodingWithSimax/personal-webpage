"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupTelegramAPI = void 0;
const bodyParser = require("body-parser");
const TelegramBot = require("node-telegram-bot-api");
const fs = require("fs");
function setupTelegramAPI(app) {
    const token = fs.readFileSync("./data/telegram_key.key").toString();
    const bot = new TelegramBot(token, { polling: true });
    bot.on("message", (msg) => {
        if (msg.text.toString().toLowerCase() === "/get_channel_id")
            bot.sendMessage(msg.chat.id, "your chat id is " + msg.chat.id);
    });
    app.post("/api/message", bodyParser.json(), (req, res) => {
        const message = req.body;
        const channelId = fs
            .readFileSync("./data/telegram_channel_id.txt")
            .toString();
        bot.sendMessage(channelId, "Anfrage erhalten: \n" +
            ["name", "email", "subject", "message"]
                .map((key) => {
                return `*${key}* : '${message[key]}'`;
            })
                .join("\n"));
        res.json({ success: true });
    });
}
exports.setupTelegramAPI = setupTelegramAPI;
