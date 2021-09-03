"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupPorts = void 0;
const express = require("express");
async function setupPorts(config, portRedirects, expressLogger) {
    const redirectApp = express();
    expressLogger.addExpressApp(redirectApp, "port-redirection", false);
    redirectApp.get("/", (req, res) => {
        let redirectPath = undefined;
        try {
            redirectPath = JSON.parse(req.query.redirection);
        }
        catch (error) {
            redirectPath = req.query.redirection;
        }
        if (redirectPath != null) {
            let result = null;
            for (const portRedirect of config.portRedirects) {
                if (portRedirect.prefixes.indexOf(redirectPath.split(".")[0]) >
                    -1)
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
exports.setupPorts = setupPorts;
