import React from 'react';
import { Link } from 'react-router-dom';


class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }


  }

  render() {

    return (
    
      <header>
      
      <nav className="navbar navbar-expand-md bg-white main_header fixed-top navbar-light">
        <a className="navbar-brand" href="/"><img src="/images/logo_login.png" className="head_logo" alt=""/></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
        {localStorage.getItem('type') == 'guest' ?
          <ul className="navbar-nav mx-auto text-center">
            <li className={(this.props.pathName == '/homefinding') ? 'nav-item active' : 'nav-item'}>
              <Link className="nav-link" to="/homefinding">Home Finding </Link>
            </li>
            <li className={this.props.pathName == '/ccconsultant' ? 'nav-item active' : 'nav-item'}>
              <a className="nav-link" href="#">Settle-In-Services</a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">Destination Services</Link>
            </li>
            <li className={this.props.pathName == '/consultant' ? 'nav-item active' : 'nav-item'}>
              <Link className="nav-link" to="/consultant">My Consultant</Link>
            </li>
            <li className={this.props.pathName == '/schedules' ? 'nav-item active' : 'nav-item'}>
              <Link className="nav-link" to="/schedules">My Schedules</Link>
            </li>
          </ul> : <ul className="navbar-nav mx-auto text-center"></ul>}
          
			<div className="dropdown user-menu">
				<span><img src="/images/img2.jpg" alt=""/></span>
			<a className="dropdown-toggle btn" data-toggle="dropdown" aria-expanded="false">
			   {JSON.parse(localStorage.getItem('LoginDetails')).name}
			</a>
			<div className="dropdown-menu">
			 {localStorage.getItem('type') == 'guest' ? <a  href="/profile" className={this.props.pathName == "/profile" ? "dropdown-item actives" : "dropdown-item"}><i className="mdi mdi-account-outline"></i> Profile</a> : ""}
      <a className="dropdown-item" href="/logout"><i className="mdi mdi-power"></i> Logout</a>
			</div>
		  </div>
        </div>
      </nav>
    </header>
    )
  }


}

export default Header
