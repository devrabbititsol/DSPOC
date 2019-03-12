import React from 'react'
import { render } from 'react-dom'

import BigCalendar from 'react-big-calendar';


import Header from './common/Header';
import localizer from 'react-big-calendar/lib/localizers/globalize'
import globalize from 'globalize'
import $ from 'jquery'
import _ from 'lodash'
import moment from 'moment'
import { confirmAlert } from "react-confirm-alert";
import DatePicker from 'react-datepicker'

const globalizeLocalizer = localizer(globalize)


class ConsultantSchedules extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [],
      serviceDrodown: "",
      serviceNote: "",
      start: "",
      end: "",
      Modalerror: false,
      ErrorMsg: "",
      EditEvent: "",
      EditMoveDate: new Date(),
      eventDetails: "",
      ErrorMsgExitsMsg:"",
      moveModalerror:false

    }

    this.handleSelect = this.handleSelect.bind(this);
    this.saveEvent = this.saveEvent.bind(this);
    this.onChangeEvent = this.onChangeEvent.bind(this);
    this.eventStyleGetter = this.eventStyleGetter.bind(this);
    this.moveEdit = this.moveEdit.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.deleteEventConfirm = this.deleteEventConfirm.bind(this);
    this.moveEvent = this.moveEvent.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.filterEvents = this.filterEvents.bind(this);
  }
  async componentDidMount(){
    let localEvents = JSON.parse(localStorage.getItem('events') != "" ? localStorage.getItem('events'):[]);
    let events = [];
    _.forEach(localEvents, function(localEvent) {
      localEvent.start = new Date(localEvent.start);
      localEvent.end = new Date(localEvent.end);
      events.push(localEvent)
    });
    await this.setState({events})
    
  }
  async filterEvents(start, end){
    let result = this.state.events.filter(d => {
      if (
        (
          (d.start.getTime() >= start.getTime() && d.start.getTime() < end.getTime())
          || (d.end.getTime() >= start.getTime() + 1 && d.end.getTime() <= end.getTime() + 1)
        ) || (
          (d.start.getTime() <= start.getTime() && d.end.getTime() >= end.getTime())

        )
      ) {
        return d;
      }
    });
    return result;
  }
  async handleSelect({ start, end }) {

    let result = await this.filterEvents(start, end);

    if (result.length == 0) {
      let date1 = new Date(start);
      let date2 = new Date(end);
      let timeDiff = Math.abs(date2.getTime() - date1.getTime());
      let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

      await this.setState({ Modalerror: false, ErrorMsg: "", serviceDrodown: "", serviceNote: "", start, end });
      if (diffDays > 0) {
        jQuery(function ($) {
          $('#myModalService').modal('show');
        });
      }
    }
  }
  async onChangeEvent(e) {
    await this.setState({
      [e.target.name]: e.target.value
    })
    await this.setState({ Modalerror: false, ErrorMsg: "" })
  }
  eventStyleGetter(event, start, end, isSelected) {

    var backgroundColor = event.bgColor;
    var style = {
      backgroundColor: backgroundColor,

    };
    return {
      style: style
    };
  }
  async handleDateChange(editDate) {
    await this.setState({ EditMoveDate: new Date(editDate) });
  }
  async moveEdit(event) {
    if(event.type == 'consultant'){  
    await this.setState({ EditEvent: event.title, EditMoveDate: new Date(event.start), eventDetails: event })
    jQuery(function ($) {
      $('#moveDelete').modal('show');
    });
  }
  }
  async deleteEventConfirm() {
    let eventDetails = this.state.eventDetails;
    confirmAlert({
      title: "",
      message: "Are you sure you want to delete this event?",
      buttons: [
        {
          label: "Yes",
          onClick: this.deleteEvent.bind(this, eventDetails)
        },
        {
          label: "No",
          onClick: () => ""
        }
      ]
    });
  }
  async deleteEvent(eventDetails) {

    let indexEvent = _.findIndex(this.state.events, function (o) {
      return moment(o.start).format("YYYY Do MM HH:MM:SS") == moment(eventDetails.start).format("YYYY Do MM HH:MM:SS")

    });
    let events = this.state.events;
    events.splice(indexEvent, 1);
    await this.setState({ events })
    await localStorage.setItem('events', JSON.stringify(this.state.events));
    jQuery(function ($) {
      $('#moveDelete').modal('hide');
    });
  }

  async moveEvent() {
    let eventDetails = this.state.eventDetails;
    let EditMoveDate = moment(this.state.EditMoveDate).format("YYYY/MM/DD");
    if (moment(eventDetails.start).format("YYYY Do MM") != moment(EditMoveDate).format("YYYY Do MM")) {
      let startTime = new Date(eventDetails.start).getHours()+':'+new Date(eventDetails.start).getMinutes()+':00';
      let endTime =  new Date(eventDetails.end).getHours()+':'+new Date(eventDetails.end).getMinutes()+':00';
      let start = new Date(EditMoveDate + ' ' + startTime);
      let end = new Date(EditMoveDate + ' ' + endTime);
      let eventPreviousData = this.state.events;
      let indexEvent = _.findIndex(this.state.events, function (o) {
        return moment(o.start).format("YYYY Do MM HH:MM:SS") == moment(eventDetails.start).format("YYYY Do MM HH:MM:SS")

      });
      let result = await this.filterEvents(start, end);
      if(result.length > 0){
        await this.setState({moveModalerror:true, ErrorMsgExitsMsg:"Already one more event is exists in this date, please try with another date"})
      } else if(indexEvent >= 0 && start != "Invalid Date"){
      eventPreviousData[indexEvent].start = start;
      eventPreviousData[indexEvent].end = end;
      await this.setState({ events: eventPreviousData });
      await localStorage.setItem('events', JSON.stringify(this.state.events));
      jQuery(function ($) {
        $('#moveDelete').modal('hide');
      });
    }

    }
  }

  dayStyleGetter(date2) {

    if (moment(date2).format("YYYY Do MM") == '2019 5th 03') {
      var backgroundColor = '#eaf6ff';
      //backgroundColor: '#eaf6ff',
      var style = {
        
        margin: 0

      };
      return {
        style: style
      };
    }

  }
  async saveEvent() {

    if (this.state.serviceNote) {
      await this.setState({
        events: [
          ...this.state.events,
          {
            start: new Date(this.state.start),
            end: new Date(this.state.end),
            bgColor:"#CCCCCC",
            title: this.state.serviceDrodown + ' - ' + this.state.serviceNote,
            serviceDrodown: this.state.serviceDrodown,
            serviceNote: this.state.serviceNote,
            type:'consultant'
          },
        ],
      })
      await localStorage.setItem('events', JSON.stringify(this.state.events));
      jQuery(function ($) {
        $('#myModalService').modal('hide');
      });

    } else {
      await this.setState({ Modalerror: true, ErrorMsg: "Please enter event details" });
    }


  }

  render() {

    return (
      <div>

        <Header pathName={this.props.location.pathname} />
        <div className="main_content">
          <div className="container">
            <h1 className="main_heading">
              Schedules
            </h1>
            <BigCalendar
              selectable
              events={this.state.EditMoveDate}
              localizer={globalizeLocalizer}
              events={this.state.events}

              min={new Date(2016, 10, 0, 9, 0, 0)}
              max={new Date(2016, 10, 0, 18, 0, 0)}
              defaultView={BigCalendar.Views.WEEK}
              onSelectSlot={this.handleSelect}
              onSelectEvent={(event) => this.moveEdit(event)}
              eventPropGetter={(this.eventStyleGetter)}
              dayPropGetter={(this.dayStyleGetter)}

            />
          </div>
        </div>

        <div id="myModalService" className="modal fade" role="dialog">
          <div className="modal-dialog">


            <div className="modal-content">
              <div className="modal-header">

                <h4 className="modal-title">Add Unavailable Time Slots</h4>
              </div>
              <div className="modal-body">
                {this.state.Modalerror == true ? <div className="alert alert-danger" role="alert">
                  {this.state.ErrorMsg}
                </div> : null}
                <div className="input-group input-group-sm mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroup-sizing-sm">Services</span>
                  </div>
                  <select className="custom-select" id="serviceDrodown" name="serviceDrodown"
                    value={this.state.serviceDrodown}
                    onChange={this.onChangeEvent}>
                    <option value="">Choose Service</option>
                    <option value="I am not available">I am not available</option>
                    
                  </select>
                </div>
                <div className="input-group input-group-sm mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroup-sizing-sm">Reason</span>
                  </div>
                  <input type="text" className="form-control" id="serviceNote" value={this.state.serviceNote} name="serviceNote" onChange={this.onChangeEvent} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={this.saveEvent}>Save</button>
              </div>
            </div>

          </div>
        </div>



        <div id="moveDelete" className="modal fade" role="dialog">
          <div className="modal-dialog">


            <div className="modal-content">
              <div className="modal-header">

                <h4 className="modal-title">Event - {this.state.EditEvent}</h4>
              </div>
              <div className="modal-body">
              {this.state.moveModalerror == true ? <div className="alert alert-danger" role="alert">
                  {this.state.ErrorMsgExitsMsg}
                </div> : null}

                <div className="input-group input-group-sm mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroup-sizing-sm">Change Date To Move</span>
                  </div>
                  <DatePicker
                    selected={this.state.EditMoveDate}
                    onChange={this.handleDateChange}
                    minDate={new Date()}
                    onKeyDown={e => e.preventDefault()}
                    className="form-control" />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={this.moveEvent}>Move</button>
                <button type="button" className="btn btn-danger" onClick={this.deleteEventConfirm}>Delete</button>
              </div>
            </div>

          </div>
        </div>


      </div>
    )
  }


}

export default ConsultantSchedules

