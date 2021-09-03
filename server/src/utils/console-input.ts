import process = require("process");
import readline = require("readline");

export function consoleInput(
    message = "",
    resultType = "any"
): Promise<string> {
    const rlInterface = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise((resolve) => {
        rlInterface.question(message + " ", function (data) {
            data = data.split("\n")[0];
            rlInterface.close();
            if (resultType == "yesNo") {
                if (data != "yes" && data != "no") {
                    console.log("invalid input.");
                    consoleInput(message, resultType).then(resolve);
                    return;
                }
            }
            resolve(data);
        });
    });
}
