import { Agenda } from "agenda/dist/agenda";
import { Log } from "./logger/logger";
import { sendMessage } from "../jobs_low/functions";

const mongoConnectionString =
  process.env.MONGO_URL || "noConnectionStringFound";

const connectionOpts = {
  db: { address: mongoConnectionString, collection: "jobs" },
};

const agenda = new Agenda(connectionOpts);

agenda.defaultLockLifetime(100);

agenda.on("ready", () => {
  Log.info("Agenda initialised...");
  agenda.jobs().then((jobs) => {
    jobs.map((job: any) => {
      if (job.lockedAt !== null && job.lockedAt !== undefined) {
        Log.info(`Job ${job.attrs.name} was locked at ${job.attrs.lockedAt}`);
      }
      agenda.define(job.attrs.name, sendMessage);
    });
  });

  agenda.start();
});

export const myAgenda = agenda;
