<<<<<<< HEAD
// import Agenda from "agenda";

// const mongoConnectionString = "mongodb://invade:invade@192.168.1.245/agenda";

// const agenda = new Agenda({ db: { address: mongoConnectionString } });

// // Or override the default collection name:
// // const agenda = new Agenda({db: {address: mongoConnectionString, collection: 'jobCollectionName'}});

// // or pass additional connection options:
// // const agenda = new Agenda({db: {address: mongoConnectionString, collection: 'jobCollectionName', options: {ssl: true}}});

// // or pass in an existing mongodb-native MongoClient instance
// // const agenda = new Agenda({mongo: myMongoClient});

// agenda.define("send weebhook", async (job) => {
//   fetch("https://webhook.site/3bac4b44-6679-4a5b-bcc2-1c98e8d812e3", {
//     method: "POST",
//     body: JSON.stringify({ message: "Hello world" }),
//   });
// });

(async function () {
  // IIFE to give access to async/await
//   await agenda.start();

  console.log("here1")
//   await agenda.every("1 minutes", "delete old users");

//   // Alternatively, you could also do:
//   await agenda.every("*/1 * * * *", "delete old users");
})();
=======
import { Agenda } from "agenda/dist/agenda";
import { sendMessage } from "../jobs_low/functions";
import { Log } from "./logger/logger";

const mongoConnectionString =
  process.env.MONGO_URL || "noConnectionStringFound";

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

export const myAgenda = agenda;
>>>>>>> parent of 7bc9464 (Merge branch 'devel' of https://github.com/vilius365/node_boilerplate into devel)
