import React from 'react'
import { render } from 'react-dom'

import BigCalendar from 'react-big-calendar';
import events from '../events';

import Header from './common/Header';
import localizer from 'react-big-calendar/lib/localizers/globalize'
import globalize from 'globalize'
import $ from 'jquery'
import _ from 'lodash'

const globalizeLocalizer = localizer(globalize)


class Schedules extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      events,
      serviceDrodown : "",
      serviceNote:"",
      start:"",
      end:"",
      Modalerror:false,
      ErrorMsg:"" 
    }
   
  this.handleSelect = this.handleSelect.bind(this);
  this.saveEvent = this.saveEvent.bind(this);
  this.onChangeEvent = this.onChangeEvent.bind(this);
  this.eventStyleGetter = this.eventStyleGetter.bind(this);
  }

  async handleSelect({ start, end }) {

    //let result = [];
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

if(result.length == 0){
  let date1 = new Date(start);
    let date2 = new Date(end);
    let timeDiff = Math.abs(date2.getTime() - date1.getTime());
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

    await this.setState({ Modalerror:false, ErrorMsg:"", serviceDrodown : "", serviceNote:"", start, end});
  if(diffDays > 0){
    jQuery(function($) {          
      $('#myModalService').modal('show');
    });
  } 
}
   
    
   
   
    //const title = window.prompt('Enter Service Note')
    
  }
  async onChangeEvent(e){
    await this.setState({
      [e.target.name] : e.target.value
     })
     await this.setState({Modalerror:false, ErrorMsg:""})
  }
  eventStyleGetter(event, start, end, isSelected) {
    console.log(event);
    var backgroundColor = event.bgColor;
    var style = {
        backgroundColor: backgroundColor,
        
    };
    return {
        style: style
    };
}
  async saveEvent(){

    if (this.state.serviceNote){
      await this.setState({
        events: [
          ...this.state.events,
          {
            start: new Date(this.state.start),
            end: new Date(this.state.end),
            title: this.state.serviceDrodown+' - '+this.state.serviceNote,
            serviceDrodown: this.state.serviceDrodown,
            serviceNote: this.state.serviceNote
          },
        ],
      })
      jQuery(function($) {          
        $('#myModalService').modal('hide');
      });
     
    } else {
      await this.setState({Modalerror:true, ErrorMsg:"Please enter event details"});
    }
    

  }

  render() {

    return (
      <div>

        <Header pathName={this.props.location.pathname}/>
        <div className="main_content">
          <div className="container">
            <h1 className="main_heading">
              Schedules
            </h1>
            <BigCalendar
            selectable
          events={events}
          localizer={globalizeLocalizer}
          events={this.state.events}
          
          min={new Date(2016, 10, 0, 9, 0, 0)}
          max={new Date(2016, 10, 0, 18, 0, 0)}
          defaultView={BigCalendar.Views.WEEK}
          onSelectSlot={this.handleSelect}
          onSelectEvent={(event) => alert(event.title)}
          eventPropGetter={(this.eventStyleGetter)}
            
        />
          </div>
        </div>     
       
<div id="myModalService" className="modal fade" role="dialog">
  <div className="modal-dialog">

    
    <div className="modal-content">
      <div className="modal-header">
       
        <h4 className="modal-title">Add Event</h4>
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
  value = {this.state.serviceDrodown}
  onChange={this.onChangeEvent}>
    <option value="">Choose Service</option>
    <option value="Area tours">Area tours</option>
    <option value="Home finding tours">Home-finding tours</option>
    <option value="Settle in services">Settle in services</option>
    <option value="Lease sign assistance">Lease sign assistance</option>
  </select>
</div>
<div className="input-group input-group-sm mb-3">
  <div className="input-group-prepend">
    <span className="input-group-text" id="inputGroup-sizing-sm">Service Note</span>
  </div>
  <input type="text" className="form-control" id="serviceNote" value={this.state.serviceNote} name="serviceNote"  onChange={this.onChangeEvent} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>
</div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={this.saveEvent}>Save</button>
      </div>
    </div>

  </div>
</div>
      </div>
    )
  }


}

export default Schedules

{/** 
const DateCell = ({
  range,
  value,
  children
 }) => {
 
  const now = new Date();
  now.setHours(0,0,0,0);
 
  return (
   <div className={ value < now ? "date-in-past" : "" }>
    { children }
   </div>
  )
 
 }*/}
