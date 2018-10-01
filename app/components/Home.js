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
    this.state = {
      propertyDetails: [],
      visitPropertyDetails:[],
      archivePropertyDetails:[],
      length:'',
      loaderStatus:false
    }
    this.updateDataToVisit = this.updateDataToVisit.bind(this);
    this.updateDataToArchive = this.updateDataToArchive.bind(this);
    this.calLength = this.calLength.bind(this);
		this.deleteConfirm = this.deleteConfirm.bind(this);
		this.updateDataToArchiveFromVisits = this.updateDataToArchiveFromVisits.bind(this);

  }
  async componentWillMount() {
		if(localStorage.getItem("propertyDetails") == null){
			await this.setState({loaderStatus:true})
			const propertyDetails = await userHome.getDetails({companyName: "nopricing", FileNum: "163288", itineraryId: "2"});
			await this.setState({loaderStatus:false, propertyDetails:propertyDetails.recordset,length:propertyDetails.recordset.length})
			await localStorage.setItem("propertyDetails", JSON.stringify(propertyDetails.recordset));
			await localStorage.setItem("OriginalPropertyDetails", JSON.stringify(propertyDetails.recordset));
			
	 } else {
		  await this.setState({
				propertyDetails : localStorage.getItem("propertyDetails") !== null ? JSON.parse(localStorage.getItem("propertyDetails")) : [],
				visitPropertyDetails : localStorage.getItem("visitPropertyDetails") !== null ? JSON.parse(localStorage.getItem("visitPropertyDetails")) : [],
				archivePropertyDetails : localStorage.getItem("archivePropertyDetails") !== null ? JSON.parse(localStorage.getItem("archivePropertyDetails")) : [],
				length : localStorage.getItem("propertyDetails") !== null ? JSON.parse(localStorage.getItem("propertyDetails")).length : 0
			})
			console.log(this.state);
	 }
  }
  async updateDataToVisit(Id, event){
    event.persist();
    let updatedProperties = this.state.propertyDetails;
    let updatedvisitPropertyDetails = this.state.visitPropertyDetails;
    let ItineraryIndex = _.findIndex(this.state.propertyDetails, { 'ItineraryPropertyID': Id });
    updatedvisitPropertyDetails.push(this.state.propertyDetails[ItineraryIndex]);
    delete updatedProperties[ItineraryIndex];
    await this.setState({propertyDetails:updatedProperties,visitPropertyDetails:updatedvisitPropertyDetails,length:Object.keys(updatedProperties).length});
		await localStorage.setItem("propertyDetails", JSON.stringify(this.filter_array(updatedProperties)));
		await localStorage.setItem("visitPropertyDetails", JSON.stringify(this.filter_array(updatedvisitPropertyDetails)));
    console.log(this.state);
  }
	 filter_array(test_array) {
    var index = -1,
        arr_length = test_array ? test_array.length : 0,
        resIndex = -1,
        result = [];

    while (++index < arr_length) {
        var value = test_array[index];

        if (value) {
            result[++resIndex] = value;
        }
    }

    return result;
}
  async updateDataToArchive(Id){

    let updatedProperties = this.state.propertyDetails;
    let updatedarchivePropertyDetails = this.state.archivePropertyDetails;
    let ItineraryIndex = _.findIndex(this.state.propertyDetails, { 'ItineraryPropertyID': Id });
    updatedarchivePropertyDetails.push(this.state.propertyDetails[ItineraryIndex]);
    delete updatedProperties[ItineraryIndex];
		await this.setState({propertyDetails:updatedProperties,archivePropertyDetails:updatedarchivePropertyDetails,length:Object.keys(updatedProperties).length});
		//console.log(JSON.stringify(this.filter_array(updatedProperties)));
		await localStorage.setItem("propertyDetails", JSON.stringify(this.filter_array(updatedProperties)));
		await localStorage.setItem("archivePropertyDetails", JSON.stringify(this.filter_array(updatedarchivePropertyDetails)));
 }
 async updateDataToArchiveFromVisits(Id){

	let updatedProperties = this.state.visitPropertyDetails;
	let updatedarchivePropertyDetails = this.state.archivePropertyDetails;
	let ItineraryIndex = _.findIndex(this.state.visitPropertyDetails, { 'ItineraryPropertyID': Id });
	updatedarchivePropertyDetails.push(this.state.visitPropertyDetails[ItineraryIndex]);
	delete updatedProperties[ItineraryIndex];
	await this.setState({visitPropertyDetails:updatedProperties,archivePropertyDetails:updatedarchivePropertyDetails,length:Object.keys(updatedProperties).length});
	await localStorage.setItem("visitPropertyDetails", JSON.stringify(this.filter_array(updatedProperties)));
	await localStorage.setItem("archivePropertyDetails", JSON.stringify(this.filter_array(updatedarchivePropertyDetails)));
}
 async deleteConfirm(Id, type, event){
  confirmAlert({
    title: '',
    message: 'Are you sure you want to delete this property?',
    buttons: [
      {
        label: 'Yes',
        onClick: type == 'consider' ? this.updateDataToArchive.bind(this, Id) : this.updateDataToArchiveFromVisits.bind(this, Id) 
      },
      {
        label: 'No',
        onClick: () => ""
      }
    ]
  })
 }

 async calLength(typeId, event){
  event.persist();
  //let propertyLenght = this.state.length;
   if(typeId == 1){
     await this.setState({length:Object.keys(this.state.propertyDetails).length})
   }
   if(typeId == 2){
    await this.setState({length:Object.keys(this.state.visitPropertyDetails).length})
  }
  if(typeId == 3){
    await this.setState({length:Object.keys(this.state.archivePropertyDetails).length})
  }
 }

  render() {


    return (
      <div>

        <Header/>
        <div className="main_content">
	<div className="container">
		<h1 className="main_heading">Properties <span className="badge badge-pill">{this.state.length}</span></h1>
		

		<ul className="nav nav-pills mb-5 mt-5 properties" id="pills-tab" role="tablist">
		  <li className="nav-item">
			<a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true" onClick={this.calLength.bind(this, 1)}><i className="fa fa-thumbs-up"></i> Considering</a>
		  </li>
		  <li className="nav-item">
			<a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false" onClick={this.calLength.bind(this, 2)}><i className="zmdi zmdi-walk"></i> Visits</a>
		  </li>
		  <li className="nav-item">
			<a className="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false" onClick={this.calLength.bind(this, 3)}><i className="fa fa-archive"></i> Archived</a>
		  </li>
		</ul>
		<div className="tab-content" id="pills-tabContent">
    {this.state.loaderStatus == true ? <div className="loader">
    <img src="images/ajax-loader.gif" alt=""/>
    </div> : ""}
		  <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
			  <div className="row">
{Object.keys(this.state.propertyDetails).length == 0 && this.state.loaderStatus == false ? <div className="noDataFound"><img src="images/noresults.png" width="312px" alt=""/>

<div>
				<h3>{Constants.DS_CONSTANTS.NO_DATA_FOUND}</h3>
			</div>
</div> : ""}
				{this.state.propertyDetails.map((row,index) =>{
				  return <div key={index} className="col-md-4">
					<div className="propertie-item">
						<div className="img-div">
						<Link to={"/propertydetails/"+row.ItineraryPropertyID}><img src={'https://s3-us-west-1.amazonaws.com/destination-services-itinerary/'+row.Photo+'.jpg'} alt=""/></Link>
							<div className="img-hover-dtls d-flex">
								<div className="flex-grow-1">
									<span>Price</span>
									<strong>${row.TotalFeesLo} <span className="badge badge-pill badge-danger">{row.Size}</span></strong>
								</div>
								<div className="flex-grow-1">
									<span>Available</span>
									<strong>Mar 30</strong>
								</div>
							</div>
						</div>
						<div className="propertie-item-dtls d-flex">
							<div>
								<img src="images/view_img.jpg" alt=""/>
							</div>
							<div>
								<h5>{row.Community}</h5>
								<p>{row.Address}, {row.City} {row.StateCode} {row.ZipCode}</p>
								
							{/*	<ul className="view_list ">
									<li><a href="#"><img src="images/img_list_1.png" alt=""/></a></li>
									<li><a href="#"><img src="images/img_list_2.png" alt=""/></a></li>
									<li><a href="#"><img src="images/img_list_3.png" alt=""/></a></li>
									<li><a href="#">+3</a></li>
    </ul> */}
							</div>
							
						</div>
						<div className="propertie-footer d-flex">
							<a href="#"><i className="fa fa-comments"></i>Chat</a>
							<a href="javascript:void(0)" onClick={this.updateDataToVisit.bind(this, row.ItineraryPropertyID)}><i className="fa fa-heart"></i>Favorite</a>
							<a href="javascript:void(0)" onClick={this.deleteConfirm.bind(this, row.ItineraryPropertyID, 'consider')}><i className="fa fa-trash"></i>Delete</a>
						</div>
					</div>
				</div> })
        }

			  </div>
			
		  </div>
		  <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
      
      <div className="row">
			{Object.keys(this.state.visitPropertyDetails).length == 0 && this.state.loaderStatus == false ? <div className="noDataFound"><img src="images/noresults.png"  width="312px" alt=""/>
			
			<div>
              <h3>{Constants.DS_CONSTANTS.NO_DATA_FOUND}</h3>
            </div>
			</div> : ""}
				{this.state.visitPropertyDetails.map((row,index) =>{
				  return <div key={index} className="col-md-4">
					<div className="propertie-item">
						<div className="img-div">
						<Link to={"/propertydetails/"+row.ItineraryPropertyID}><img src={'https://s3-us-west-1.amazonaws.com/destination-services-itinerary/'+row.Photo+'.jpg'} alt=""/></Link>
							<div className="img-hover-dtls d-flex">
								<div className="flex-grow-1">
									<span>Price</span>
									<strong>${row.TotalFeesLo} <span className="badge badge-pill badge-danger">1BR</span></strong>
								</div>
								<div className="flex-grow-1">
									<span>Available</span>
									<strong>Mar 30</strong>
								</div>
							</div>
						</div>
						<div className="propertie-item-dtls d-flex">
							<div>
								<img src="images/view_img.jpg" alt=""/>
							</div>
							<div>
								<h5>{row.Community}</h5>
								<p>{row.Address}, {row.City} {row.StateCode} {row.ZipCode}</p>
								
							{/*	<ul className="view_list ">
									<li><a href="#"><img src="images/img_list_1.png" alt=""/></a></li>
									<li><a href="#"><img src="images/img_list_2.png" alt=""/></a></li>
									<li><a href="#"><img src="images/img_list_3.png" alt=""/></a></li>
									<li><a href="#">+3</a></li>
    </ul> */}
							</div>
							
						</div>
						<div className="propertie-footer d-flex">
							<a href="#"><i className="fa fa-comments"></i>Chat</a>
							<a href="javascript:void(0)" className="propertyDisabled"><i className="fa fa-heart"></i>Favorite</a>
							<a href="javascript:void(0)"onClick={this.deleteConfirm.bind(this, row.ItineraryPropertyID, 'fav')}><i className="fa fa-trash"></i>Delete</a>
  </div>
					</div>
				</div> })
        }

			  </div>
      
      </div>
		  <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
      
      <div className="row">
			{Object.keys(this.state.archivePropertyDetails).length == 0 && this.state.loaderStatus == false ? <div className="noDataFound"><img src="images/noresults.png" alt=""/>
			
			<div>
              <h3>{Constants.DS_CONSTANTS.NO_DATA_FOUND}</h3>
            </div>
			</div> : ""}
				{this.state.archivePropertyDetails.map((row,index) =>{
				  return <div key={index} className="col-md-4">
					<div className="propertie-item">
						<div className="img-div">
							<Link to={"/propertydetails/"+row.ItineraryPropertyID}><img src={'https://s3-us-west-1.amazonaws.com/destination-services-itinerary/'+row.Photo+'.jpg'} alt=""/></Link>
							<div className="img-hover-dtls d-flex">
								<div className="flex-grow-1">
									<span>Price</span>
									<strong>${row.TotalFeesLo} <span className="badge badge-pill badge-danger">1BR</span></strong>
								</div>
								<div className="flex-grow-1">
									<span>Available</span>
									<strong>Mar 30</strong>
								</div>
							</div>
						</div>
						<div className="propertie-item-dtls d-flex">
							<div>
								<img src="images/view_img.jpg" alt=""/>
							</div>
							<div>
								<h5>{row.Community}</h5>
								<p>{row.Address}, {row.City} {row.StateCode} {row.ZipCode}</p>
								
							{/*	<ul className="view_list ">
									<li><a href="#"><img src="images/img_list_1.png" alt=""/></a></li>
									<li><a href="#"><img src="images/img_list_2.png" alt=""/></a></li>
									<li><a href="#"><img src="images/img_list_3.png" alt=""/></a></li>
									<li><a href="#">+3</a></li>
    </ul> */}
							</div>
							
						</div>
						<div className="propertie-footer d-flex">
							<a href="#"><i className="fa fa-comments"></i>Chat</a>
							<a href="javascript:void(0)" className="propertyDisabled"><i className="fa fa-heart"></i>Favorite</a>
							<a href="javascript:void(0)" className="propertyDisabled"><i className="fa fa-trash"></i>Delete</a>
  </div>
					</div>
				</div> })
        }

			  </div>
      
      </div>
		</div>

	</div>	
	
</div>
<Footer/>
      </div>
    )
  }


}

export default Home
