const PROXY_CONFIG = {
    "/api/*": {
        "target": "https://petman.co",
        "secure": true,
        "changeOrigin": true,
        "logLevel": "debug",
        "onProxyRes": function (proxyRes, req, res) {
            if (proxyRes.statusCode == 302){
                if (proxyRes.headers.location.indexOf('pass-link-fail') != -1)
                    proxyRes.headers.location = '/login';
                else if (proxyRes.headers.location.indexOf('pass-link-success') != -1)
                    proxyRes.headers.location = '/sign-up';
                else
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