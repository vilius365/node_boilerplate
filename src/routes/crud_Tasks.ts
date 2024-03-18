import { Router } from "express";
import agenda from "../utils/schedule";
import { sendMessage } from "../jobs_low/functions";
import { Log } from "../utils/logger/logger";

export const crud_tasks = () => {
  let router = Router();

  router.delete("/:name", async (req, res) => {
    Log.info("Deleting task by name " + req.params.name);
    const { name } = req.params;

    const job = await agenda.cancel({ name: name });

    if (job) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  });

  router.get("/", async (req, res) => {
    Log.info("Getting list of jobs");
    const listOfJobs = await agenda.jobs();

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

    agenda.define(name, { shouldSaveResult: true }, sendMessage);

    agenda.every(schedule, name, {
      url: jobDestinationURL,
      method: jobDestinationMethod,
      body: jobDestinationBody,
    });

    res.send(`Task ${name} created`);
  });

  router.put("/", async (req, res) => {
    await agenda.drain().then(() => {
      console.log("Agenda drained");
    });
    await agenda.stop().then(() => {
      console.log("Agenda stopped");
    });

    res.sendStatus(200);
  });

  return router;
};
