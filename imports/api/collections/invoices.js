import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check'

export const InvoicesCollection = new Mongo.Collection('invoices')
export const InvoicesFetchLog = new Mongo.Collection('invoicesfetchlog')

if (Meteor.isServer) {
	// This code only runs on the server
	Meteor.publish('invoices', function () {
		return InvoicesCollection.find()
	})
	Meteor.publish('invoicesfetchlog', function () {
		return InvoicesFetchLog.find()
	})
}

Meteor.methods({
	markInvoiceDeleted(invoiceId) {
		if (Meteor.isServer) {
			// if (!this.userId) {
			// 	throw new Meteor.Error('not-authorized')
			// }
			check(invoiceId, String)
			InvoicesCollection.update({ _id: invoiceId }, { $set: { isDeleted: true } })
		}
	},
	markInvoiceNotDeleted(invoiceId) {
		if (Meteor.isServer) {
			// if (!this.userId) {
			// 	throw new Meteor.Error('not-authorized')
			// }
			check(invoiceId, String)
			InvoicesCollection.update({ _id: invoiceId }, { $set: { isDeleted: false } })
		}
	},
	invoiceIsPaired(invoiceId) {
		if (Meteor.isServer) {
			// if (!this.userId) {
			// 	throw new Meteor.Error('not-authorized')
			// }
			check(invoiceId, String)
			InvoicesCollection.update({ _id: invoiceId }, { $set: { isPaired: true } })
		}
	},
	invoiceIsNotPaired(invoiceId) {
		if (Meteor.isServer) {
			// if (!this.userId) {
			// 	throw new Meteor.Error('not-authorized')
			// }
			check(invoiceId, String)
			InvoicesCollection.update({ _id: invoiceId }, { $set: { isPaired: false } })
		}
	},
})
