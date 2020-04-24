const express = require("express");
const Router = require("./routes/userRoute");
const logger = require("./lib/middleware/logger");
const swaggerUI = require("swagger-ui-express");
const swaggerDoc = require("./lib/swagger");
const mongoose = require("mongoose");
const mongoUrl = "mongodb://127.0.0.1:27017/project2";
const app = express();
const port = 3000;
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(logger);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use("/", Router);
app.listen(port);

console.log("listening on port: " + port);
