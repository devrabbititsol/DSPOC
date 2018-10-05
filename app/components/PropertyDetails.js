import React from 'react';
import { Link } from 'react-router-dom';
import Constants from '../../constants';
import userHome from '../../services/userHomeService';
import Header from './common/Header';
import Footer from './common/Footer';
import { confirmAlert } from 'react-confirm-alert';
import $ from 'jquery';
import AppController from '../controllers/appController';
class PropertyDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      propertyDetails: [],
      loaderStatus:false,
      Walkscore:0,
      crimestatics:false
    }
    this.streetView = this.streetView.bind(this);
    this.crimestaticsShow = this.crimestaticsShow.bind(this);
  }
  async componentWillMount() {
    //console.log(this.props.match.params.ItineraryPropertyID);
    await this.setState({loaderStatus:true})
    const propertyDetails = await userHome.propertyDetails({ItineraryPropertyID: this.props.match.params.ItineraryPropertyID});
    await this.setState({loaderStatus:false, propertyDetails:propertyDetails.recordset.length > 0 ? propertyDetails.recordset[0] : []});
    
    //console.log(this.state);
    await this.mapLoad();

  }
  async crimestaticsShow(){
    this.setState({crimestatics:!this.state.crimestatics});
  }
  async componentDidMount(){
      
  //await this.mapLoad()
   }
 
   mapLoad(){
     setTimeout(function() {
       var geocoder = new google.maps.Geocoder();
       
        var address = this.state.propertyDetails.Address+', '+this.state.propertyDetails.City+', '+this.state.propertyDetails.StateCode+', '+this.state.propertyDetails.ZipCode
       
       const _this= this
       geocoder.geocode( { 'address': address}, async function(results, status) {
       if (status == google.maps.GeocoderStatus.OK) {
           var latitude = results[0].geometry.location.lat();
           var longitude = results[0].geometry.location.lng();
           await _this.setState({latitude, longitude})
           await _this.loadMap(_this.state.propertyIndex);
           const Walkscore = await AppController.getIndividualWalkscore(address, latitude, longitude);
           _this.setState({walkScore: Walkscore});
           
           } 
      })
     }.bind(this), 2000); 
 
   }
 
   loadMap(index){
     
       var directionsService = new google.maps.DirectionsService();
       var directionsDisplay = new google.maps.DirectionsRenderer();
        this.setState({'directionsService': directionsService});
        this.setState({'directionsDisplay': directionsDisplay});
    var locations = {
     lat: Number(this.state.latitude),
     lng: Number(this.state.longitude)
   };
 
      var map = new google.maps.Map(document.getElementById('map'), {
       zoom: 15,
       center: locations,
       mapTypeId: google.maps.MapTypeId.ROADMAP
     });
    
     this.state.directionsDisplay.setMap(map);
     var address = this.state.propertyDetails.Address+', '+this.state.propertyDetails.City+', '+this.state.propertyDetails.StateCode;
     
     var contentString = '<div id="content">'+address+'</div>';
     var infowindow = new google.maps.InfoWindow({content: contentString});
     var marker = new google.maps.Marker({position: locations, map: map});
 
     marker.addListener('click', function () {
       infowindow.open(map, marker);
     });
     
   }
 
  async streetView(){
    var locations = {
      lat: Number(this.state.latitude),
      lng: Number(this.state.longitude)
    };
    setTimeout(function () { 
      var panorama = new google.maps.StreetViewPanorama(
       document.getElementById('pano'), {
         position: locations,
         pov: {
           heading: 34,
           pitch: 10
         },
         zoom: 1
       });}, 500);
  }



  render() {


    return (
      <div>

        <Header/>
        {this.state.loaderStatus == false ? <div>
        <div className="fullslider inner">
        
        <img src={'https://s3-us-west-1.amazonaws.com/destination-services-itinerary/'+this.state.propertyDetails.Photo+'.jpg'} alt=""/>

        <div className="bg-shadow"></div>
        <div className="slider-dtls">
          
          <div className="container">
          <div className="slider-info">
            <h4>{this.state.propertyDetails.Community}</h4>
            <p>{this.state.propertyDetails.Address}, {this.state.propertyDetails.City} {this.state.propertyDetails.StateCode} {this.state.propertyDetails.ZipCode}</p>
          </div>
            </div>
        </div>
      </div>
      <div className="container-fluid propertie-dtls_div">
        <div className="container">
          <ul className="propertie-dtls d-flex">
            <li>Size <strong>{this.state.propertyDetails.Size}</strong></li>
            <li>Sq Ft <strong>{this.state.propertyDetails.SqFt != null ? this.state.propertyDetails.SqFt : '-'}</strong></li>
            <li>Price <strong>$ {this.state.propertyDetails.OneByOneRentLo}.00</strong></li>
            <li>App Fee <strong>$ {this.state.propertyDetails.ApplicationFeeLo}.00</strong></li>
            <li>Deposite <strong>$ {this.state.propertyDetails.DepositLo}.00</strong></li>
            <li>Walkscore <strong>{this.state.walkScore}</strong></li>
          </ul>
        </div>	
      </div>
        
      <div className="main_content mt-5">
        <div className="container travel-sec">
        <div className="row">
          <div className="propertie-item-dtls">
                <ul className="list-inline d-flex">
                  <li><i className="fa fa-globe"></i> <a href={this.state.propertyDetails.Website}>{this.state.propertyDetails.Website}</a></li>
                  <li><i className="fa fa-mobile"></i> {this.state.propertyDetails.Phone}</li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
          <div className="col-md-8">
      
              
      
            <div className="propertie-tabs">
      
             
              <ul className="nav" role="tablist">
              <li role="presentation" className="nav-item"><a href="#one" aria-controls="home" role="tab" data-toggle="tab" className="active"> Photos</a></li>
              <li role="presentation" className="nav-item"><a href="#two" aria-controls="profile" role="tab" data-toggle="tab"><i className="icon icon-432"></i> Map</a></li>
              <li role="presentation" className="nav-item"><a href="#three" aria-controls="messages" role="tab" data-toggle="tab" onClick={this.streetView.bind(this)}><i className="icon icon-425"></i> Street view</a></li>
              </ul>
      
             
              <div className="tab-content">
              <div role="tabpanel" className="tab-pane active" id="one">
              <img src={'https://s3-us-west-1.amazonaws.com/destination-services-itinerary/'+this.state.propertyDetails.Photo+'.jpg'} alt=""/>
              </div>
              <div role="tabpanel" className="tab-pane" id="two">
              <div id={'map'} style={{'width': '100%','height': '460px'}}></div>  
              </div>
              <div role="tabpanel" className="tab-pane" id="three">
              <div id={'pano'} style={{'width': '100%','height': '460px'}}></div> 
              </div>
              </div>
      
            </div>
      
          </div>
          <div className="col-md-4">
            
            <div className="widget">
              <h4 className="widget-title mb-2 pl-3 pt-3">Amenities</h4>
              <div className="widget_header">
                <ul className="nav nav-tabs community_tabs" role="tablist">
                <li role="presentation"><a href="#community" aria-controls="home" role="tab" data-toggle="tab" className="active">Community</a></li>
                <li role="presentation"><a href="#appartments" aria-controls="profile" role="tab" data-toggle="tab">Apartments</a></li>
                </ul>
              </div>
              <div className="widget_body">
                <div className="tab-content">
                  <div role="tabpanel" className="tab-pane active" id="community">
                    <ul className="amenities_list">
                    {
                      this.state.propertyDetails.CommunityAmenities.split(',').map((row,index) => {
                        return <li key={index}>{row}</li>
                      })
                    }
                    </ul>
                  </div>
                  <div role="tabpanel" className="tab-pane" id="appartments">
                  <ul className="amenities_list">
                    {
                      this.state.propertyDetails.ApartmentAmenities.split(',').map((row,index) => {
                        return <li key={index}>{row}</li>
                      })
                    }
                      
                    </ul>
                  </div>
                </div>
      
              </div>
            </div>
          </div>
        </div>

        <div className="neighborhood_btn row justify-content-sm-center">
		<div className="col col-sm-5">
			<a href="javascript:void(0)" onClick={this.crimestaticsShow.bind(this)} className="btn btn-default btn-rounded">More on Neighborhood <i className={this.state.crimestatics == true ? "fa fa-chevron-up":"fa fa-chevron-down"}></i></a>
		</div>
	</div>
{this.state.crimestatics == true ? 
        <div className="neighborhood_table row mb-5">
		<div className="headerpart col-md-12">640 Vital Statistics, 35 Condition Alerts Found.</div>
		<div className="col">
			<div className="realestate">
				<i className="mdi mdi-office-building"></i>
				<p>real Estate</p>
			</div>
			<div className="statistics">
				<span>44</span>
				<p>statistics</p>
			</div>
			<div className="alerts">
				<i className="fa fa-exclamation-circle"></i>
				<p>3 Alerts</p>
			</div>
		</div>
		<div className="col">
			<div className="realestate">
				<i className="mdi mdi-account-group"></i>
				<p>Demographics</p>
			</div>
			<div className="statistics">
				<span>136</span>
				<p>statistics</p>
			</div>
			<div className="alerts">
				<i className="fa fa-exclamation-circle"></i>
				<p>1 Alerts</p>
			</div>
		</div>
		<div className="col">
			<div className="realestate">
				<i className="mdi mdi-pistol"></i>
				<p>crimes</p>
			</div>
			<div className="statistics">
				<span>67</span>
				<p>statistics</p>
			</div>
			<div className="alerts">
				<i className="fa fa-exclamation-circle"></i>
				<p>3 Alerts</p>
			</div>
		</div>
		<div className="col">
			<div className="realestate">
				<i className="mdi mdi-school"></i>
				<p>schools</p>
			</div>
			<div className="statistics">
				<span>65</span>
				<p>statistics</p>
			</div>
			<div className="alerts">
				<i className="fa fa-exclamation-circle"></i>
				<p>13 Alerts</p>
			</div>
		</div>
		<div className="col">
			<div className="realestate">
				<i className="mdi mdi-trending-up"></i>
				<p>trends & forecasts</p>
			</div>
			<div className="statistics">
				<span>328</span>
				<p>statistics</p>
			</div>
			<div className="alerts">
				<i className="fa fa-exclamation-circle"></i>
				<p>15 Alerts</p>
			</div>
		</div>
	</div> : "" }
      </div>
      </div>
     </div> : <div className="loader"><img src="/images/ajax-loader.gif" alt=""/></div>}
     <Footer/>
      </div>
    )
  }


}

export default PropertyDetails
