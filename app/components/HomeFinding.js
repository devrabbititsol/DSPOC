import React from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
import Constants from "../../constants";
import userHome from "../../services/userHomeService";
import Header from "./common/Header";
import Footer from "./common/Footer";
import { confirmAlert } from "react-confirm-alert";


class HomeFinding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     
      propertyDetails: [],
      visitPropertyDetails: [],
      archivePropertyDetails: [],
      length: "",
      loaderStatus: false,
      chatId: 0,
      filterAddress: 0,
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
      amenitiesInterestedActive: [1, 7, 13] //active list for Amenities Interested
    };

    this.amenitiesInterestedActive = this.amenitiesInterestedActive.bind(this);
    this.updateDataToVisit = this.updateDataToVisit.bind(this);
    this.updateDataToArchive = this.updateDataToArchive.bind(this);
    this.calLength = this.calLength.bind(this);
    this.deleteConfirm = this.deleteConfirm.bind(this);
    this.updateDataToArchiveFromVisits = this.updateDataToArchiveFromVisits.bind(
      this
    );
    this.updateChatId = this.updateChatId.bind(this);
    this.filterAddressActive = this.filterAddressActive.bind(this);
    this.handleEventRemove = this.handleEventRemove.bind(this);
    this.handleEventUpdate = this.handleEventUpdate.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleEventRemove(event){
    const {selectedIntervals} = this.state;
    const index = selectedIntervals.findIndex((interval) => interval.uid === event.uid);
    if (index > -1) {
      selectedIntervals.splice(index, 1);
      this.setState({selectedIntervals});
    }

  }

  handleEventUpdate(event){
    
    const {selectedIntervals} = this.state;
    const index = selectedIntervals.findIndex((interval) => interval.uid === event.uid);
    if (index > -1) {
      selectedIntervals[index] = event;
      this.setState({selectedIntervals});
    }
  }

  handleSelect(newIntervals) {
   
    const {lastUid, selectedIntervals} = this.state;
    const intervals = newIntervals.map( (interval, index) => {

      return {
        start:interval.start,
        end:interval.end,
        value:interval.value,
        uid: lastUid + index
      }
    });

    this.setState({
      selectedIntervals: selectedIntervals.concat(intervals),
      lastUid: lastUid + newIntervals.length
    })
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
  async componentWillMount() {
    if (localStorage.getItem("propertyDetails") == null) {
      await this.setState({ loaderStatus: true });
      const propertyDetails = await userHome.getDetails({
        companyName: "nopricing",
        FileNum: "163288",
        itineraryId: "2"
      });
      await this.setState({
        loaderStatus: false,
        propertyDetails: propertyDetails.recordset,
        length: propertyDetails.recordset.length
      });
      await localStorage.setItem(
        "propertyDetails",
        JSON.stringify(propertyDetails.recordset)
      );
      await localStorage.setItem(
        "OriginalPropertyDetails",
        JSON.stringify(propertyDetails.recordset)
      );
    } else {
      await this.setState({
        propertyDetails:
          localStorage.getItem("propertyDetails") !== null
            ? JSON.parse(localStorage.getItem("propertyDetails"))
            : [],
        visitPropertyDetails:
          localStorage.getItem("visitPropertyDetails") !== null
            ? JSON.parse(localStorage.getItem("visitPropertyDetails"))
            : [],
        archivePropertyDetails:
          localStorage.getItem("archivePropertyDetails") !== null
            ? JSON.parse(localStorage.getItem("archivePropertyDetails"))
            : [],
        length:
          localStorage.getItem("propertyDetails") !== null
            ? JSON.parse(localStorage.getItem("propertyDetails")).length
            : 0
      });
      console.log(this.state);
    }
  }
  async filterAddressActive(Id, event) {
    event.persist();
    await this.setState({ filterAddress: Id });
  }
  async updateChatId(Id, event) {
    event.persist();
    await this.setState({ chatId: Id });
  }
  async updateDataToVisit(Id, event) {
    event.persist();
    let updatedProperties = this.state.propertyDetails;
    let updatedvisitPropertyDetails = this.state.visitPropertyDetails;
    let ItineraryIndex = _.findIndex(this.state.propertyDetails, {
      ItineraryPropertyID: Id
    });
    updatedvisitPropertyDetails.push(
      this.state.propertyDetails[ItineraryIndex]
    );
    delete updatedProperties[ItineraryIndex];
    await this.setState({
      propertyDetails: updatedProperties,
      visitPropertyDetails: updatedvisitPropertyDetails,
      length: Object.keys(updatedProperties).length
    });
    await localStorage.setItem(
      "propertyDetails",
      JSON.stringify(this.filter_array(updatedProperties))
    );
    await localStorage.setItem(
      "visitPropertyDetails",
      JSON.stringify(this.filter_array(updatedvisitPropertyDetails))
    );
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
  async updateDataToArchive(Id) {
    let updatedProperties = this.state.propertyDetails;
    let updatedarchivePropertyDetails = this.state.archivePropertyDetails;
    let ItineraryIndex = _.findIndex(this.state.propertyDetails, {
      ItineraryPropertyID: Id
    });
    updatedarchivePropertyDetails.push(
      this.state.propertyDetails[ItineraryIndex]
    );
    delete updatedProperties[ItineraryIndex];
    await this.setState({
      propertyDetails: updatedProperties,
      archivePropertyDetails: updatedarchivePropertyDetails,
      length: Object.keys(updatedProperties).length
    });
    //console.log(JSON.stringify(this.filter_array(updatedProperties)));
    await localStorage.setItem(
      "propertyDetails",
      JSON.stringify(this.filter_array(updatedProperties))
    );
    await localStorage.setItem(
      "archivePropertyDetails",
      JSON.stringify(this.filter_array(updatedarchivePropertyDetails))
    );
  }
  async updateDataToArchiveFromVisits(Id) {
    let updatedProperties = this.state.visitPropertyDetails;
    let updatedarchivePropertyDetails = this.state.archivePropertyDetails;
    let ItineraryIndex = _.findIndex(this.state.visitPropertyDetails, {
      ItineraryPropertyID: Id
    });
    updatedarchivePropertyDetails.push(
      this.state.visitPropertyDetails[ItineraryIndex]
    );
    delete updatedProperties[ItineraryIndex];
    await this.setState({
      visitPropertyDetails: updatedProperties,
      archivePropertyDetails: updatedarchivePropertyDetails,
      length: Object.keys(updatedProperties).length
    });
    await localStorage.setItem(
      "visitPropertyDetails",
      JSON.stringify(this.filter_array(updatedProperties))
    );
    await localStorage.setItem(
      "archivePropertyDetails",
      JSON.stringify(this.filter_array(updatedarchivePropertyDetails))
    );
  }
  async deleteConfirm(Id, type, event) {
    confirmAlert({
      title: "",
      message: "Are you sure you want to move this property to Not Interested?",
      buttons: [
        {
          label: "Yes",
          onClick:
            type == "consider"
              ? this.updateDataToArchive.bind(this, Id)
              : this.updateDataToArchiveFromVisits.bind(this, Id)
        },
        {
          label: "No",
          onClick: () => ""
        }
      ]
    });
  }

  async calLength(typeId, event) {
    event.persist();
    await this.setState({ chatId: 0 });
    //let propertyLenght = this.state.length;
    if (typeId == 1) {
      await this.setState({
        length: Object.keys(this.state.propertyDetails).length
      });
    }
    if (typeId == 2) {
      await this.setState({
        length: Object.keys(this.state.visitPropertyDetails).length
      });
    }
    if (typeId == 3) {
      await this.setState({
        length: Object.keys(this.state.archivePropertyDetails).length
      });
    }
  }

  render() {
    return (
      <div>
        <Header pathName={this.props.location.pathname} />
        <div className="main_content">
          <div className="container">
            <h1 className="main_heading">
              Properties{" "}
              <span className="badge badge-pill">{this.state.length}</span>
            </h1>

            <div className="d-flex justify-content-between">
              <div className="mb-5 mt-5 map-block">
                <a href="" data-toggle="modal" data-target=".address-modal">
                  <i className="mdi mdi-map-search-outline" />
                </a>
                
              </div>
             
              <ul
                className="nav nav-pills mb-5 mt-5 properties"
                id="pills-tab"
                role="tablist"
              >
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="pills-home-tab"
                    data-toggle="pill"
                    href="#pills-home"
                    role="tab"
                    aria-controls="pills-home"
                    aria-selected="true"
                    onClick={this.calLength.bind(this, 1)}
                  >
                    <i className="mdi mdi-view-list" /> Options
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="pills-profile-tab"
                    data-toggle="pill"
                    href="#pills-profile"
                    role="tab"
                    aria-controls="pills-profile"
                    aria-selected="false"
                    onClick={this.calLength.bind(this, 2)}
                  >
                    <i className="mdi mdi-thumb-up" /> Interested
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="pills-contact-tab"
                    data-toggle="pill"
                    href="#pills-contact"
                    role="tab"
                    aria-controls="pills-contact"
                    aria-selected="false"
                    onClick={this.calLength.bind(this, 3)}
                  >
                    <i className="mdi mdi-thumb-down" /> Not Interested
                  </a>
                </li>
              </ul>
            </div>

            <div className="tab-content" id="pills-tabContent">
              {this.state.loaderStatus == true ? (
                <div className="loader">
                  <img src="images/ajax-loader.gif" alt="" />
                </div>
              ) : (
                ""
              )}
              <div
                className="tab-pane fade show active"
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
              >
                <div className="row">
                  {Object.keys(this.state.propertyDetails).length == 0 &&
                  this.state.loaderStatus == false ? (
                    <div className="noDataFound">
                      <img src="images/noresults.png" width="312px" alt="" />

                      <div>
                        <h3>{Constants.DS_CONSTANTS.NO_DATA_FOUND}</h3>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {this.state.propertyDetails.map((row, index) => {
                    return (
                      <div key={index} className="col-md-4">
                        <div className="propertie-item">
                          <div className="img-div">
                            <Link
                              to={"/propertydetails/" + row.ItineraryPropertyID}
                            >
                              <img
                                src={
                                  "https://s3-us-west-1.amazonaws.com/destination-services-itinerary/" +
                                  row.Photo +
                                  ".jpg"
                                }
                                alt=""
                              />
                            </Link>
                            <div className="img-hover-dtls d-flex">
                              <div className="flex-grow-1">
                                <span>Price</span>
                                <strong>
                                  ${row.TotalFeesLo}{" "}
                                  <span className="badge badge-pill badge-danger">
                                    {row.Size}
                                  </span>
                                </strong>
                              </div>
                              <div className="flex-grow-1">
                                <span>Available</span>
                                <strong>Mar 30</strong>
                              </div>
                            </div>
                          </div>
                          <div className="propertie-item-dtls d-flex">
                            <div>
                              <img src="images/view_img.jpg" alt="" />
                            </div>
                            <div>
                              <h5>{row.Community}</h5>
                              <p>
                                {row.Address}, {row.City} {row.StateCode}{" "}
                                {row.ZipCode}
                              </p>

                              {/*	<ul className="view_list ">
									<li><a href="#"><img src="images/img_list_1.png" alt=""/></a></li>
									<li><a href="#"><img src="images/img_list_2.png" alt=""/></a></li>
									<li><a href="#"><img src="images/img_list_3.png" alt=""/></a></li>
									<li><a href="#">+3</a></li>
    </ul> */}
                            </div>
                          </div>
                          <div className="propertie-footer d-flex">
                            <a
                              href="javascript:void(0)"
                              onClick={this.updateChatId.bind(
                                this,
                                row.ItineraryPropertyID
                              )}
                            >
                              <i className="mdi mdi-message-text" />
                              Chat
                            </a>
                            <a
                              href="javascript:void(0)"
                              onClick={this.updateDataToVisit.bind(
                                this,
                                row.ItineraryPropertyID
                              )}
                            >
                              <i className="mdi mdi-thumb-up" />
                              Interested
                            </a>
                            <a
                              href="javascript:void(0)"
                              onClick={this.deleteConfirm.bind(
                                this,
                                row.ItineraryPropertyID,
                                "consider"
                              )}
                            >
                              <i className="mdi mdi-thumb-down" />
                              Not Interested
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="pills-profile"
                role="tabpanel"
                aria-labelledby="pills-profile-tab"
              >
                <div className="row">
                  {Object.keys(this.state.visitPropertyDetails).length == 0 &&
                  this.state.loaderStatus == false ? (
                    <div className="noDataFound">
                      <img src="images/noresults.png" width="312px" alt="" />

                      <div>
                        <h3>{Constants.DS_CONSTANTS.NO_DATA_FOUND}</h3>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {this.state.visitPropertyDetails.map((row, index) => {
                    return (
                      <div key={index} className="col-md-4">
                        <div className="propertie-item">
                          <div className="img-div">
                            <Link
                              to={"/propertydetails/" + row.ItineraryPropertyID}
                            >
                              <img
                                src={
                                  "https://s3-us-west-1.amazonaws.com/destination-services-itinerary/" +
                                  row.Photo +
                                  ".jpg"
                                }
                                alt=""
                              />
                            </Link>
                            <div className="img-hover-dtls d-flex">
                              <div className="flex-grow-1">
                                <span>Price</span>
                                <strong>
                                  ${row.TotalFeesLo}{" "}
                                  <span className="badge badge-pill badge-danger">
                                    1BR
                                  </span>
                                </strong>
                              </div>
                              <div className="flex-grow-1">
                                <span>Available</span>
                                <strong>Mar 30</strong>
                              </div>
                            </div>
                          </div>
                          <div className="propertie-item-dtls d-flex">
                            <div>
                              <img src="images/view_img.jpg" alt="" />
                            </div>
                            <div>
                              <h5>{row.Community}</h5>
                              <p>
                                {row.Address}, {row.City} {row.StateCode}{" "}
                                {row.ZipCode}
                              </p>

                              {/*	<ul className="view_list ">
									<li><a href="#"><img src="images/img_list_1.png" alt=""/></a></li>
									<li><a href="#"><img src="images/img_list_2.png" alt=""/></a></li>
									<li><a href="#"><img src="images/img_list_3.png" alt=""/></a></li>
									<li><a href="#">+3</a></li>
    </ul> */}
                            </div>
                          </div>
                          <div className="propertie-footer d-flex">
                            <a
                              href="javascript:void(0)"
                              onClick={this.updateChatId.bind(
                                this,
                                row.ItineraryPropertyID
                              )}
                            >
                              <i className="mdi mdi-message-text" />
                              Chat
                            </a>
                            <a
                              href="javascript:void(0)"
                              className="propertyDisabled"
                            >
                              <i className="mdi mdi-thumb-up" />
                              Interested
                            </a>
                            <a
                              href="javascript:void(0)"
                              onClick={this.deleteConfirm.bind(
                                this,
                                row.ItineraryPropertyID,
                                "fav"
                              )}
                            >
                              <i className="mdi mdi-thumb-down" />
                              Not Interested
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="pills-contact"
                role="tabpanel"
                aria-labelledby="pills-contact-tab"
              >
                <div className="row">
                  {Object.keys(this.state.archivePropertyDetails).length == 0 &&
                  this.state.loaderStatus == false ? (
                    <div className="noDataFound">
                      <img src="images/noresults.png" alt="" />

                      <div>
                        <h3>{Constants.DS_CONSTANTS.NO_DATA_FOUND}</h3>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {this.state.archivePropertyDetails.map((row, index) => {
                    return (
                      <div key={index} className="col-md-4">
                        <div className="propertie-item">
                          <div className="img-div">
                            <Link
                              to={"/propertydetails/" + row.ItineraryPropertyID}
                            >
                              <img
                                src={
                                  "https://s3-us-west-1.amazonaws.com/destination-services-itinerary/" +
                                  row.Photo +
                                  ".jpg"
                                }
                                alt=""
                              />
                            </Link>
                            <div className="img-hover-dtls d-flex">
                              <div className="flex-grow-1">
                                <span>Price</span>
                                <strong>
                                  ${row.TotalFeesLo}{" "}
                                  <span className="badge badge-pill badge-danger">
                                    1BR
                                  </span>
                                </strong>
                              </div>
                              <div className="flex-grow-1">
                                <span>Available</span>
                                <strong>Mar 30</strong>
                              </div>
                            </div>
                          </div>
                          <div className="propertie-item-dtls d-flex">
                            <div>
                              <img src="images/view_img.jpg" alt="" />
                            </div>
                            <div>
                              <h5>{row.Community}</h5>
                              <p>
                                {row.Address}, {row.City} {row.StateCode}{" "}
                                {row.ZipCode}
                              </p>

                              {/*	<ul className="view_list ">
									<li><a href="#"><img src="images/img_list_1.png" alt=""/></a></li>
									<li><a href="#"><img src="images/img_list_2.png" alt=""/></a></li>
									<li><a href="#"><img src="images/img_list_3.png" alt=""/></a></li>
									<li><a href="#">+3</a></li>
    </ul> */}
                            </div>
                          </div>
                          <div className="propertie-footer d-flex">
                            <a
                              href="javascript:void(0)"
                              onClick={this.updateChatId.bind(
                                this,
                                row.ItineraryPropertyID
                              )}
                            >
                              <i className="mdi mdi-message-text" />
                              Chat
                            </a>
                            <a
                              href="javascript:void(0)"
                              className="propertyDisabled"
                            >
                              <i className="mdi mdi-thumb-up" />
                              Interested
                            </a>
                            <a
                              href="javascript:void(0)"
                              className="propertyDisabled"
                            >
                              <i className="mdi mdi-thumb-down" />
                              Not Interested
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>










        <div
          className="modal fade address-modal modal-main"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="myLargeModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="">
                  Select Address and Amenities
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">
                    <i className="mdi mdi-close" />
                  </span>
                </button>
              </div>

              <div className="modal-body">
                <div className="address-title">Select address</div>

                <div className="address-main mb-5">
                  <div
                    className={
                      this.state.filterAddress == 1
                        ? "address-widget address-widget_active"
                        : "address-widget"
                    }
                    onClick={this.filterAddressActive.bind(this, 1)}
                  >
                    <div className="widget-title">
                      <i className="mdi mdi-briefcase" /> WORK ADDRESS
                    </div>

                    <div className="address-sub">
                      <ul>
                        <li>
                          <i className="mdi mdi-map-marker" /> 7950 Dublin
                          Blvd., Suite 314, Dublin, CA 94568
                        </li>
                        <li>
                          <i className="mdi mdi-cellphone-android" />{" "}
                          +1-650-352-8686
                        </li>
                        <li>
                          <i className="mdi mdi-email" /> info@suiteamerica.com
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div
                    className={
                      this.state.filterAddress == 2
                        ? "address-widget address-widget_active"
                        : "address-widget"
                    }
                    onClick={this.filterAddressActive.bind(this, 2)}
                  >
                    <div className="widget-title widget-title-active">
                      <i className="mdi mdi-home-map-marker" /> TEMPORARY
                      ADDRESS
                    </div>

                    <div className="address-sub">
                      <ul>
                        <li>
                          <i className="mdi mdi-map-marker" /> 555 San Antonio
                          Rd, Mountain View, CA 95762
                        </li>
                        <li>
                          <i className="mdi mdi-cellphone-android" />{" "}
                          +1-650-352-9999
                        </li>
                        <li>
                          <i className="mdi mdi-email" /> info@suiteamerica.com
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="address-title">Select Amenities</div>

                <div className="amenities-interested">
                  {this.state.Amenities.map((ameniti, key) => {
                    if (this.state.amenitiesInterestedActive.includes(key))
                      //checks is ameniti is active or not
                      return (
                        <a
                          href="javascript:void(0)"
                          key={key}
                          className="amenities-active"
                          onClick={this.amenitiesInterestedActive.bind(
                            this,
                            key
                          )}
                        >
                          {ameniti}
                        </a>
                      );
                    else
                      return (
                        <a
                          href="javascript:void(0)"
                          key={key}
                          onClick={this.amenitiesInterestedActive.bind(
                            this,
                            key
                          )}
                        >
                          {ameniti}
                        </a>
                      );
                  })}
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-sa"
                  data-dismiss="modal"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        <Footer chatId={this.state.chatId} />
      </div>
    );
  }
}

export default HomeFinding;
