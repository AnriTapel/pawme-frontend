var proxy = require('http-proxy-middleware');
var fallback = require('connect-history-api-fallback');

module.exports = {
    server: {
        middleware: {
            1: proxy("/api", {
                target: "http://localhost:4200"
            }),
            2: proxy(function(pathname, req) { return pathname === "/" }, {
                target: "http://localhost:4200"
            })
        }
    },
    open: false
};
