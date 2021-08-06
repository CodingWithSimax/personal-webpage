import http = require("http");
import { Config } from "./config-interface";

export function setupPorts(config: Config): void {
    const PORT_REDIRECTS = config.portRedirects;
    for (const key of Object.keys(PORT_REDIRECTS)) {
        new Promise((resolve) => {
            const server = http.createServer(function (req, res) {
                if (req.url === "/") {
                    res.writeHead(302, {
                        location: PORT_REDIRECTS[key],
                    });
                    res.end();
                }
            });
            server.listen(parseInt(key), () => console.log("listening to port " + key));
        });
    }
}
