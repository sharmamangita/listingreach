import React from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import { userActions } from "../actions";
require('@fullcalendar/core/main.css');
require('@fullcalendar/daygrid/main.css');
// require('./main.css');


class SetDateTab extends React.Component {
  constructor(props) {
    super(props);
    this.navId = "";

    this.state = {
      isSelected: false,
      calendarWeekends: false,
      calendarEvents: [ // initial event data

      ]
    };
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
        this.setState({ scheduledDate: arg.dateStr, isSelected: true })
      }
    }
  }
  submitdata() {

    const { dispatch } = this.props.dispatchval.dispatch;
    const { scheduledDate, blast_id } = this.state;
    console.log("scheduledDate====", scheduledDate);
    if (blast_id && scheduledDate) {
      dispatch(userActions.saveCalenderData(scheduledDate, blast_id));
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.activeTab == "setDate") {
      console.log("nextProps in Set Date", nextProps)
      this.setState({
        blast_id: nextProps.blast_id,
        scheduledDate: nextProps.scheduledDate,
        isSelected: nextProps.scheduledDate ? true : false
      })
    }
  }
  render() {
    const { scheduledDate } = this.state;
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
              now={scheduledDate}
              themeSystem="Minty"
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
          {this.state.isSelected ? (
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
          ) : null}
        </div>
      </div>
    );
  }
}

export default SetDateTab;
