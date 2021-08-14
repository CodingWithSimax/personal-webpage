import express = require("express");
import { Config } from "./config-interface";
import { ExpressLogger } from "./utils/setupLogger";

export async function setupPorts(
    config: Config,
    portRedirects: number,
    expressLogger: ExpressLogger
): Promise<void> {
    const redirectApp = express();

    expressLogger.addExpressApp(redirectApp, "port-redirection", false);

    redirectApp.get("/", (req: express.Request, res: express.Response) => {
        let redirectPath = undefined;

        try {
            redirectPath = JSON.parse(<string>req.query.redirection);
        } catch (error) {
            redirectPath = req.query.redirection;
        }

        if (redirectPath != null) {
            let result = null;
            for (const portRedirect of config.portRedirects) {
                if (
                    portRedirect.prefixes.indexOf(redirectPath.split(".")[0]) >
                    -1
                )
                    result = portRedirect;
            }
            if (result != null) {
                res.redirect(result.url);
                return;
            }
        }

        res.json({ error: "error" });
    });

    expressLogger.addExpressApp(redirectApp, "port-redirection", true);

    redirectApp.listen(portRedirects, () => {
        console.log(`now listening to ${portRedirects} for redirects.`);
    });
}
