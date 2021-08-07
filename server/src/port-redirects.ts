import express = require("express");
import { Config } from "./config-interface";

export async function setupPorts(
    config: Config,
    portRedirects: number
): Promise<void> {
    const redirectApp = express();

    redirectApp.get("/", (req: express.Request, res: express.Response) => {
        let redirectPath = undefined;

        try {
            redirectPath = JSON.parse(<string>req.query.redirection);
        } catch (error) {
            redirectPath = req.query.redirection
        }
        
        console.log("redirecting to " + redirectPath);
        if (redirectPath != null) {
            let result = null;
            for (const portRedirect of config.portRedirects) {
                if (
                    portRedirect.prefixes.indexOf(
                        redirectPath.split(".")[0]
                    ) > -1
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

    redirectApp.listen(portRedirects, () => {
        console.log(`now listening to ${portRedirects} for redirects.`);
    });
}
