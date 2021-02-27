import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'
import { Form } from 'react-bootstrap'

const Pair = props => {
	const {
		invoiceNumber,
		invoiceDate,
		customer,
		invoiceAmount,
		currency,
		paymentDate,
		_id,
	} = props.pair

	const handlePairCheckbox = () => {
		props.handlePairCheckbox(_id)
	}

	return (
		<li className='mb-2'>
			<Form.Check.Label>
				<Form.Check.Input type='checkbox' onChange={handlePairCheckbox} />
				<p>
					<strong>{invoiceNumber}</strong>, {moment(invoiceDate).format('DD.MM.YYYY')}:{' '}
					<strong>
						{currency} {invoiceAmount}
					</strong>
					, {customer} - paid on: <em>{paymentDate}</em>
				</p>
			</Form.Check.Label>
		</li>
	)
}

Pair.propTypes = {
	pair: PropTypes.object,
}

export default Pair
