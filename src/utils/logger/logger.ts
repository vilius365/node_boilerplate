import * as winston from "winston";
import { format } from "winston";
import { DateTime } from "luxon";

const logFileName = "/invade-didww_billing_scheduler.log";

const { combine, prettyPrint, printf } = format;

const myFormat = printf((info: any) => {
  const timestamp = DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss.SSS");
  return `[${timestamp}] ${info.level}: ${info.message}`;
});

const logger = winston.createLogger({
  format: combine(prettyPrint(), myFormat),
  transports: [
    // new winston.transports.File({
    //   filename: process.env.LOG_DIRECTORY + logFileName,
    // }),
    new winston.transports.Console(),
  ],
});

export const Log = logger;
