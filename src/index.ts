const dotenv = require("dotenv");
dotenv.config();
import bodyParser = require("body-parser");
import express = require("express");
import { Log } from "./utils/logger/logger";
import { crud_tasks } from "./routes/crud_Tasks";
import { run_tasks } from "./routes/run_Tasks";
import { myAgenda } from "./utils/schedule";

var app = express();

app.use(bodyParser.json());

app.use("/tasks", crud_tasks());
app.use("/run", run_tasks());

Log.info(`Version: ${require("../package.json").version}`);
Log.info(`DB location: ${process.env.MONGO_URL}`);
app.listen(process.env.HOST_PORT, () => {
  Log.info(
    `invade-didww_billing_scheduler listening on port ${process.env.HOST_PORT}`
  );
});
