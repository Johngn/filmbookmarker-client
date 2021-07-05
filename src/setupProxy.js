const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://filmbookmarker.herokuapp.com/',
            changeOrigin: true,
        })
    );
};
