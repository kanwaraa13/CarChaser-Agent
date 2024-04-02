import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AgentNav } from './AgentNav';

export const AgentCarCalender = () => {
    const navigate = useNavigate();
    const [date, setDate] = useState(new Date());
    const [hours, setHours] = useState('01');
    const [minutes, setMinutes] = useState('00');
    const [period, setPeriod] = useState('am');
    
    // Function to generate days of the week
    const renderDaysOfWeek = () => {
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return daysOfWeek.map(day => <div key={day}>{day}</div>);
    };

    // Function to generate calendar cells
    const renderCalendarCells = () => {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const blanks = Array.from({ length: firstDayOfWeek }, (_, i) => <div key={`blank-${i}`} className="blank-cell"></div>);
    const days = Array.from({ length: daysInMonth }, (_, i) => <div key={`day-${i}`} className="calendar-cell">{i + 1}</div>);
    return [...blanks, ...days];
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

    return (
        <div class="mid-panel mt-3">
            <AgentNav />
            <div class="container">
               <div class="calender-panel">
                  <h3 class="main-heading"> View Calender </h3>
                  <div class="btn-calender-date-add">
                     <a data-toggle="modal" data-target=".bd-example-modal-lg1" class="btn btn-primary"> Add New Date</a>
                  </div>
               </div>
               <div class="table-panel py-4">
                  <table class="table table-bordered mid-table" cellspacing="4">
                     <thead>
                        <tr>
                           <th scope="col">Date</th>
                           <th scope="col">Start Time</th>
                           <th scope="col">end time</th>
                           <th scope="col">Action</th>                          
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                           <td>20-03-2024</td>
                           <td>10.00 AM</td>
                           <td>18.00 PM</td>
                           <td>
                            <a data-toggle="modal" data-target=".bd-example-modal-lg3" class="btn btn-sm btn-primary"> Edit</a>
                            <a data-toggle="modal" data-target=".bd-example-modal-lg-delete" class="btn btn-sm btn-primary ml-2"> Delete</a>
                           </td>                           
                        <div class="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel1" aria-hidden="true"></div>
                        </tr>
                         <tr>
                           <td>21-03-2024</td>
                           <td>11.00 AM</td>
                           <td>21.00 PM</td>
                           <td>
                            <a data-toggle="modal" data-target=".bd-example-modal-lg3" class="btn btn-sm btn-primary" > Edit</a>
                            <a data-toggle="modal" data-target=".bd-example-modal-lg-delete" class="btn btn-sm btn-primary ml-2"> Delete</a>
                            </td>                           
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
            
            {/* Add New Date Model */}
            <div class="modal fade bd-example-modal-lg1 newcar-modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
             <div class="modal-dialog" role="document">
                 <div class="modal-content">
                     <div class="modal-header">
                         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                             <span aria-hidden="true">&times;</span>
                         </button>
                     </div>
                     <div class="modal-body ">
                         <div class="calender-view">
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="app">
                                        <div class="app-main-calendar">
                                                <div className="calendar-header">
                                                    <button onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))}>
                                                        <span id="calendar-prev" class="material-symbols-rounded">
                                                        <i class="fa-solid fa-chevron-left"></i>
                                                        </span>
                                                    </button>
                                                    <h2>{new Date(date).toLocaleDateString('default', { month: 'long', year: 'numeric' })}</h2>
                                                    <button onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))}>
                                                        <span id="calendar-next" class="material-symbols-rounded">
                                                        <i class="fa-solid fa-chevron-right"></i>
                                                        </span>
                                                    </button>
                                                </div>
                                                <div className="calendar-body">
                                                    <div className="days-of-week">{renderDaysOfWeek()}</div>
                                                    <div className="calendar-days d-flex">{renderCalendarCells()}</div>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                       <div class="calendar-from">
                                        <div class="form-group">
                                             <label for="exampleFormControlSelect1">From</label>
                                              <select value={hours} onChange={handleHourChange}>
                                                    {Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0')).map(hour => (
                                                    <option key={hour} value={hour}>{hour}</option>
                                                    ))}
                                                </select>
                                                <span>:</span>
                                                <select value={minutes} onChange={handleMinuteChange}>
                                                    {Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0')).map(minute => (
                                                    <option key={minute} value={minute}>{minute}</option>
                                                    ))}
                                                </select>
                                                <select value={period} onChange={handlePeriodChange}>
                                                    <option value="am">AM</option>
                                                    <option value="pm">PM</option>
                                              </select>
                                         </div>
                                         <div>
                                             <div class="form-group">
                                                <label for="exampleFormControlSelect1">To</label>
                                                <select value={hours} onChange={handleHourChange}>
                                                    {Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0')).map(hour => (
                                                    <option key={hour} value={hour}>{hour}</option>
                                                    ))}
                                                </select>
                                                <span>:</span>
                                                <select value={minutes} onChange={handleMinuteChange}>
                                                    {Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0')).map(minute => (
                                                    <option key={minute} value={minute}>{minute}</option>
                                                    ))}
                                                </select>
                                                <select value={period} onChange={handlePeriodChange}>
                                                    <option value="am">AM</option>
                                                    <option value="pm">PM</option>
                                                </select>
                                             </div>
                                         </div>
                                     </div>
                                     </div>
                                 </div>
                             
                             <div class="text-center mt-4">
                                 <a href="#" class="btn btn-primary" data-dismiss="modal"> Submit</a>
                             </div>
                        </div>
                     </div>
                 </div>
             </div>
           </div>
      {/* Update Model */}
      <div class="modal fade bd-example-modal-lg3 newcar-modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
         <div class="modal-dialog" role="document">
            <div class="modal-content">
               <div class="modal-header">        
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                  </button>
               </div>
               <div class="modal-body">
                  <div class="edit-calendar">
                     <h3 class="main-heading py-3">Time Change</h3>

                     <div class="edit-calendar-panel">
                        <div>
                           <label for="appt-time">From</label>
                           <div class="select-flex"> 
                            <select value={hours} onChange={handleHourChange}>
                                {Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0')).map(hour => (
                                <option key={hour} value={hour}>{hour}</option>
                                ))}
                            </select>
                            <span>:</span>
                            <select value={minutes} onChange={handleMinuteChange}>
                                {Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0')).map(minute => (
                                <option key={minute} value={minute}>{minute}</option>
                                ))}
                            </select>
                            <select value={period} onChange={handlePeriodChange}>
                                <option value="am">AM</option>
                                <option value="pm">PM</option>
                            </select>
                            </div>
                        </div>
                        <div class="ml-4">
                           <label for="appt-time">To</label>  
                           <div class="select-flex">                    
                           <select value={hours} onChange={handleHourChange}>
                                {Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0')).map(hour => (
                                <option key={hour} value={hour}>{hour}</option>
                                ))}
                            </select>
                            <span>:</span>
                            <select value={minutes} onChange={handleMinuteChange}>
                                {Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0')).map(minute => (
                                <option key={minute} value={minute}>{minute}</option>
                                ))}
                            </select>
                            <select value={period} onChange={handlePeriodChange}>
                                <option value="am">AM</option>
                                <option value="pm">PM</option>
                            </select>
                            </div>  
                        </div>
                     </div>
                  </div>
                  <div class="text-center mt-4">
                     <a href="#" class="btn btn-primary" data-dismiss="modal"> Update</a>
                  </div>
                </div>
            </div>
         </div>
       </div>
     </div>

     {/* Delete Model */}
     <div class="modal fade bd-example-modal-lg-delete newcar-modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">        
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
                </button>
                </div>
                <div class="modal-body">
                <div class="delete-status">
                    <div class="delete-img">
                        <img src="/images/delete_garbage.png" alt="del-img"/>
                    </div>
                    <p>Are you sure  want to delete this time <br/> slot from calendar</p>
                    <div class="delete-btn">
                        <button type="button" class="btn btn-primary px-4" data-dismiss="modal">Delete</button>
                        <button type="button" class="btn btn-primary mx-4 px-4" data-dismiss="modal">Cancel</button>
                    </div>
                </div>
                </div>
            </div>
        </div>
      </div>

    </div>
   );
};
