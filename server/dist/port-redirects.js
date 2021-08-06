"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupPorts = void 0;
const http = require("http");
function setupPorts(config) {
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
exports.setupPorts = setupPorts;
