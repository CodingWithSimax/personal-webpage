import express = require("express");
import { TerminalColors } from "./terminalColors";

export function setupLogger(
    app: express.Express,
    applicationName: string
): void {
    app.use(
        (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ): void => {
            console.log(
                TerminalColors.FgBlue +
                    req.method +
                    TerminalColors.FgWhite +
                    " -> " +
                    TerminalColors.FgGreen +
                    req.path +
                    TerminalColors.FgWhite +
                    " ~ " +
                    TerminalColors.FgMagenta +
                    req.ip +
                    TerminalColors.Reset
            );
            next();
        }
    );
}
