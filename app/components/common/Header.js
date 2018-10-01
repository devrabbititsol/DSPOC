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
    
    <div className="main_header">
	<Link to="/home"><img src="/images/logo_login.png" className="head_logo" alt=""/>	</Link>
	
	<div className="dropdown">
		<span><img src="/images/img2.jpg" alt=""/></span>
    <a className="dropdown-toggle btn" data-toggle="dropdown" aria-expanded="false">
       Ashok K
    </a>
    <div className="dropdown-menu">
      <a className="dropdown-item" href="/logout">Logout</a>
    </div>
  </div>
</div>
    )
  }


}

export default Header
