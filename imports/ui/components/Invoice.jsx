import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'
import { Form } from 'react-bootstrap'

const Invoice = props => {
	const {
		invnumber,
		invdate,
		status,
		duedate,
		amount,
		currency,
		customername,
		description,
		paid,
		_id,
	} = props.invoice

	const nowDate = Date.now()
	const nowMinusDueDate = nowDate - Date.parse(duedate)
	const nowMinusDueDateInDays = (nowMinusDueDate / 1000 / 60 / 60 / 24) * -1
	const dueInDays = Math.ceil(nowMinusDueDateInDays)

	const redIfOverdue = {
		color: dueInDays > 0 ? 'black' : '#de5300',
	}

	const handleInvoiceCheckbox = () => {
		props.handleInvoiceCheckbox(_id)
	}

	return (
		<li className='mb-2'>
			<Form.Check.Label>
				<Form.Check.Input type='checkbox' onChange={handleInvoiceCheckbox} />
				<p style={redIfOverdue}>
					<strong>{invnumber}</strong>, {moment(invdate).format('DD.MM.YYYY')}
				</p>
			</Form.Check.Label>
			<p>
				Due: {moment(duedate).format('DD.MM.YYYY')} (
				<strong style={redIfOverdue}>in {dueInDays} days</strong>)
			</p>
			<p>
				<strong>{customername}</strong>, {description}
			</p>
			<p>
				<strong>
					{currency} {amount}{' '}
				</strong>{' '}
				- {status}
			</p>
			{paid != 0 && (
				<p style={{ color: '#ab6e4a' }}>
					Already paid:{' '}
					<strong>
						{currency} {paid}
					</strong>
				</p>
			)}
		</li>
	)
}

propTypes = {
	invoice: PropTypes.object,
	handleInvoiceCheckbox: PropTypes.func,
}

export default Invoice
