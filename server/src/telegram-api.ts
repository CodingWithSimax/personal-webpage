import express = require("express");
import bodyParser = require("body-parser");
import TelegramBot = require("node-telegram-bot-api");
import fs = require("fs");

export function setupTelegramAPI(app: express.Express): void {
    const token = fs.readFileSync("./data/telegram_key.key").toString();
    const bot = new TelegramBot(token, { polling: true });
    bot.on("message", (msg) => {
        if (msg.text.toString().toLowerCase() === "/get_channel_id")
            bot.sendMessage(msg.chat.id, "your chat id is " + msg.chat.id);
    });

    app.post(
        "/api/message",
        bodyParser.json(),
        (req: express.Request, res: express.Response) => {
            const message = req.body;
            const channelId = fs
                .readFileSync("./data/telegram_channel_id.txt")
                .toString();
            bot.sendMessage(
                channelId,
                "Anfrage erhalten: \n" +
                    ["name", "email", "subject", "message"]
                        .map((key) => {
                            return `*${key}* : '${message[key]}'`;
                        })
                        .join("\n")
            );
            res.json({ success: true });
        }
    );
}
