import React from "react";
import { Link } from "react-router-dom";
import { userActions } from "../actions";
import {
  Nav,
  Navbar,
  NavItem,
  NavDropdown,
  MenuItem,
  NavLink,
} from "react-bootstrap";
import Modal from "react-bootstrap4-modal";
/*import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
*/
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick


import { connect } from "react-redux";
import { common } from "../helpers";
import moment from "moment";
require('./main.css');

class SetDateTab extends React.Component {
  constructor(props) {
    super(props);
    this.navId = "";

    this.state = {
      calendarWeekends: false,
      calendarEvents: [ // initial event data
        
      ]
    };
    let user = JSON.parse(localStorage.getItem("user"));
    if (user && user.userId && this.props && this.props.dispatchval) {

      const { dispatch } = this.props.dispatchval.dispatch;
      dispatch(userActions.getById(user.userId));
    }
    this.toggleWeekends = this.toggleWeekends.bind(this);
    this.gotoPast = this.gotoPast.bind(this);
    this.handleDateClick = this.handleDateClick.bind(this);
    this.submitdata = this.submitdata.bind(this);
  }
  toggleWeekends() {
    this.setState({ // update a property
      calendarWeekends: !this.state.calendarWeekends
    })
  }

  gotoPast() {
    let calendarApi = this.calendarComponentRef.current.getApi()
    calendarApi.gotoDate('2000-01-01') // call a method on the Calendar object
  }

  handleDateClick(arg) {
    if (confirm('Would you like to add an blast to ' + arg.dateStr + ' ?')) {
      if (arg.dateStr) {
       //this.submitdata(arg.dateStr);
       this.setState({scheduledDate:arg.dateStr})
      }
    }
  }
  submitdata(data) {

    const { dispatch } = this.props.dispatchval.dispatch;
    var blast_id = '';
    const { scheduledDate } = this.state;
    console.log("scheduledDate====",scheduledDate);
    if (this.props.uploadBlast && this.props.uploadBlast.blastData) {
      blast_id = this.props.uploadBlast.blastData._id;
      dispatch(userActions.saveCalenderData(scheduledDate, blast_id));
    }
  }
  render() {
    const { calendarWeekends, calendarEvents } = this.state;
    return (
      <div
        className="tab-pane fade mt-2"
        id="date"
        role="tabpanel"
        aria-labelledby="group-dropdown2-tab"
        aria-expanded="false"
      >
        <h4>Set Date</h4>
        <p>Choose date for emailing the Blast.</p>
        <div className='demo-app'>
          
          <div className='demo-app-calendar'>
            <FullCalendar
              defaultView="dayGridMonth"
              timeZone="UTC"
              header={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
              }}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              ref={this.calendarComponentRef}
              weekends={this.state.calendarWeekends}
              events={this.state.calendarEvents}
              dateClick={this.handleDateClick}
            />
          </div>
          <div className="col-md-12 mt-4">
            <a
              href="javascript:void(0)"
              className="btn btn-primary"
              onClick={this.submitdata}
            >
              Save
            </a>
            <a
              href="javascript:void(0)"
              className="btn btn-primary pull-right"
              onClick={this.submitdata}
            >
              Next
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default SetDateTab;
