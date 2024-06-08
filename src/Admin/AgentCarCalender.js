import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AgentNav } from "./AgentNav";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import api from "../api";
export const AgentCarCalender = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [disabledDates, setDisabledDates] = useState([]);
  //const disabledDates = ["Mon", "Tue", "Fri"]; // Array of days to disable
  // Function to check if a date is disabled
  const isDateDisabled = (date) => {
    // Get the current date
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Reset time components to 0

    // Check if the date is before the current date
    const isPreviousDate = date < currentDate;

    // Check if the date is one of the disabled weekdays
    const isDisabledWeekday = disabledDates.includes(
      date.toLocaleDateString("en-US", { weekday: "short" })
    );

    return isPreviousDate || isDisabledWeekday;
  };
  const [hours, setHours] = useState("01");
  const [minutes, setMinutes] = useState("00");
  const [period, setPeriod] = useState("am");
  const [selectedDate, setSelectedDate] = useState(null); // State to hold the selected date
  const [calendarData, setCalendarData] = useState([]);
  const [fromTime, setFromTime] = useState({
    hours: "01",
    minutes: "00",
    period: "am",
  }); // State for "From" time
  const [toTime, setToTime] = useState({
    hours: "01",
    minutes: "00",
    period: "am",
  }); // State for "To" time
  const [addcalender, setAddCalender] = useState(); // State to hold the selected date
  const [selectedCalendarId, setSelectedCalendarId] = useState(null); // State to hold the selected Calendar_Id
  const [updatesucces, setUpdateSucces] = useState(null); // State to hold the selected date
  const [deletemessage, setDeleteMessage] = useState();

  useEffect(() => {
    fetchData();
    fetchWeekDaysData();
  }, []);
  const handleEdit = (calendarId) => {
    setSelectedCalendarId(calendarId);
  };
  const handleUpdate = async () => {
    try {
      const agentId = sessionStorage.getItem("agentId");
      const fromTimeString = `${fromTime.hours}:${fromTime.minutes} ${fromTime.period}`;
      const toTimeString = `${toTime.hours}:${toTime.minutes} ${toTime.period}`;

      // Send the API request with the updated time data
      const response = await api.put(
        `/agent/updatecalendar/${selectedCalendarId}`,
        {
          Start_Time: fromTimeString,
          End_Time: toTimeString,
        }
      );

      if (response.data && response.data.message) {
        setUpdateSucces(true);
        setTimeout(() => {
          window.location.reload(); // Reload the page
        }, 2000);
      } else {
        // Handle other responses
      }
    } catch (error) {
      console.error("Error updating calendar entry:", error);
    }
  };

  const handleDelete = (calendarId) => {
    setSelectedCalendarId(calendarId);
  };

  // Function to handle confirmation of deletion
  const handleConfirmDelete = async () => {
    try {
      // Send the delete request to the backend API
      await api.delete(`/agent/deletecalander/${selectedCalendarId}`);
      // Optionally, you can also update the UI to remove the deleted item from the calendarData state.

      setDeleteMessage(true);
      setTimeout(() => {
        window.location.reload(); // Reload the page
      }, 2000);
    } catch (error) {
      console.error("Error deleting calendar entry:", error);
    } finally {
      // Reset selectedCalendarId after deletion
      setSelectedCalendarId(null);
    }
  };

  const fetchWeekDaysData = async () => {
    const storedAgentId = sessionStorage.getItem("agentId");
    try {
      const response = await api.get(`/agent/getweekdays/${storedAgentId}`);
      if (response.data.Days && Array.isArray(response.data.Days)) {
        setDisabledDates(response.data.Days);
      } else {
        console.error(
          "Calendar data is not in the expected format:",
          response.data
        );
        // Handle the situation when data is not in the expected format
        // For example, you can set calendarData to an empty array
        setDisabledDates([]);
      }
    } catch (error) {
      console.error("Error fetching calendar data:", error);
    }
  };

  const fetchData = async () => {
    const storedAgentId = sessionStorage.getItem("agentId");
    try {
      const response = await api.get(
        `/agent/agentcalanderlisting/${storedAgentId}`
      );
      if (
        response.data.Agent_Calender &&
        Array.isArray(response.data.Agent_Calender)
      ) {
        setCalendarData(response.data.Agent_Calender);
      } else {
        console.error(
          "Calendar data is not in the expected format:",
          response.data
        );
        // Handle the situation when data is not in the expected format
        // For example, you can set calendarData to an empty array
        setCalendarData([]);
      }
    } catch (error) {
      console.error("Error fetching calendar data:", error);
    }
  };

  const handleFromDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleFromHourChange = (e) => {
    setFromTime({ ...fromTime, hours: e.target.value });
  };

  const handleFromMinuteChange = (e) => {
    setFromTime({ ...fromTime, minutes: e.target.value });
  };

  const handleFromPeriodChange = (e) => {
    setFromTime({ ...fromTime, period: e.target.value });
  };

  const handleToHourChange = (e) => {
    setToTime({ ...toTime, hours: e.target.value });
  };

  const handleToMinuteChange = (e) => {
    setToTime({ ...toTime, minutes: e.target.value });
  };

  const handleToPeriodChange = (e) => {
    setToTime({ ...toTime, period: e.target.value });
  };
  const handleHourChange = (e) => {
    setHours(e.target.value);
  };

  const handleMinuteChange = (e) => {
    setMinutes(e.target.value);
  };

  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
  };
  const handleAddNewDate = async () => {
    try {
      const agentId = sessionStorage.getItem("agentId");
      const fromTimeString = `${fromTime.hours}:${fromTime.minutes} ${fromTime.period}`;
      const toTimeString = `${toTime.hours}:${toTime.minutes} ${toTime.period}`;

      // Send the API request with the converted strings
      const response = await api.post("/agent/addnewcalander", {
        Calendar_Date: selectedDate,
        Agent_Id: agentId,
        Start_Time: fromTimeString,
        End_Time: toTimeString,
      });
      setAddCalender(true);
      setTimeout(() => {
        window.location.reload(); // Reload the page
      }, 2000);
      if (response.data && response.data.message) {
        // Handle success response
      } else {
        // Handle other responses
      }
    } catch (error) {
      console.error("Error saving bid price:", error);
    }
  };
  const renderHourOptions = () => {
    const hours = [];
    for (let i = 12; i <= 22; i += 2) {
      const hour = i === 12 ? 12 : i % 12; // If i is 12, set hour to 12, otherwise use i % 12
      hours.push(
        <option key={i} value={hour.toString().padStart(2, "0")}>
          {hour.toString().padStart(2, "0")}
        </option>
      );
    }
    return hours;
  };
  const renderMinuteOptions = () => {
    const minutes = "00";
    return minutes;
  };
  return (
    <div className="mid-panel mt-3">
      <AgentNav />
      <div className="container">
        <div className="calender-panel">
          <h3 className="main-heading mr-3"> View Calendar </h3>
          <div className="btn-calender-date-add">
            <button
              className="btn btn-primary" 
              data-toggle="modal"
              data-target=".bd-example-modal-lg1"
            >
              {" "}
              Add New Date
            </button>
          </div>
        </div>
        <div className="table-panel py-4">
          <table className="table table-bordered mid-table" cellSpacing="4">
            <thead>
              <tr>
                <th scope="col">WeekDays/Date</th>
                <th scope="col">Start Time</th>
                <th scope="col">End Time</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {calendarData.map((item) => (
                <tr key={item.Calendar_Id}>
                  <td>
                    {item.Calendar_Date
                      ? item.Calendar_Date
                      : item.Calendar_Day}
                  </td>
                  <td>{item.Start_Time}</td>
                  <td>{item.End_Time}</td>
                  {item.Creator === "Admin" ? (
                    <td colSpan="3">
                      Not Authorize to Edit Or Delete The Dates
                    </td>
                  ) : (
                    <td>
                      {item.Admin_Approval == 1 ? (
                        <a
                          onClick={() => handleEdit(item.Calendar_Id)}
                          data-toggle="modal"
                          data-target=".bd-example-modal-lg3"
                          className="btn btn-sm btn-primary "
                        >
                          Edit
                        </a>
                      ) : (
                        <a className="btn btn-sm btn-primary ">
                          Approval Pending
                        </a>
                      )}
                      <a
                        onClick={() => handleDelete(item.Calendar_Id)}
                        data-toggle="modal"
                        data-target=".bd-example-modal-lg-delete"
                        className="btn btn-sm btn-primary ml-2"
                      >
                        Delete
                      </a>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Date Modal */}
      <div
        className="modal fade bd-example-modal-lg1 newcar-modal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body d-flex">
              <div className="form-group agent-newcal-left">
                <div>
                  <h2>Calendar Date</h2>
                  <Calendar
                    onChange={handleFromDateChange}
                    value={date}
                    tileDisabled={({ date }) => isDateDisabled(date)}
                  />
                </div>
              </div>
              <div class="agent-newcal">
                <div className="form-group d-flex">
                  <label htmlFor="fromTime">From</label>
                  <div>
                    <select
                      value={fromTime.hours}
                      onChange={handleFromHourChange}
                    >
                      {renderHourOptions()}
                    </select>
                    <select
                      value={fromTime.period}
                      onChange={handleFromPeriodChange}
                    >
                      <option value="Am">AM</option>
                      <option value="Pm">PM</option>
                    </select>
                  </div>
                </div>
                <div className="form-group d-flex">
                  <label htmlFor="toTime">To</label>
                  <div>
                    <select value={toTime.hours} onChange={handleToHourChange}>
                      {renderHourOptions()}
                    </select>
                    <select
                      value={toTime.period}
                      onChange={handleToPeriodChange}
                    >
                      <option value="am">AM</option>
                      <option value="pm">PM</option>
                    </select>
                  </div>
                </div>
                {addcalender && (
                  <p className="text-success">Add Calendar Successfully</p>
                )}
                <button className="btn btn-primary" onClick={handleAddNewDate}>
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Update Model */}
      <div
        className="modal fade bd-example-modal-lg3 newcar-modal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">          
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="edit-calendar">
                  <h3 className="main-heading py-3">Time Change</h3>
                  <div className="edit-calendar-panel">
                    {" "}
                    <div>
                      <div className="form-group">
                        <label htmlFor="fromTime">From</label>
                        <div>
                          <select
                            value={fromTime.hours}
                            onChange={handleFromHourChange}
                          >
                            {renderHourOptions()}
                          </select>
                          <select
                            value={fromTime.period}
                            onChange={handleFromPeriodChange}
                          >
                            <option value="Am">AM</option>
                            <option value="Pm">PM</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="form-group">
                        <label htmlFor="toTime">To</label>
                        <div>
                          <select
                            value={toTime.hours}
                            onChange={handleToHourChange}
                          >
                            {renderHourOptions()}
                          </select>
                          <select
                            value={toTime.period}
                            onChange={handleToPeriodChange}
                          >
                            <option value="am">AM</option>
                            <option value="pm">PM</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-4">
                  {updatesucces && (
                    <p className="text-success">
                      Time entry updated successfullyy
                    </p>
                  )}
                  <button className="btn btn-primary" onClick={handleUpdate}>
                    Update
                  </button>
                </div>
              </div>
            </div>          
        </div>
      </div>

      {/* Delete Model */}
      <div
        className="modal fade bd-example-modal-lg-delete newcar-modal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="delete-status">
                <div className="delete-img">
                  <img src="/images/delete_garbage.png" alt="del-img" />
                </div>
                <p>
                  Are you sure want to delete this time <br /> slot from
                  calendar
                </p>
                <div className="delete-btn">
                  <button
                    type="button"
                    className="btn btn-primary px-4 mb-3"
                    onClick={handleConfirmDelete}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary mx-4 px-4 mb-3"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                </div>
                {deletemessage && (
                  <p className="text-danger">
                    Calendar entry deleted successfully
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
