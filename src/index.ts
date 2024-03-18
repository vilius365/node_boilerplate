import bodyParser = require("body-parser");
import { crud_tasks } from "./routes/crud_Tasks";
require("./utils/schedule.ts");
import express = require("express");
import { run_tasks } from "./routes/run_Tasks";

var app = express();

app.use(bodyParser.json());

app.use("/tasks", crud_tasks());
app.use("/run", run_tasks());

app.listen(3001);

// async function graceful() {
//   console.log("Gracefully shutting down");
//   await agenda.drain();
//   console.log("Graceful shutdown complete");
//   process.exit(0);
// }

// process.on("SIGKILL", graceful);
// process.on("SIGTERM", graceful);
// process.on("SIGINT", graceful);
// process.on("SIGHUP", graceful);
// process.on("SIGQUIT", graceful);
// process.on("SIGABRT", graceful);
// process.on("SIGSTOP", graceful);
// process.on("SIGUSR2", graceful);
// process.on("SIGBREAK", graceful);
// process.on("SIGBUS", graceful);
