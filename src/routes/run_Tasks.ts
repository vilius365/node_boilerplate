import { Router } from "express";
import { Log } from "../utils/logger/logger";
import { Job } from "agenda";
import { myAgenda } from "../utils/schedule";

export const run_tasks = () => {
  let router = Router();

  router.get("/:name", async (req, res) => {
    Log.info('Running job "' + req.params.name + '"');
    const { name } = req.params;

    const jobs: any = await myAgenda.jobs({ name: name });

    Log.info("Jobs: " + JSON.stringify(jobs));

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
