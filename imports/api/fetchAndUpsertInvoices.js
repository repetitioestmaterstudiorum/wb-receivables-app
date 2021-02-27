import { Random } from 'meteor/random'
import axios from 'axios'
import moment from 'moment-timezone'
import { InvoicesCollection } from './collections/invoices'

async function fetchInvoices() {
	const url = `https://service.runmyaccounts.com/api/latest/clients/webbutler/invoices/?status=OPEN&api_key=${process.env.RMA_API_KEY}`
	try {
		const result = await axios.get(url)
		return result
	} catch (err) {
		console.error(err)
		return err
	}
}

const upsertInvoices = invoicesObject => {
	invoicesObject.forEach(invoice => {
		const { customernumber } = invoice.customer
		const customername = invoice.customer.name
		const { duedate, invnumber, description, status, currency, amount, paid } = invoice
		const invdate = invoice.transdate
		const invid = invoice.id
		const now = moment().tz(process.env.TIME_ZONE).format()
		const _id = Random.id()
		try {
			InvoicesCollection.upsert(
				{ invid: invid },
				{
					$set: {
						duedate,
						invdate,
						description,
						status,
						currency,
						amount,
						paid,
						lastUpdated: now,
					},
					$setOnInsert: {
						_id,
						invid,
						invnumber,
						customername,
						customernumber,
						createdAt: now,
					},
				}
			)
		} catch (err) {
			console.error(err.errmsg)
			console.error(
				`invoice ${invnumber} with date ${moment(invdate).format(
					'DD.MM.YYYY'
				)} of customer ${customername} for ${currency} ${amount}`
			)
			console.error(' ')
		}
	})
}

// fetch invoice data
export async function fetchAndUpsertInvoices() {
	const result = await fetchInvoices()
	try {
		upsertInvoices(result.data.invoice)
		Meteor.call('updateInvoicesFetchLog')
	} catch (err) {
		console.error(err)
	}
}
