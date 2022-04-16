const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const useRoutes = require('../router/index.js');
const errorHandle = require('./error-handle.js')

const app = new koa();
app.useRoutes = useRoutes;
app.use(bodyParser());
app.useRoutes()
app.on('error',errorHandle)

module.exports = app;