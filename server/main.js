import { Meteor } from 'meteor/meteor'

import { InvoicesCollection } from '/imports/api/collections/invoices.js'
import { parseEmail } from '/imports/server/parseEmail.js'
import { fetchAndUpsertInvoices } from '../imports/api/fetchAndUpsertInvoices.js'
import '/imports/api/collections/invPaymentPairs'
import '/imports/startup/accounts-config.js'

Meteor.startup(() => {
	// listen to incoming emails and add them to the collection
	parseEmail() // this also imports the PaymentsCollection methods

	// fetch invoices and update the "invoices" collection
	fetchAndUpsertInvoices()

	// create index for the invid field in the collection "invoices" to ensure no duplicates (2nd layer, 1st is upsert based on invid)
	InvoicesCollection.rawCollection().createIndex({ invid: 1 }, { unique: true })
})
