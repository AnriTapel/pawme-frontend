const PROXY_CONFIG = {
    "/api/*": {
        "target": "https://dev.petman.co",
        "secure": true,
        "changeOrigin": true,
        "logLevel": "debug",
        "onProxyRes": function (proxyRes, req, res) {
            if (proxyRes.statusCode == 302)
                proxyRes.headers.location = proxyRes.headers.location.replace('https://dev.petman.co', '');
        },
    },
    "/img/*": {
        "target": "https://dev.petman.co",
        "secure": true,
        "changeOrigin": true,
        "logLevel": "debug"
    }
};

module.exports = PROXY_CONFIG;