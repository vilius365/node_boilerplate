import { Router } from "express";
import agenda from "../utils/schedule";
import { sendMessage } from "../jobs_low/functions";
import { Log } from "../utils/logger/logger";
import { Job } from "agenda";

export const run_tasks = () => {
  let router = Router();

  router.get("/:name", async (req, res) => {
    Log.info("Running job by name " + req.params.name);
    const { name } = req.params;

    const jobs: any = await agenda.jobs({ name: name });

    if (jobs.length > 0) {
      jobs[0].run((err: any, job: Job) => {
        if (err) {
          Log.error(err);
          res.sendStatus(500);
        }
        Log.info("Job run");
        res.sendStatus(200);
      });
    }
  });

  return router;
};
