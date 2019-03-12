import React from 'react';
import { Link } from 'react-router-dom';
import Constants from '../../../constants';

//let authContext = new AuthenticationContext({
//clientId: Constants.AGN_CONSTANTS.AZURE_CLIENT_ID,
//postLogoutRedirectUri: Constants.AGN_CONSTANTS.AZURE_LOGOUT_URL
//});


class logout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }


  }
  async componentWillMount() {
  let localEvents = localStorage.getItem('events');
  localStorage.clear();
  localStorage.setItem('events', localEvents);
  this.props.history.push('/login');

  }


  render() {


    return (
      <div>

        <div className="login-container d-flex justify-content-center align-items-center">
          <div className="mc_logo">
            <img src="images/ReloTool-logo.png" />
          </div>
          <div className="clear-both"/>
          <div className="logout-text">
            <h2>Logout successfully</h2>
          </div>
          <div className="logout-btn">
            <Link to="/login" className="btn btn-primary btn-rounded">Login Page</Link>
          </div>
        </div>


      </div>
    )
  }


}

export default logout
