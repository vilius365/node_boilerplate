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
