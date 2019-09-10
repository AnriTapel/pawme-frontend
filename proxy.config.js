const PROXY_CONFIG = {
    "/api/*": {
        "target": "https://petman.co",
        "secure": true,
        "changeOrigin": true,
        "logLevel": "debug",
        "onProxyRes": function (proxyRes, req, res) {
            if (proxyRes.statusCode == 302){
                console.log(proxyRes.headers);
                proxyRes.headers.location = proxyRes.headers.location.replace('https://petman.co', '');
            }
        },
      },
      "/img/*": {
        "target": "https://petman.co",
        "secure": true,
        "changeOrigin": true,
        "logLevel": "debug"
      }
  };
  
  module.exports = PROXY_CONFIG;