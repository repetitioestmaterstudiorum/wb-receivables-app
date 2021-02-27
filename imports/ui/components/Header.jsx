import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const Header = () => {
	const { logOut, setIsLoading } = useContext(UserContext)

	const handleLogout = () => {
		setIsLoading(true)
		logOut()
	}

	return (
		<Container className='header'>
			<Navbar collapseOnSelect expand='sm' bg='dark' variant='dark' className='mb-2'>
				<Navbar.Toggle aria-controls='responsive-navbar-nav' />
				<img src='logo.png' alt='wB' style={{ maxWidth: '40px' }} />
				<Navbar.Collapse id='responsive-navbar-nav' className='mt-2 mt-sm-0 ml-0 ml-sm-1'>
					<Nav className='mr-auto'>
						<NavLink to='/open' exact activeClassName='active'>
							<Nav.Link as='span' href='#Open'>
								Open
							</Nav.Link>
						</NavLink>
						<NavLink to='/paid' exact activeClassName='active'>
							<Nav.Link as='span' href='#Paid'>
								Paid
							</Nav.Link>
						</NavLink>
						<NavLink to='/deleted' exact activeClassName='active'>
							<Nav.Link as='span' href='#Deleted'>
								Deleted
							</Nav.Link>
						</NavLink>
						<NavLink to='/outgoing' exact activeClassName='active'>
							<Nav.Link as='span' href='#Outoing'>
								(Outgoing Payments)
							</Nav.Link>
						</NavLink>
						<NavLink to='#' onClick={handleLogout}>
							<Nav.Link as='span' href='#Logout' style={{ color: '#ffffff80' }}>
								Logout
							</Nav.Link>
						</NavLink>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</Container>
	)
}

export default Header
