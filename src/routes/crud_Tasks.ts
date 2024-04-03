import { Router } from "express";
import { sendMessage } from "../jobs_low/functions";
import { Log } from "../utils/logger/logger";
import { myAgenda } from "../utils/schedule";

export const crud_tasks = () => {
  let router = Router();

  router.delete("/:name", async (req, res) => {
    Log.info("Deleting task by name " + req.params.name);
    const { name } = req.params;

    const job = await myAgenda.cancel({ name: name });

    if (job) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  });

  router.get("/", async (req, res) => {
    Log.info("Getting list of jobs");
    const listOfJobs = await myAgenda.jobs();

    const retArr = [];

    listOfJobs.map((job) => {
      retArr.push(job.attrs);
    });

    res.send(retArr);
  });

  router.post("/", async (req, res) => {
    Log.info("Creating new task");
    const body = req.body;

    const {
      name,
      schedule,
      jobDestinationURL,
      jobDestinationMethod,
      jobDestinationBody,
    } = body;
    console.log(body);

    myAgenda.define(name, { shouldSaveResult: true }, sendMessage);

    myAgenda.every(schedule, name, {
      url: jobDestinationURL,
      method: jobDestinationMethod,
      body: jobDestinationBody,
    });

    res.send(`Task ${name} created`);
  });

  router.put("/", async (req, res) => {
    await myAgenda.drain().then(() => {
      Log.info("Agenda drained");
    });
    await myAgenda.stop().then(() => {
      Log.info("Agenda stopped");
    });

    res.sendStatus(200);
  });

  return router;
};
