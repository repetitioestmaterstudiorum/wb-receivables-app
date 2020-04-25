import { Meteor } from "meteor/meteor";
import moment from "moment-timezone";
import dotenv from "dotenv";
if (Meteor.isServer) {
  dotenv.config({
    path: Assets.absoluteFilePath(".env"),
  });
}

export const now = () => moment().tz(process.env.TIME_ZONE).format();
