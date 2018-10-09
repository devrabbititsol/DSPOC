import React from 'react';
import { Link } from 'react-router-dom';
import Constants from '../../constants';
import userHome from '../../services/userHomeService';
import Header from './common/Header';
import Footer from './common/Footer';
import { confirmAlert } from 'react-confirm-alert';



class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {    }

	}

  render() {


    return (
      <div>

        <Header pathName={this.props.location.pathname}/>
        <div className="landing-main">	</div>
	<div className="container">
		<div className="landing-modules-wrap">
		<h1 className="landing-modules-title">What we do</h1>
		<ul className="landing-modules">
			<li className="anim"><a href="/homefinding"><img src="/images/home.svg" alt=""/></a>
				<span>HOME FINDING</span>
			</li>
			<li className="anim"><a href="#"><img src="/images/mover.svg" alt=""/></a>
				<span>SETTLE IN SERVICES</span>
			</li>
			<li className="anim"><a href="#"><img className="ds-car" src="/images/car.png" alt=""/></a>
				<span>DESTINATION SERVICES</span>
			</li>
		</ul>
	</div>
		</div>
	

					
      </div>
    )
  }


}

export default Home
