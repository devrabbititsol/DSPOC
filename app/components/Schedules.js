import React from 'react'
import { render } from 'react-dom'

import BigCalendar from 'react-big-calendar';
import events from '../events';

import Header from './common/Header';
import localizer from 'react-big-calendar/lib/localizers/globalize'
import globalize from 'globalize'
import $ from 'jquery'

const globalizeLocalizer = localizer(globalize)


class Schedules extends React.Component {
  constructor(props) {
    super(props)
    this.state = { events }
   
  this.handleSelect = this.handleSelect.bind(this);
  }
  
  handleSelect({ start, end }){
    const title = window.prompt('Enter Service Note')
    if (title)
      this.setState({
        events: [
          ...this.state.events,
          {
            start,
            end,
            title,
          },
        ],
      })
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
            
          events={events}
          localizer={globalizeLocalizer}
          events={this.state.events}
          step={60}
          timeslots={1}
          min={new Date(2016, 10, 0, 9, 0, 0)}
          max={new Date(2016, 10, 0, 18, 0, 0)}
          defaultView={BigCalendar.Views.WEEK}
          onSelectSlot={this.handleSelect}
          onSelectEvent={(event) => alert(event.title)}
              
        />
          </div>
        </div>     
       
<div id="myModalService" className="modal fade" role="dialog">
  <div className="modal-dialog">

    
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal">&times;</button>
        <h4 className="modal-title">Modal Header</h4>
      </div>
      <div className="modal-body">
        <p>Some text in the modal.</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>
      </div>
    )
  }


}

export default Schedules
