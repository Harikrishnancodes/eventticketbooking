import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './userpage.css';
import onam from '../images/onam.jpg';
import error from '../images/error.png';

function UserPage() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [ticketCount, setTicketCount] = useState(1); // Track the number of tickets for the selected event
  const [searchQuery, setSearchQuery] = useState(''); // Add the search query state
  const [filteredEvents, setFilteredEvents] = useState([]);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:8000/profile", {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);


  
  const fetchEvents = () => {
    axios.get('http://localhost:8000/events')
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  };

  const bookTickets = () => {
    if (selectedEvent) {
      // Send a POST request to book 'ticketCount' tickets for the selected event
      // Use selectedEvent._id and ticketCount for booking
      // Handle success or error as needed
    }
  };

  const removeBooking = () => {
    setSelectedEvent(null); // Clear the selected event when removing the booking
  };

  useEffect(() => {
    fetchEvents();
  }, []);
  // const filteredEvents = events.filter((event) => {
  //   const eventData = `${event.name} ${event.description} ${event.date} ${event.price}`.toLowerCase();
  //   return eventData.includes(searchQuery.toLowerCase());
  // });
  const handleSearch = () => {
    // Filter events based on the searchQuery when the search button is clicked
    const newFilteredEvents = events.filter((event) => {
      const eventData = `${event.name} ${event.description} ${event.date} ${event.price}`.toLowerCase();
      return eventData.includes(searchQuery.toLowerCase());
    });

    // Update the filteredEvents state with the filtered data
    setFilteredEvents(newFilteredEvents);
  };

  useEffect(() => {
    // When events change, set filteredEvents to the original events
    setFilteredEvents(events);
  }, [events]);
  return (
    
    <section className='user-section'>
      <div className='navbar-div'>
        <nav className="navbar navbar-expand-lg ">
          <div className="container-fluid nav-items">
            <a className="navbar-brand" href="#">Name</a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarScroll"
              aria-controls="navbarScroll"
              aria-expanded="false"
              aria-label="Toggle navigation"
              style={{boxShadow:'none'}}
            >
              
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarScroll">
              <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Ticket</a>
                </li>
                {/* <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Link
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                  </ul>
                </li> */}
                <li className="nav-item">
                  <a className="nav-link " >Register</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link ">Login</a>
                </li>
              </ul>
              <form className="d-flex" role="search">
                <input 
                className="form-control me-2" 
                type="search" 
                placeholder="Search" 
                aria-label="Search"
                value={searchQuery}
                style={{ boxShadow : 'none'}}
                onChange={(e) => setSearchQuery(e.target.value)}

                />
                <button 
                className="btn search-btn" 
                type="button" 
                onClick={handleSearch}
                  >Search</button>
              </form>
            </div>
          </div>
        </nav>
      </div>

      <div className='user-events-section'>
        <div className='user-main-div'>
          <div className="user-heading">
            <h2>Event List.</h2>
          </div>
          <div className="user-container">
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 user-event-cards ">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => ( 
                  <div class="col" key={event._id} >
                    <div class="card">
                      <img src={onam} class="card-img-top event" alt="..." />
                      <div class="card-body">
                        <h4 class="card-title">{event.name}</h4>
                        <p class="card-text">
                          <span className="event-short-content">Description:</span> {event.description}
                        </p>
                        <p>
                          <span className="event-short-content">Date:</span> {event.date}
                        </p>
                        <p>
                          <span className="event-short-content">Price:</span> {event.price}
                        </p>
                        <div className='book-ticket-btn-div'>
                          <button onClick={() => setSelectedEvent(event)} className='book-ticket-btn'>Book Tickets</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                  
                    // <p className='user-no-event'>No events available.</p>
                  <div className='error-img-div'>
                    <img src={error} alt="" className='error-img' />
                  </div>

              )}
            </div>
            <div className='booking-section'>
              {selectedEvent && (
                <div className="selected-event">
                  <img src={selectedEvent.image} alt="" />
                  <h2 className="event-short-content">Book Tickets for {selectedEvent.name}</h2>
                  <p> <span className="event-short-content">Date: </span>{selectedEvent.date}</p>
                  <p> <span className="event-short-content">Description: </span>{selectedEvent.description}</p>
                  <p> <span className="event-short-content">Price: </span>{selectedEvent.price}</p>

                  <form action="" onSubmit={bookTickets}>
                    <div className='booking-input-div'>
                      <input
                        type="number"
                        placeholder="Adults*"
                        value={ticketCount}
                        onChange={(e) => setTicketCount(e.target.value)}
                        className='ticket-count'
                        min={0}

                      />
                      <input
                        type="number"
                        placeholder="Parents*"
                        className='ticket-count'
                        min={0}

                      />
                      <input
                        type="number"
                        placeholder="Minors*"
                        className='ticket-count'
                        min={0}
                      />
                    </div>
                    <div className='ticket-buttons'>
                      <button className='booking-btn'>Book</button>
                      <button className='remove-ticket-btn' onClick={removeBooking}>Remove</button>
                    </div>
                  </form>
                </div>
              )}
            </div>  
          </div>
        </div>
      </div>
      
    </section>
  );
}

export default UserPage;
