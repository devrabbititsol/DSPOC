'use strict'
/* Importing the node modules, child components, services and controllers used */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import passwordHash from 'password-hash';

// Import routing components
import { browserHistory } from 'react-router';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import Logout from './components/common/Logout'
import Login from './components/common/Login'
import Home from './components/Home'
import HomeFinding from './components/HomeFinding'
import SendInvitation from './components/SendInvitation'
import Profile from './components/Profile'
import Consultant from './components/Consultant'
import UnauthorizePage from './components/common/UnauthorizePage'
import Constants from '../constants';
import PropertyDetails from './components/PropertyDetails';
/* Load the components based on Local storage elements empty or not */
function decide() {
	//console.log(Object.keys(localStorage).length);
  if(localStorage.getItem('LoginDetails') == null) {
  	return false;
  } else {
		
		return true;
  }
}

export default <Router history={browserHistory}>
	<div>
	
		<Switch>
			 
				<Route exact path="/logout"
	                render={(data) => {
	                return decide() ? <Logout {...data}/> : <Logout {...data}/>;
	      }} />
				<Route exact path="/login"
	                render={(data) => {
	                return decide() ? <Home {...data}/> : <Login {...data}/>;
	      }} />
				
				</Switch>
				{localStorage.getItem('type') == 'guest' ?	
		<Switch>
			<Route exact path="/"
	                render={(data) => {
	                return decide() ? <Home {...data}/> : <Login {...data}/>;
	      }} />
		  
			  <Route exact path="/home"
	                render={(data) => {
	                return decide() ? <Home {...data}/> : <Login {...data}/>;
	      }} />
				<Route exact path="/homefinding"
	                render={(data) => {
	                return decide() ? <HomeFinding {...data}/> : <Login {...data}/>;
	      }} />
				<Route exact path="/profile"
	                render={(data) => {
	                return decide() ? <Profile {...data}/> : <Login {...data}/>;
	      }} />
				<Route exact path="/consultant"
	                render={(data) => {
	                return decide() ? <Consultant {...data}/> : <Login {...data}/>;
	      }} />
				<Route exact path="/propertydetails/:ItineraryPropertyID"
	                render={(data) => {
	                return decide() ? <PropertyDetails {...data}/> : <Login {...data}/>;
	      }} />
				
						
				
		</Switch> : <Switch>
		<Route exact path="/"
	                render={(data) => {
	                return decide() ? <SendInvitation {...data}/> : <Login {...data}/>;
	      }} />
		  <Route exact path="/send-invitation"
	                render={(data) => {
	                return decide() ? <SendInvitation {...data}/> : <Login {...data}/>;
	      }} />
		
      
		</Switch> }
			
	</div>
</Router>
