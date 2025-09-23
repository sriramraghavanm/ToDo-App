import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const statusColors = {
  Created: '#007bff',      // Blue
  'In Progress': '#fd7e14', // Orange
  Blocked: '#dc3545',      // Red
  Postponed: '#6f42c1',    // Purple
  Cancelled: '#6c757d',    // Gray
  Done: '#198754',         // Green
};

const CalendarView = ({ tasks }) => {
  // Ensure tasks is always an array
  const taskArray = Array.isArray(tasks) ? tasks : [];
  console.log('CalendarView received tasks:', taskArray); // Debug log

  const events = taskArray.map((task) => ({
    id: task._id,
    title: `${task.title} (${task.status})`,
    start: new Date(task.dueDate),
    end: new Date(task.dueDate),
    status: task.status,
    allDay: true,
    resource: { status: task.status }
  }));

  const eventStyleGetter = (event) => {
    const backgroundColor = statusColors[event.status] || '#000';
    return {
      style: {
        backgroundColor,
        borderRadius: '5px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block'
      }
    };
  };

  if (taskArray.length === 0) {
    return (
      <div className="card">
        <div className="card-body text-center py-4">
          <div className="text-muted">
            <i className="fas fa-calendar-alt fa-3x mb-3 d-block"></i>
            <h5 className="card-title">No tasks in calendar</h5>
            <p className="card-text">Add tasks with due dates to see them here!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-3">
      <h5 className="mb-3">Calendar View</h5>
      <div style={{ height: 400 }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={eventStyleGetter}
          views={['month', 'week', 'day']}
          defaultView="month"
          className="border rounded"
        />
      </div>
    </div>
  );
};

export default CalendarView;