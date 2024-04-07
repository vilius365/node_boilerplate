import { Agenda } from "agenda/dist/agenda";
import { Log } from "./logger/logger";
import { sendMessage } from "../jobs_low/functions";
import { MongoClient } from "mongodb";

const mongoConnectionString =
  process.env.MONGO_URL || "noConnectionStringFound";

const connectionOpts = {
  db: { address: mongoConnectionString, collection: "jobs" },
};

export let myAgenda;

export const initializeAgenda = async () => {
  Log.info("Attempting to connect to MongoDB...");
  Log.info(`DB location: ${mongoConnectionString}`);
  const mongodbTest = new MongoClient(mongoConnectionString, {});

  try {
    await mongodbTest.connect();
  } catch (error) {
    setTimeout(() => {
      initializeAgenda();
    }, 5000);
    return;
  }

  Log.info("Initializing Agenda...");
  myAgenda = new Agenda(connectionOpts, (err, collection) => {
    if (err) {
      Log.error("Error connecting to MongoDB");
      Log.error(err);

      Log.error("Exiting...");
      process.exit(-1);
    }

    Log.info("Connected to MongoDB");
    Log.info("Collection name: " + collection.collectionName);
  });

  myAgenda.defaultLockLifetime(100);

  myAgenda.on("ready", () => {
    Log.info("Agenda initialised...");
    myAgenda.jobs().then((jobs) => {
      jobs.map((job: any) => {
        if (job.lockedAt !== null && job.lockedAt !== undefined) {
          Log.info(`Job ${job.attrs.name} was locked at ${job.attrs.lockedAt}`);
        }
        myAgenda.define(job.attrs.name, sendMessage);
      });
    });

    myAgenda.start();
  });
};
