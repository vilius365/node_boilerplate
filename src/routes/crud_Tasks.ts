import { Router } from "express";
<<<<<<< HEAD
import agenda from "../utils/schedule";
import { sendMessage } from "../jobs_low/functions";
import { Log } from "../utils/logger/logger";
=======
import { sendMessage } from "../jobs_low/functions";
import { Log } from "../utils/logger/logger";
import { myAgenda } from "../utils/schedule";
>>>>>>> parent of 7bc9464 (Merge branch 'devel' of https://github.com/vilius365/node_boilerplate into devel)

export const crud_tasks = () => {
  let router = Router();

  router.delete("/:name", async (req, res) => {
    Log.info("Deleting task by name " + req.params.name);
    const { name } = req.params;

<<<<<<< HEAD
    const job = await agenda.cancel({ name: name });
=======
    const job = await myAgenda.cancel({ name: name });
>>>>>>> parent of 7bc9464 (Merge branch 'devel' of https://github.com/vilius365/node_boilerplate into devel)

    if (job) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  });

  router.get("/", async (req, res) => {
    Log.info("Getting list of jobs");
<<<<<<< HEAD
    const listOfJobs = await agenda.jobs();
=======
    const listOfJobs = await myAgenda.jobs();
>>>>>>> parent of 7bc9464 (Merge branch 'devel' of https://github.com/vilius365/node_boilerplate into devel)

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

<<<<<<< HEAD
    agenda.define(name, { shouldSaveResult: true }, sendMessage);

    agenda.every(schedule, name, {
=======
    myAgenda.define(name, { shouldSaveResult: true }, sendMessage);

    myAgenda.every(schedule, name, {
>>>>>>> parent of 7bc9464 (Merge branch 'devel' of https://github.com/vilius365/node_boilerplate into devel)
      url: jobDestinationURL,
      method: jobDestinationMethod,
      body: jobDestinationBody,
    });

    res.send(`Task ${name} created`);
  });

  router.put("/", async (req, res) => {
<<<<<<< HEAD
    await agenda.drain().then(() => {
      console.log("Agenda drained");
    });
    await agenda.stop().then(() => {
      console.log("Agenda stopped");
=======
    await myAgenda.drain().then(() => {
      Log.info("Agenda drained");
    });
    await myAgenda.stop().then(() => {
      Log.info("Agenda stopped");
>>>>>>> parent of 7bc9464 (Merge branch 'devel' of https://github.com/vilius365/node_boilerplate into devel)
    });

    res.sendStatus(200);
  });

  return router;
};
