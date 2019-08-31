const PROXY_CONFIG = {
    "/api/*": {
        "target": "http://petman.co",
        "secure": false,
        "changeOrigin": true,
        "logLevel": "debug",
        "onProxyRes": function (proxyRes, req, res) {
            if (proxyRes.statusCode == 302){
                console.log(proxyRes.headers);
                proxyRes.headers.location = proxyRes.headers.location.replace('http://petman.co', '');
            }
        },
      },
      "/img/*": {
        "target": "http://petman.co",
        "secure": false,
        "changeOrigin": true,
        "logLevel": "debug"
      }
  };
  
  module.exports = PROXY_CONFIG;