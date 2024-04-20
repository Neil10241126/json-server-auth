// See https://github.com/typicode/json-server#module
const cors = require('cors');
const jsonServer = require('json-server')
const server = jsonServer.create()
const auth = require("json-server-auth");
const db = require("./db.json");
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

const rules = auth.rewriter({
  // 權限規則
  users: 600,
  // 其他規則
  '/posts/:category': '/posts?category=:category',
})

server.use(cors())
server.use(middlewares)
server.db = router.db;
server.use(rules);
server.use(auth);
server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})

// Export the Server API
module.exports = server