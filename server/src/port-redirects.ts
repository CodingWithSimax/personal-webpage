import http = require("http");

const PORT_REDIRECTS = {
    3001: "https://www.youtube.com/channel/UCOcCXCfsgXPBLY4URamvhGg",
    3002: "https://twitter.com/Simax___",
    3003: "https://discord.gg/ZpFJJ4yD7e",
};

export function setupPorts(): void {
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
            server.listen(key, () => console.log("listening to port " + key));
        });
    }
}
