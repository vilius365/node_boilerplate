import { Agenda } from "agenda/dist/agenda";
import { sendMessage } from "../jobs_low/functions";
import { Log } from "./logger/logger";

const mongoConnectionString =
  "mongodb://invade:invade@192.168.1.245:27017/invade-didww_billing_backend?authMechanism=DEFAULT&authSource=admin";

const connectionOpts = {
  db: { address: mongoConnectionString, collection: "jobs" },
};

const agenda = new Agenda(connectionOpts);

agenda.defaultLockLifetime(100);

agenda.on("ready", () => {
  Log.info("Agenda ready");

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

export default agenda;
