const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://filmmarker-backend.up.railway.app/",
      // target: "http://localhost:5000/",
      changeOrigin: true,
    })
  );
};
