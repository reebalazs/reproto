require("@babel/register")({
  cwd: process.env.FRONTEND_ROOT,
});
module.exports = require("./webpack.js");
