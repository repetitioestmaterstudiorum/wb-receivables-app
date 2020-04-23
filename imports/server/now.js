import moment from "moment-timezone";
import dotenv from "dotenv";
dotenv.config({
  path: Assets.absoluteFilePath(".env"),
});

export const now = () => moment().tz(process.env.TIME_ZONE).format();
