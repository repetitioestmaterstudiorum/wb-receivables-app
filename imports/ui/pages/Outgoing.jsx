import React from 'react'
import { PaymentsCollection } from '../../api/collections/payments'
import { useTracker } from 'meteor/react-meteor-data'
import { Container, Row, Col } from 'react-bootstrap'

const Outgoing = () => {
	// initial data from mongodb
	const payments = useTracker(() => {
		return PaymentsCollection.find(
			{
				subject: 'Belastung',
			},
			{ sort: { createdAt: -1 }, limit: 10 }
		).fetch()
	})

	return (
		<Container>
			<Row>
				<Col>
					<h1>Outgoing payments:</h1>
					<h2>(Showing only the last 10)</h2>
					{payments.length === 0 ? (
						<p>No outgoing payments..</p>
					) : (
						<div>
							{payments &&
								payments.map(payment => (
									<p key={payment._id}>
										<strong>{payment.transactionDate}: </strong>
										{payment.transactionCurrency} {payment.transaction} (new
										balance: {payment.newBalance})
									</p>
								))}
						</div>
					)}
				</Col>
			</Row>
		</Container>
	)
}

export default Outgoing
