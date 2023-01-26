let domain;
if (process.env.NODE_ENV) {
  domain = process.env.NODE_ENV;
} else {
  domain = "local";
}

module.exports = require("./" + domain + ".js");
