import { Meteor } from 'meteor/meteor'
import moment from 'moment-timezone'

export const now = () => moment().tz(process.env.TIME_ZONE).format()
