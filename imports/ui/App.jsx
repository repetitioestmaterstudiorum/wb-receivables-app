import React from 'react'
import Routes from './Routes'
import { UserProvider } from './context/UserContext'

Meteor.subscribe('invoices')
Meteor.subscribe('payments')
Meteor.subscribe('invpaymentpairs')

const App = () => (
	<UserProvider>
		<Routes />
	</UserProvider>
)

export default App
