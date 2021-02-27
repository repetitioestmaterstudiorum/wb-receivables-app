import { Meteor } from 'meteor/meteor'
import React, { createContext, useState, useEffect } from 'react'

export const UserContext = createContext({})

export const UserProvider = props => {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const checkLoginStatus = () => {
		return Meteor.userId() ? true : false
	}

	const logIn = (email, password) => {
		Meteor.loginWithPassword(email, password, function (err) {
			if (err) {
				alert(err.message)
				setIsLoading(false)
			} else {
				setIsLoggedIn(true)
				setIsLoading(false)
			}
		})
	}

	const logOut = () => {
		Meteor.logout()
		setIsLoggedIn(false)
		setIsLoading(false)
	}

	useEffect(() => {
		setIsLoggedIn(checkLoginStatus())
	}, [])

	return (
		<UserContext.Provider value={{ isLoggedIn, logIn, logOut, isLoading, setIsLoading }}>
			{props.children}
		</UserContext.Provider>
	)
}
