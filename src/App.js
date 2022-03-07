import React, { Component } from 'react'
import axios from 'axios'
import { Route, Link } from 'react-router-dom'
import LoginForm from './components/LoginForm/LoginForm'
import SignupForm from './components/SignupForm/SignupForm'
import Home from './pages/Home'
import './App.css'
import Patient from './pages/Patient'
import { Nav, Navbar, NavItem } from "react-bootstrap"

const DisplayLinks = props => {
	if (props.loggedIn) {
		return (
			<Navbar collapseOnSelect className="navbar navbar-default navbar-fixed-top">
				<Navbar.Header>
					<Navbar.Brand>
						<a href="/">Patient Healthcare</a>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav pullRight>
						<NavItem className="nav-item" eventKey={1}>
							<Link to="/">
								Reminders
							</Link>
						</NavItem>					        
						<NavItem className="nav-item" eventKey={3}>
							<Link to="/patient">
								Patient Profile
							</Link>
						</NavItem> 
						<NavItem className="nav-item" eventKey={2}>
							<Link to="#" onClick={props._logout}>
								Logout
							</Link>
						</NavItem>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	} else {
		return (
			<Navbar collapseOnSelect className="navbar navbar-default navbar-fixed-top">
				<Navbar.Header>
					<Navbar.Brand>
						<a href="/">Patient healthcare </a>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav pullRight>					
						<NavItem className="nav-item" eventKey={1}>
							<Link to="/">
								Home
							</Link>
							</NavItem>
						<NavItem className="nav-item" eventKey={2}>
							<Link to="/login">
								Login
							</Link>
						</NavItem>
						<NavItem className="nav-item" eventKey={3}>
							<Link to="/signup">
								Signup
							</Link>
						</NavItem> 
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

class App extends Component {
	constructor() {
		super()
		this.state = {
			loggedIn: false,
			user: null,
			patient: null	
		}
		this._logout = this._logout.bind(this)
		this._login = this._login.bind(this)
	}
	
	componentDidMount() {
		axios.get('/auth/user').then(response => {
			console.log(response.data)
			if (!!response.data.user) {
				console.log(`${response.data.user.email} is being logged in`);
				this.setState({
					loggedIn: true,
					user: response.data.user
				})
			} else {
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		})
	}

	_logout(event) {
		event.preventDefault()
		console.log('logging out')
		axios.post('/auth/logout').then(response => {
			console.log(response.data)
			if (response.status === 200) {
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		})
	}

	_login(email, password) {
		axios
			.post('/auth/login', {
				email,
				password
			})
			.then(response => {
				console.log(response)
				if (response.status === 200) {
					// update the state
					this.setState({
						loggedIn: true,
						user: response.data.user
					})
				}
			})
	}

	render() {
		return (
			<div className="App">
				{/* LINKS to our different 'pages' */}
				<DisplayLinks _logout={this._logout} loggedIn={this.state.loggedIn} user={this.state.user} />
				{/*  ROUTES */}
				{/* <Route exact path="/" component={Home} /> */}
				<Route exact path="/" render={() => <Home user={this.state.user} />} 
				/>
				<Route exact path="/patient" render={() => <Patient user={this.state.user} />} 
				/>
				<Route exact path="/login" render={() => <LoginForm _login={this._login} />}
				/>
				<Route exact path="/signup" component={SignupForm} />
			</div>
		)
	}
}

export default App
