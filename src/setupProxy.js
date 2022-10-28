const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://filmmarker-backend.up.railway.app/",
      // target: process.env.REACT_APP_PROXY,
      changeOrigin: true,
      onProxyRes: response => {
        response.headers["access-control-allow-origin"] = "*";
      },
    })
  );
};
