import { Meteor } from "meteor/meteor";
import moment from "moment-timezone";
import dotenv from "dotenv";

if (Meteor.isServer && process.env.NODE_ENV === "development") {
  dotenv.config({
    path: Assets.absoluteFilePath(".env"),
  });
}

export const now = () => moment().tz(process.env.TIME_ZONE).format();
