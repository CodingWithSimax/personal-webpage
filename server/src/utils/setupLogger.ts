import express = require("express");
import { TerminalColors } from "./terminalColors";

interface LoggerRequestData {
    method: string;
    path: string;
    applicationName: string;
    cancelled: boolean;
}
interface LoggerUserData {
    requests: Array<LoggerRequestData>;
    timeout: number;
    firstInteraction: Date;
    lastInteraction: Date;
}

export class ExpressLogger {
    private users: { [key: string]: LoggerUserData } = {};
    private interval: NodeJS.Timeout = undefined;

    public addExpressApp(
        app: express.Express,
        applicationName: string,
        cancelled: boolean
    ): void {
        app.use(
            (
                req: express.Request,
                res: express.Response,
                next: express.NextFunction
            ) => this.handleRequest(req, res, next, applicationName, cancelled)
        );
    }

    private startInterval(): void {
        if (this.interval == undefined)
            this.interval = setInterval(this.update.bind(this), 2000);
    }
    private stopInterval(): void {
        if (this.interval != undefined) {
            clearInterval(this.interval);
            this.interval = undefined;
        }
    }

    private handleRequest(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
        applicationName: string,
        cancelled: boolean
    ) {
        console.log("got request: ", req.headers, req.headers["X-Real-IP"]);

        if (Object.keys(this.users).indexOf(req.ip) == -1)
            this.users[req.ip] = {
                requests: [],
                timeout: 3000,
                firstInteraction: new Date(),
                lastInteraction: new Date(),
            };
        this.users[req.ip].timeout = 3000;
        this.users[req.ip].lastInteraction = new Date();
        let result = false;
        if (cancelled) {
            this.users[req.ip].requests = this.users[req.ip].requests.map(
                (request) => {
                    if (
                        request.method === req.method &&
                        request.path === req.path &&
                        !result
                    ) {
                        result = true;
                        return {
                            ...request,
                            cancelled: true,
                        };
                    }
                    return request;
                }
            );
        }
        if (!result) {
            this.users[req.ip].requests.push({
                method: req.method,
                path: req.path,
                applicationName: applicationName,
                cancelled: cancelled,
            });
        }

        this.startInterval();

        next();
    }

    private generateTimeStamp(date: Date): string {
        const d =
            date.getFullYear() +
            "-" +
            ("0" + (date.getMonth() + 1)).slice(-2) +
            "-" +
            ("0" + date.getDate()).slice(-2) +
            " " +
            ("0" + date.getHours()).slice(-2) +
            ":" +
            ("0" + date.getMinutes()).slice(-2) +
            ":" +
            ("0" + date.getSeconds()).slice(-2);
        return `[${d}]`;
    }

    private update(): void {
        for (const key of Object.keys(this.users)) {
            this.users[key].timeout -= 2000;
            if (this.users[key].timeout <= 0) {
                if (this.users[key].requests.length == 1) {
                    const req = this.users[key].requests[0];
                    console.log(
                        TerminalColors.Dim +
                            this.generateTimeStamp(
                                this.users[key].firstInteraction
                            ) +
                            `[${req.applicationName}] ` +
                            (!req.cancelled ? TerminalColors.Reset : "") +
                            TerminalColors.FgBlue +
                            req.method +
                            TerminalColors.FgWhite +
                            " -> " +
                            TerminalColors.FgGreen +
                            req.path +
                            TerminalColors.FgWhite +
                            " ~ " +
                            TerminalColors.FgMagenta +
                            key +
                            (req.cancelled
                                ? TerminalColors.FgRed + " [CANCELLED]"
                                : "") +
                            TerminalColors.Reset
                    );
                } else {
                    const requests = this.users[key].requests;
                    console.log(
                        TerminalColors.Dim +
                            this.generateTimeStamp(
                                this.users[key].firstInteraction
                            ) +
                            " " +
                            TerminalColors.Reset +
                            requests
                                .map(
                                    (req) =>
                                        (req.cancelled
                                            ? TerminalColors.Dim
                                            : "") + TerminalColors.FgWhite +
                                            `[${req.applicationName}] ` +
                                        TerminalColors.FgBlue +
                                        req.method +
                                        TerminalColors.FgWhite +
                                        " " +
                                        TerminalColors.FgGreen +
                                        req.path +
                                        TerminalColors.FgWhite +
                                        (req.cancelled
                                            ? TerminalColors.FgRed +
                                              " [CANCELLED]"
                                            : "") +
                                        TerminalColors.Reset
                                )
                                .join(TerminalColors.Reset + "; ") +
                            TerminalColors.FgWhite +
                            " ~ " +
                            TerminalColors.FgMagenta +
                            key +
                            TerminalColors.FgYellow +
                            " (took " +
                            (this.users[key].lastInteraction.getTime() -
                                this.users[key].firstInteraction.getTime()) +
                            "ms)" +
                            TerminalColors.Reset
                    );
                }

                this.users[key] = undefined;
                delete this.users[key];
                if (Object.keys(this.users).length == 0) {
                    this.stopInterval();
                }
            }
        }
    }
}
