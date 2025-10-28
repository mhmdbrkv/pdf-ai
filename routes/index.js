const uploadRoute = require("./upload.route");
const aiRoute = require("./ai.route");

module.exports = (app) => {
  app.use("/upload", uploadRoute);
  app.use("/ai", aiRoute);
};
