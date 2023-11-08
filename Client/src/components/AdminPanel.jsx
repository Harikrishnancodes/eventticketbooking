import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adminpanel.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS
import bgimage from '../images/admin-background.jpg';
import onam from '../images/onam.jpg';



function EventList() {
  const [events, setEvents] = useState([]);
  const [errors,setErrors] = useState({});
  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    description: '',
    price: '',
  });

  const fetchEvents = () => {
    axios.get('http://localhost:8000/events')
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  };



const validateValues = (e) => {
  let errors = {};
  if (newEvent.name.length === 0) {
    errors.eventName = 'Please add event';
  }
  if (newEvent.description.length === 0) {
    errors.EventDescription = 'Please add a Description';
  }
  if (newEvent.date.length === 0) {
    errors.eventDate = 'Please add event Date';
  }
  if (newEvent.price.length === 0) {
    errors.EventPrice = 'Please add event Price';
  }
  return errors;
};




const addEvent = (e) => {
  e.preventDefault();
  const validationErrors = validateValues(newEvent);
  setErrors(validationErrors);
  if (Object.keys(validationErrors).length === 0) {
    // If there are no validation errors, proceed with adding the event.
    axios.post('http://localhost:8000/events', newEvent)
      .then(() => {
        fetchEvents();
        setNewEvent({ name: '', date: '', description: '', price: '' });
      })
      .catch((error) => {
        console.error('Error adding an event:', error);
      });
  } else {
    // If there are validation errors, you can handle them as needed, e.g., display error messages or prevent submission.
    console.log('Validation errors:', validationErrors);
  }
};




  const deleteEvent = (eventId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");

    if (confirmDelete) {
      axios.delete(`http://localhost:8000/events/${eventId}`)
        .then(() => {
          fetchEvents();
        })
        .catch((error) => {
          console.error('Error deleting an event:', error);
        });
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <section className="admin">
      <div className="admin-main-div">
        <div className="heading">
          <h2>Upcoming Event</h2>
        </div>
        <div className="carousel-div">
          <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 card-main-div">
            {events.length > 0 ? (
              events.map((event, index) => ( 
                <div class="col" key={event._id} >
                  <div class="card">
                    <img src={onam} class="card-img-top event" alt="..." />
                    <div class="card-body">
                      <h4 class="card-title">{event.name}</h4>
                      <p class="card-text">
                        <span className="short-txt">Description:</span> {event.description}
                      </p>
                      <p>
                        <span className="short-txt">Date:</span> {event.date}
                      </p>
                      <p>
                        <span className="short-txt">Price:</span> {event.price}
                      </p>
                      <button onClick={() => deleteEvent(event._id)} className='event-delete-btn'>Delete Event</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className='no-event'>No events available.</p>
            )}
          </div>
        </div>
        <div className="admin-main-section">
          <div className="heading">
            <h2>Add New Event</h2>
          </div>
            <form action="" className='admin-input-div' onSubmit={addEvent}>
              <input
                type="text"
                placeholder="Event Name"
                name='eventName'
                value={newEvent.name}
                onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })} className='input-box'
              />   
              {errors.eventName ? (<p className='validation-error'>please add any event</p>) : null}

              
              <textarea
                placeholder="Event Description"
                name='EventDescription'
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                cols={5} className='input-box'
              />
              {errors.EventDescription  ? (<p className='validation-error'>Please add event description</p>) : null}

              <input
                type="date"
                value={newEvent.date}
                name='eventDate'
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} className='input-box'
              />
              {errors.eventDate ? (<p className='validation-error'>Please add event Date</p>) : null}

              <input
                type='number'
                placeholder="Price"
                name='EventPrice'
                value={newEvent.price}
                onChange={(e) => setNewEvent({ ...newEvent, price: e.target.value })} className='input-box'
              />
              {errors.EventPrice ? (<p className='validation-error'>Please add event price</p>) : null}

              <button  className="addevent-btn">Add Event</button>
            </form>
        </div>
      </div>
    </section>
  );
}

export default EventList;
