import React, { useState, useEffect } from "react";
import axios from "axios";
import "./userpage.css";
import onam from "../images/onam.jpg";
import error from "../images/error.png";
import logo from "../images/LKC_logo.png";
import { Link } from "react-router-dom";

function UserPage() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [ticketCount, setTicketCount] = useState(1); // Track the number of tickets for the selected event
  const [searchQuery, setSearchQuery] = useState(""); // Add the search query state
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [isUserProfileActive, setIsUserProfileActive] = useState(false);

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

  const toggleUserProfile = () => {
    setIsUserProfileActive(!isUserProfileActive);
  };
  const closeUserProfile = () => {
    setIsUserProfileActive(false);
  };

  const fetchEvents = () => {
    axios
      .get("http://localhost:8000/events")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
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
      const eventData =
        `${event.name} ${event.description} ${event.date} ${event.price}`.toLowerCase();
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
    <section className="user-section">
      <div className="navbar-div">
        <nav>
          <div className="nav-text">
            <img src={logo} alt="" className="nav-logo" />
            <p>
              Leicester <span className="nav-name">Kerala Community</span>
            </p>
          </div>
          <form action="" className="search-bar-div">
            <input
              type="search"
              name="search"
              id=""
              placeholder="Search.."
              className="search-bar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <input
              type="button"
              name="button"
              value="Search"
              className="search-btn"
              onClick={handleSearch}
            />
          </form>
          <div className="end-div ">
            <Link to={"/signup"}>
              <button className="nav-logout">Logout</button>
            </Link>
            <div className="icon-div">
              <i
                className="bi bi-list hamburger-icon"
                onClick={toggleUserProfile}
              ></i>
            </div>
          </div>
        </nav>
        <div
          className={`user-profile-div ${isUserProfileActive ? "active" : ""}`}
        >
          <div className="user-close-btn-div">
            <i
              className="bi bi-x user-close-btn"
              onClick={closeUserProfile}
            ></i>
          </div>
          <Link to={"/signup"} className="links">
            <div className="user-profile-sections">
              <i class="bi bi-box-arrow-in-left user-icons"></i>
              <span className="user-login-signup">
                <p className="user-details">Logout</p>
              </span>
            </div>
          </Link>
          <div className="user-profile-sections">
            <i class="bi bi-gear user-icons"></i>
            <p className="user-details">Account & Settings</p>
          </div>
          <div className="user-profile-sections">
            <i class="bi bi-bell user-icons"></i>
            <p className="user-details">Notifications</p>
          </div>
          <div className="user-profile-sections">
            <i class="bi bi-ticket-fill user-icons"></i>
            <p className="user-details">Tickets</p>
          </div>
          <div className="user-profile-sections">
            <i class="bi bi-patch-question user-icons"></i>
            <p className="user-details">Help & Support</p>
          </div>
        </div>

        {/* <nav className="navbar navbar-expand-lg ">
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
        </nav> */}
      </div>

      <div className="user-events-section">
        <div className="user-main-div">
          <div className="user-heading">
            <h2>Event List.</h2>
          </div>
          <div className="user-container">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 user-event-cards ">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <div className="col" key={event._id}>
                    <div className="card">
                      <img
                        src={onam}
                        className="card-img-top event"
                        alt="..."
                      />
                      <div className="card-body">
                        <h4 className="card-title">{event.name}</h4>
                        <p className="card-text">
                          <span className="event-short-content">
                            Description:
                          </span>{" "}
                          {event.description}
                        </p>
                        <p>
                          <span className="event-short-content">Date:</span>{" "}
                          {event.date}
                        </p>
                        <p>
                          <span className="event-short-content">Price:</span>{" "}
                          {event.price}
                        </p>
                        <div className="book-ticket-btn-div">
                          <button
                            onClick={() => setSelectedEvent(event)}
                            className="book-ticket-btn"
                          >
                            Book Tickets
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                // <p className='user-no-event'>No events available.</p>
                <div className="error-img-div">
                  <img src={error} alt="" className="error-img" />
                </div>
              )}
            </div>
            <div className="booking-section">
              {selectedEvent && (
                <div className="selected-event">
                  <img src={selectedEvent.image} alt="" />
                  <h2 className="event-short-content">
                    Book Tickets for {selectedEvent.name}
                  </h2>
                  <p>
                    {" "}
                    <span className="event-short-content">Date: </span>
                    {selectedEvent.date}
                  </p>
                  <p>
                    {" "}
                    <span className="event-short-content">Description: </span>
                    {selectedEvent.description}
                  </p>
                  <p>
                    {" "}
                    <span className="event-short-content">Price: </span>
                    {selectedEvent.price}
                  </p>

                  <form action="" onSubmit={bookTickets}>
                    <div className="booking-input-div">
                      <input
                        type="number"
                        placeholder="Adults*"
                        value={ticketCount}
                        onChange={(e) => setTicketCount(e.target.value)}
                        className="ticket-count"
                        min={0}
                      />
                      <input
                        type="number"
                        placeholder="Parents*"
                        className="ticket-count"
                        min={0}
                      />
                      <input
                        type="number"
                        placeholder="Minors*"
                        className="ticket-count"
                        min={0}
                      />
                    </div>
                    <div className="ticket-buttons">
                      <button className="booking-btn">Book</button>
                      <button
                        className="remove-ticket-btn"
                        onClick={removeBooking}
                      >
                        Remove
                      </button>
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
