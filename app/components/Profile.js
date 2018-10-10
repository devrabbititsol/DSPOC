import React from 'react';
import { Link } from 'react-router-dom';
import Constants from '../../constants';
import userHome from '../../services/userHomeService';
import Header from './common/Header';
import Footer from './common/Footer';
import { confirmAlert } from 'react-confirm-alert';
import $ from "jquery";

var placeholder = document.createElement("li");
placeholder.className = "placeholder";

class List extends React.Component {
  constructor(props) {
    super(props);
		this.state = {
			colors:props.colors

		};

		
		
	}
	
	

  dragStart(e) {
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.dragged);
  }
  dragEnd(e) {
    this.dragged.style.display = 'block';
    //this.dragged.parentNode.removeChild(placeholder);
    
    // update state
    var data = this.state.colors;
    var from = Number(this.dragged.dataset.id);
    var to = Number(this.over.dataset.id);
    if(from < to) to--;
    data.splice(to, 0, data.splice(from, 1)[0]);
    this.setState({colors: data});
  }
  dragOver(e) {
    e.preventDefault();
    this.dragged.style.display = "none";
    if(e.target.className === 'placeholder') return;
    this.over = e.target;
    e.target.parentNode.insertBefore(placeholder, e.target);
  }
	render() {
    var listItems = this.state.colors.map((item, i) => {
		if(item == '.'){

	
      return (
        <li 
          data-id={i}
          key={i}
          draggable='true'
          onDragEnd={this.dragEnd.bind(this)}
          onDragStart={this.dragStart.bind(this)}>{item}<div className="most-important-item">
		  <h3><i className="mdi mdi-arrow-all"></i> {i+1}. Near to my work address</h3>
		  <div className="form-group form-style">
			  <textarea className="form-control" id="" rows="3" placeholder="Enter work address"></textarea>
		  </div>
	  </div></li>
      )
		 }
		 if(item == '..'){
			
				
						return (
							<li 
								data-id={i}
								key={i}
								draggable='true'
								onDragEnd={this.dragEnd.bind(this)}
								onDragStart={this.dragStart.bind(this)}>{item}<div className="most-important-item">
								<h3><i className="mdi mdi-arrow-all"></i> {i+1}. Must have (Amenities) </h3>
								<div className="amenities-interested"> {this.props.Amenities.map((ameniti, key) => {
                            if (this.props.mostImpartentActive.includes(key))
                              //checks is ameniti is active or not
                              return (
                                <a
																  href="javascript:void(0)"
                                  key={key}
                                  className="amenities-active"
                                  onClick={this.props.mostImpartentActiveFunc.bind(this,key)}
                                >
                                  {ameniti}
                                </a>
                              );
                            else
                              return (
                                <a
																  href="javascript:void(0)"
                                  key={key}
                                  onClick={this.props.mostImpartentActiveFunc.bind(this,key)}
                                >
                                  {ameniti}
                                </a>
                              );
                          })} </div>
							</div></li>
						)
					 }
					 if(item == '...'){
						
							
									return (
										<li 
											data-id={i}
											key={i}
											draggable='true'
											onDragEnd={this.dragEnd.bind(this)}
											onDragStart={this.dragStart.bind(this)}>{item}<div className="most-important-item">
											<h3><i className="mdi mdi-arrow-all"></i> {i+1}. Near to Public Transportation</h3>
											<div className="form-group form-style">
												<input type="text"  onChange={this.props.setLocation.bind(this, "publictarans-input")} className="form-control" id="publictarans-input" placeholder="Zipcode"/>
												<span className="search-warp"><i className="mdi mdi-magnify"></i></span> </div>
										</div></li>
									)
								 }		 
		}

		
		
		);
		return (
			<ul onDragOver={this.dragOver.bind(this)}>
        {listItems}
      </ul>
		)
	}
}

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
		colors: ['.', '..', '...'],
    Amenities: [
			"Air Conditioning",
			"Carpet",
			"Granite Countertops",
			"Hardwood Floors",
			"Patio",
			"Stainless Steel Appliances",
			"Washer And Dryer",
			"Fitness Center",
			"High Speed Internet Access",
			"TZ Parcel Locker System",
			"Lush Park-Like Grounds",
			"Swimming Pool",
			"Pets Allowed",
			"Spa",
			"Clubhouse"
		],
		mostImpartentActive: [1, 7, 13], //active list for Most important to me
		amenitiesInterestedActive: [1, 7, 13] //active list for Amenities Interested

	};

	this.mostImpartentActive = this.mostImpartentActive.bind(this);
	this.amenitiesInterestedActive = this.amenitiesInterestedActive.bind(this);
  this.setLocation = this.setLocation.bind(this);
  }
  
  setLocation(Id) {  
	var places = new google.maps.places.Autocomplete(document.getElementById(Id));
		
	}
	
	mostImpartentActive(key, e) {
    let mostImpartentActive = this.state.mostImpartentActive;
    if (this.state.mostImpartentActive.includes(key)) {
      let index = mostImpartentActive.indexOf(key);
      if (index > -1) {
        mostImpartentActive.splice(index, 1);
        this.setState(mostImpartentActive);
      }
    } else {
      mostImpartentActive.push(key);
      this.setState(mostImpartentActive);
    }
  }
  amenitiesInterestedActive(key, e) {
    let amenitiesInterestedActive = this.state.amenitiesInterestedActive;
    if (this.state.amenitiesInterestedActive.includes(key)) {
      let index = amenitiesInterestedActive.indexOf(key);
      if (index > -1) {
        amenitiesInterestedActive.splice(index, 1);
        console.log(amenitiesInterestedActive);
        this.setState(amenitiesInterestedActive);
      }
    } else {
      amenitiesInterestedActive.push(key);
      this.setState(amenitiesInterestedActive);
    }
  }

  async componentDidMount(){
	$(document)
	.ready(function () {
		jQuery(function($) {
	   $("#phone").intlTelInput();
   });
	});

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
											<input type="tel" className="form-control" id="phone" placeholder="Phone"/>
										</div>
										<div className="form-group form-style">
											<label htmlFor="">Relocated Address</label>
											<input id="relocated-input" type="text" className="form-control"  placeholder="Relocated Address" onChange={this.setLocation.bind(this, "relocated-input")}/>
											<span className="search-warp-profile"><i className="mdi mdi-magnify"></i></span>
										</div>
										<div className="form-group form-style">
											<label htmlFor="">Temporary Address</label>
											<input type="text" id="temporary-input" className="form-control" placeholder="Temporary Address" onChange={this.setLocation.bind(this, "temporary-input")}/>
											<span className="search-warp-profile"><i className="mdi mdi-magnify"></i></span>
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
								
								  <div className="amenities-interested">
                      {this.state.Amenities.map((ameniti, key) => {
                        if (this.state.amenitiesInterestedActive.includes(key))
                          //checks is ameniti is active or not
                          return (
                            <a
														  href="javascript:void(0)"
                              key={key}
                              className="amenities-active"
                              onClick={this.amenitiesInterestedActive.bind(this, key)}
                            >
                              {ameniti}
                            </a>
                          );
                        else
                          return (
                            <a
														  href="javascript:void(0)"
                              key={key}
                              onClick={this.amenitiesInterestedActive.bind(this, key)}
                            >
                              {ameniti}
                            </a>
                          );
                      })}
                    </div>
									<div className="buttons">
										<button type="submit" className="btn sm-grey-btn font-weight-bold">Cancel</button>
										<button type="submit" className="btn sm-red-btn font-weight-bold">Save</button>
									</div>
									
								</div>
								<a href="" className="js-vertical-tab-accordion-heading vertical-tab-accordion-heading" rel="tab3">Most important to me?</a>
								<div id="tab3" className="js-vertical-tab-content vertical-tab-content">
									<h2>Most important to me?</h2>
									<List colors={this.state.colors} mostImpartentActiveFunc={this.mostImpartentActive} setLocation={this.setLocation} {...this.state}/>
									{/*
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
												<input type="text"  onChange={this.setLocation.bind(this, "publictarans-input")} className="form-control" id="publictarans-input" placeholder="Zipcode"/>
												<span className="search-warp"><i className="mdi mdi-magnify"></i></span> </div>
										</div>
									</div>*/}
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
