import { Log } from "../utils/logger/logger";
const fetch = require("node-fetch");

export const sendMessage = async (job) => {
  Log.info(`${job.attrs.name} - Sending message`);
  try {
    let opts: any = {
      method: job.attrs.data.method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (job.attrs.data.method === "POST") {
      opts.body = job.attrs.data.body;
    }

    Log.info(`Opts: ${JSON.stringify(opts)}`);

    const response = await fetch(job.attrs.data.url, opts);

    const status = await response.status;

    Log.info(`${job.attrs.name} - Status ${status}`);

    return status;
  } catch (e) {
    Log.error(e);
    return e;
  }
};
