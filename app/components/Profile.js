import React from 'react';
import { Link } from 'react-router-dom';
import Constants from '../../constants';
import userHome from '../../services/userHomeService';
import Header from './common/Header';
import Footer from './common/Footer';
import { confirmAlert } from 'react-confirm-alert';



class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
   

  }
  

  render() {


    return (
      <div>

        <Header pathName={this.props.location.pathname}/>
				
				<div className="main_content">
				<div className="container">
					<h1 className="main_heading">Profile</h1>
					<div className="profile">
						<div className="vertical-tabs-container">
							<div className="vertical-tabs"> <a href="javascript:;" className="js-vertical-tab vertical-tab is-active" rel="tab1">Basic Information</a> <a href="javascript:;" className="js-vertical-tab vertical-tab" rel="tab2">Amenities Interested</a> <a href="javascript:;" className="js-vertical-tab vertical-tab" rel="tab3">Most important to me?</a> </div>
							<div className="vertical-tab-content-container"> <a href="" className="js-vertical-tab-accordion-heading vertical-tab-accordion-heading is-active" rel="tab1">Basic Information</a>
								<div id="tab1" className="js-vertical-tab-content vertical-tab-content">
									<h2>Basic Information</h2>
								
									<div className="basic-info">
										<div className="form-group form-style">
											<label htmlFor="">First Name</label>
											<input type="text" className="form-control" id="" placeholder="First Name"/>
										</div>
										<div className="form-group form-style">
											<label htmlFor="">Last Name</label>
											<input type="text" className="form-control" id="" placeholder="Last Name"/>
										</div>
										<div className="form-group form-style">
											<label htmlFor="">Email</label>
											<input type="text" className="form-control" id="" placeholder="Email"/>
										</div>
										<div className="form-group form-style">
											<label htmlFor="">Phone</label>
											<input type="text" className="form-control" id="" placeholder="Phone"/>
										</div>
										<div className="form-group form-style">
											<label htmlFor="">Address</label>
											<input type="text" className="form-control" id="" placeholder="Address"/>
										</div>
										<div className="form-group form-style">
											<label htmlFor="">City</label>
											<input type="text" className="form-control" id="" placeholder="City"/>
										</div>
										<div className="form-group form-style">
											<label htmlFor="">State</label>
											<select className="form-control" id="">
											<option value="">Select State</option>
											<option value="AL">Alabama</option>
											<option value="AK">Alaska</option>
											<option value="AZ">Arizona</option>
											<option value="AR">Arkansas</option>
											<option value="CA">California</option>
											<option value="CO">Colorado</option>
											<option value="CT">Connecticut</option>
											<option value="DE">Delaware</option>
											<option value="DC">District Of Columbia</option>
											<option value="FL">Florida</option>
											<option value="GA">Georgia</option>
											<option value="HI">Hawaii</option>
											<option value="ID">Idaho</option>
											<option value="IL">Illinois</option>
											<option value="IN">Indiana</option>
											<option value="IA">Iowa</option>
											<option value="KS">Kansas</option>
											<option value="KY">Kentucky</option>
											<option value="LA">Louisiana</option>
											<option value="ME">Maine</option>
											<option value="MD">Maryland</option>
											<option value="MA">Massachusetts</option>
											<option value="MI">Michigan</option>
											<option value="MN">Minnesota</option>
											<option value="MS">Mississippi</option>
											<option value="MO">Missouri</option>
											<option value="MT">Montana</option>
											<option value="NE">Nebraska</option>
											<option value="NV">Nevada</option>
											<option value="NH">New Hampshire</option>
											<option value="NJ">New Jersey</option>
											<option value="NM">New Mexico</option>
											<option value="NY">New York</option>
											<option value="NC">North Carolina</option>
											<option value="ND">North Dakota</option>
											<option value="OH">Ohio</option>
											<option value="OK">Oklahoma</option>
											<option value="OR">Oregon</option>
											<option value="PA">Pennsylvania</option>
											<option value="RI">Rhode Island</option>
											<option value="SC">South Carolina</option>
											<option value="SD">South Dakota</option>
											<option value="TN">Tennessee</option>
											<option value="TX">Texas</option>
											<option value="UT">Utah</option>
											<option value="VT">Vermont</option>
											<option value="VA">Virginia</option>
											<option value="WA">Washington</option>
											<option value="WV">West Virginia</option>
											<option value="WI">Wisconsin</option>
											<option value="WY">Wyoming</option>
											</select>
										</div>
										<div className="form-group form-style">
											<label htmlFor="">Zipcode</label>
											<input type="text" className="form-control" id="" placeholder="Zipcode"/>
										</div>
									</div>
									<div className="buttons">
										<button type="submit" className="btn sm-grey-btn font-weight-bold">Cancel</button>
										<button type="submit" className="btn sm-red-btn font-weight-bold">Save</button>
									</div>
									
								</div>
								<a href="" className="js-vertical-tab-accordion-heading vertical-tab-accordion-heading" rel="tab2">Amenities Interested</a>
								<div id="tab2" className="js-vertical-tab-content vertical-tab-content">
									<h2>Amenities Interested</h2>
								
									<div className="amenities-interested"> <a href="#">Air Conditioning</a> <a className="amenities-active" href="#">Carpet</a> <a href="#">Granite Countertops</a> <a href="#">Hardwood Floors</a> <a href="#">Patio</a> <a href="#">Stainless Steel Appliances</a> <a href="#">Washer And Dryer</a> <a className="amenities-active" href="#">Fitness Center</a> <a href="#">High Speed Internet Access</a> <a href="#">TZ Parcel Locker System</a> <a href="#">Lush Park-Like Grounds</a> <a href="#">Swimming Pool</a> <a className="amenities-active" href="#">Pets Allowed</a> <a href="#">Spa</a> <a href="#">Clubhouse</a> </div>
									<div className="buttons">
										<button type="submit" className="btn sm-grey-btn font-weight-bold">Cancel</button>
										<button type="submit" className="btn sm-red-btn font-weight-bold">Save</button>
									</div>
									
								</div>
								<a href="" className="js-vertical-tab-accordion-heading vertical-tab-accordion-heading" rel="tab3">Most important to me?</a>
								<div id="tab3" className="js-vertical-tab-content vertical-tab-content">
									<h2>Most important to me?</h2>
									
									<div className="most-important-wrap">
										<div className="most-important-item">
											<h3><i className="mdi mdi-arrow-all"></i> 1. Near to my work address</h3>
											<div className="form-group form-style">
												<textarea className="form-control" id="" rows="3" placeholder="Enter work address"></textarea>
											</div>
										</div>
										<div className="most-important-item">
											<h3><i className="mdi mdi-arrow-all"></i> 2. Must have (Amenities) </h3>
											<div className="amenities-interested"> <a href="#">Air Conditioning</a> <a className="amenities-active" href="#">Carpet</a> <a href="#">Granite Countertops</a> <a href="#">Hardwood Floors</a> <a href="#">Patio</a> <a href="#">Stainless Steel Appliances</a> <a href="#">Washer And Dryer</a> <a className="amenities-active" href="#">Fitness Center</a> <a href="#">Spa</a> <a href="#">High Speed Internet Access</a> <a href="#">TZ Parcel Locker System</a> <a href="#">Lush Park-Like Grounds</a> <a href="#">Swimming Pool</a> <a className="amenities-active" href="#">Pets Allowed</a> <a href="#">Clubhouse</a> </div>
										</div>
										<div className="most-important-item">
											<h3><i className="mdi mdi-arrow-all"></i> 3. Near to Public Transportation</h3>
											<div className="form-group form-style">
												<input type="text" className="form-control" id="" placeholder="Zipcode"/>
												<span className="search-warp"><i className="mdi mdi-magnify"></i></span> </div>
										</div>
									</div>
									<div className="buttons">
										<button type="submit" className="btn sm-grey-btn font-weight-bold">Cancel</button>
										<button type="submit" className="btn sm-red-btn font-weight-bold">Submit</button>
									</div>
									
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
<Footer chatId={0}/>
      </div>
    )
  }


}

export default Profile
