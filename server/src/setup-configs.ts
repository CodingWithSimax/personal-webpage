import { consoleInput } from "./utils/console-input";
import fs = require("fs");

export async function setupConfigs(): Promise<void> {
    const telegramKey = await consoleInput("telegram key [enter for skip]:");
    const telegramChannelId = await consoleInput(
        "telegram channel id [enter for skip]:"
    );

    if (telegramKey.trim() !== "") {
        fs.writeFileSync("./data/telegram_key.key", telegramKey);
    }
    if (telegramChannelId.trim() !== "") {
        fs.writeFileSync("./data/telegram_channel_id.txt", telegramChannelId);
    }
}
