import { Router } from "express";
<<<<<<< HEAD
import agenda from "../utils/schedule";
import { sendMessage } from "../jobs_low/functions";
import { Log } from "../utils/logger/logger";
import { Job } from "agenda";
=======
import { Log } from "../utils/logger/logger";
import { Job } from "agenda";
import { myAgenda } from "../utils/schedule";
>>>>>>> parent of 7bc9464 (Merge branch 'devel' of https://github.com/vilius365/node_boilerplate into devel)

export const run_tasks = () => {
  let router = Router();

  router.get("/:name", async (req, res) => {
<<<<<<< HEAD
    Log.info("Running job by name " + req.params.name);
    const { name } = req.params;

    const jobs: any = await agenda.jobs({ name: name });
=======
    Log.info("Running job by s name " + req.params.name);
    const { name } = req.params;

    const jobs: any = await myAgenda.jobs({ name: name });
>>>>>>> parent of 7bc9464 (Merge branch 'devel' of https://github.com/vilius365/node_boilerplate into devel)

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
