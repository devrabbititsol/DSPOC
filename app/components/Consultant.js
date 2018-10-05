import React from 'react';
import { Link } from 'react-router-dom';
import Constants from '../../constants';
import userHome from '../../services/userHomeService';
import Header from './common/Header';
import Footer from './common/Footer';
import { confirmAlert } from 'react-confirm-alert';



class Consultant extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
   

  }
  

  render() {

    return (
      <div>

        <Header pathName={this.props.location.pathname}/>
				<div className="main_content" role="main">
        <div className="jumbotron inner_ban position-relative">
          <div className="div_overly"></div>
              <div className="container text-center position-relative">
                <h1 className="text-light">Hi, John Doe</h1>
                
              </div>
          <div className="d-inline-block p_pic rounded-circle">
              <img src="/images/p_pic.jpg" alt=""/>	
            </div>
          
            </div>
        
        <div className="container">
          <div className="c_dtls row justify-content-md-center">
            <div className="col-md-8 text-center">
              <h3 className="text-center mb-4">Ashok Kandipati </h3>
              <p>My name is <strong>Ashok Kandipati</strong> and I will be your DS Consultant for the duration of your stay with us at SuiteAmerica. I’m looking forward to our meeting. Please let me know if I can assist you in any way. Here is a little info about me </p>
              <div className="box-shadow mt-5 mb-5">
                <div className="text-left row consultant_table">
                  <div className="col-md-6">
                    <p>Home Town</p>
                    <p>Mountain View CA</p>
                  </div>
                  <div className="col-md-6">
                    <p>Years with SuiteAmerica</p>
                    <p>15 years</p>
                  </div>
                  <div className="text-left border-0 pt-3">
                    <p>Fun Fact</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
                  </div>
                </div>
                
              </div>
              
              <p className="bye-msg">See you on <strong>Monday, November 8th 2018</strong> for your personalized tour!</p>
            </div>
          </div>
        </div>	
        
      </div>
<Footer chatId={0}/>
      </div>
    )
  }


}

export default Consultant
