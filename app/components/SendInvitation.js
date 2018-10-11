import React from "react";
import { Link } from "react-router-dom";
import Constants from "../../constants";
import userHome from "../../services/userHomeService";
import Header from "./common/Header";
import Footer from "./common/Footer";
import { confirmAlert } from "react-confirm-alert";
import $ from "jquery";

class SendInvitation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      notes: "",
      error: {
        firstName: { error: false },
        lastName: { error: false },
        email: { error: false },
        phone: { error: false },
        notes: { error: false },
        modules: { error: false }
      },
      homeFinding: true,
      settleService: false,
      destinationService: false,
      submitValidate: false
    };
  }
  async componentDidMount() {
    $(document).ready(function() {
      jQuery(function($) {
        $("#phone").intlTelInput();
      });
    });
  }
  /*---------------------------------------------------------------------------------------------*/
  inputFieldChanged(e, field) {
    if (field == "phone") {
      var x = e.target.value
        .replace(/\D/g, "")
        .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      e.target.value = !x[2]
        ? x[1]
        : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
    }
    let obj = {};
    obj[field] = e.target.value;
    this.setState(obj);
  }
  moduleSelected(e, field) {
    let obj = {};
    obj[field] = !this.state[field];
    this.setState(obj);
  }
 async informationSubmit(e, field) {
    let error = this.validate(field);
   
    if (
      !error.firstName.error &&
      !error.lastName.error &&
      !error.email.error &&
      !error.phone.error &&
      !error.modules.error
    ) {
      
     await this.setState({ error, submitValidate: true, firstName: "",
      lastName: "",
      email: "",
      phone: "",
      notes: "",
      homeFinding: true,
      settleService: false,
      destinationService: false
    });

    } else {
      
      this.setState({ error: error, submitValidate: false });
    }
  }
  validate(field) {
    let errormsg = {
      firstName: { error: false },
      lastName: { error: false },
      email: { error: false },
      phone: { error: false },
      notes: { error: false },
      modules: { error: false }
    };
    if (field == "basicInformation") {
      if (this.state.firstName == "")
        errormsg["firstName"] = {
          error: true,
          id: "firstName"
        };
      if (this.state.lastName == "")
        errormsg["lastName"] = {
          error: true,
          id: "lastName"
        };
      if (this.state.email == "" || true) {
        let regularexpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        errormsg["email"] = {
          error: !regularexpression.test(this.state.email),
          id: "email"
        };
      }
      if (this.state.phone == "")
        errormsg["phone"] = {
          error: true,
          id: "phone"
        };
      if (
        this.state.homeFinding == false &&
        this.state.destinationService == false &&
        this.state.settleService == false
      ) {
        errormsg["modules"] = {
          error: true,
          id: "modules"
        };
      }
    }

    return errormsg;
  }
  /*---------------------------------------------------------------------------------------------*/
  render() {
    return (
      <div>
        <Header pathName="" />
        <div className="main_content">
          <div className="container">
            <h1 className="main_heading">Send Invitation</h1>
            <div className="send-invitation-wrap">
              <center>
                <h3 className="sucessTextColor">
                  {this.state.submitValidate ? "Invitation has been sent successfully" : ""}
                </h3>
              </center>
              <div className="basic-info">
                <div className="form-group form-style">
                  <label htmlFor="">First Name</label>
                  <input
                    value={this.state.firstName}
                    type="text"
                    className="form-control"
                    id=""
                    placeholder="First Name"
                    className={
                      this.state.error.firstName.error == undefined ||
                      this.state.error.firstName.error
                        ? "errorborder form-control"
                        : "form-control non-errorborder"
                    }
                    onChange={e => this.inputFieldChanged(e, "firstName")}
                  />
                </div>
                <div className="form-group form-style">
                  <label htmlFor="">Last Name</label>
                  <input
                    type="text"
                    value={this.state.lastName}
                    className="form-control"
                    id=""
                    placeholder="Last Name"
                    className={
                      this.state.error.lastName.error == undefined ||
                      this.state.error.lastName.error
                        ? "errorborder form-control"
                        : "form-control non-errorborder"
                    }
                    onChange={e => this.inputFieldChanged(e, "lastName")}
                  />
                </div>
                <div className="form-group form-style">
                  <label htmlFor="">Email</label>
                  <input
                    type="text"
                    value={this.state.email}
                    className="form-control"
                    id=""
                    placeholder="Email"
                    className={
                      this.state.error.email.error == undefined ||
                      this.state.error.email.error
                        ? "errorborder form-control"
                        : "form-control non-errorborder"
                    }
                    onChange={e => this.inputFieldChanged(e, "email")}
                  />
                </div>
                <div className="form-group form-style">
                  <label htmlFor="">Phone</label>
                  <input
                    type="tel"
                    value={this.state.phone}
                    className={
                      this.state.error.phone.error == undefined ||
                      this.state.error.phone.error
                        ? "errorborder form-control"
                        : "form-control non-errorborder"
                    }
                    id="phone"
                    placeholder="Phone"
                    onChange={e => this.inputFieldChanged(e, "phone")}
                  />
                </div>
                <div className="form-group form-style">
                  <label htmlFor="">Notes</label>
                  <textarea
                    className="form-control"
                    id=""
                    placeholder="Notes"
                    value={this.state.notes}
                    rows="3"
                    onChange={e => this.inputFieldChanged(e, "notes")}
                  />
                </div>

                <div className="form-group form-style">
                  <label htmlFor="">Select services</label>
                  <p className="errorTextColor">
                    {this.state.error.modules.error
                      ? "Select atleast one service"
                      : ""}
                  </p>
                  <div className="modules-wrap">
                    <ul>
                      <li>
                        <a
                          className={
                            this.state.homeFinding ? "module-active" : ""
                          }
                          href="javascript:void(0)"
                          onClick={e => {
                            this.moduleSelected(e, "homeFinding");
                          }}
                        >
                          <img src="/images/home.svg" alt="" />
                        </a>
                        <span>HOME FINDING</span>
                      </li>
                      <li>
                        <a
                          className={
                            this.state.settleService ? "module-active" : ""
                          }
                          href="javascript:void(0)"
                          onClick={e => {
                            this.moduleSelected(e, "settleService");
                          }}
                        >
                          <img src="/images/mover.svg" alt="" />
                        </a>
                        <span>SETTLE IN SERVICES</span>
                      </li>
                      <li>
                        <a
                          className={
                            this.state.destinationService ? "module-active" : ""
                          }
                          href="javascript:void(0)"
                          onClick={e => {
                            this.moduleSelected(e, "destinationService");
                          }}
                        >
                          <img
                            className="ds-car"
                            src="/images/car.png"
                            alt=""
                          />
                        </a>
                        <span>DESTINATION SERVICES</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="send-invitation-button">
                <button
                  type="submit"
                  className="btn sm-red-btn font-weight-bold"
                  onClick={e => {
                    this.informationSubmit(e, "basicInformation");
                  }}
                >
                  Send Invitation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SendInvitation;