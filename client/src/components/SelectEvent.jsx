import { useState, useEffect } from 'react';
import axios from 'axios'
import React from 'react';

const SelectEvent = () => {
    const [eventList, setEventList] = useState([]);

    // READ (GET)
    useEffect(() => {
      axios.get(`${process.env.REACT_APP_HOST}/api/readEvents`).then((response) => {
        setEventList(response.data);
      })
    }, [eventList])

    const eventName = localStorage.getItem('EventName');

    function showEvents() {
        const collection = document.getElementsByClassName("eventList");
        const showButton = document.getElementById('showBtn');

        for (let i = 0; i < collection.length; i++)
            collection[i].style.display = 'block';
        
        showButton.style.display = 'none';
    }

    function selectEvent(event_name, event_id) {
        console.log("Setting Event Id: " + event_id);
        localStorage.setItem('Event', event_id)
        console.log("New Event Id: " + localStorage.getItem('Event'));
        if (event_id === 0) {
            localStorage.setItem('EventName', 'All Volunteers');
        }
        else {
            localStorage.setItem('EventName', event_name);
        }
        window.location.reload(false); //Refresh Page
    }

    return (
        <div>
            <div className="SelectEvent">
                <h2>{eventName}</h2>
                <div id='showBtn'>
                    <button onClick={() => {
                        showEvents()
                    }} >Show Events</button> 
                </div>

                <div className='eventList'>
                    <table>
                        <thead>
                            <tr>
                            <th>Event Name</th>
                            <th>Date</th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {eventList.map((val, k) => {
                            return (<tr key={k}>
                                <td>{val.event_name}</td>
                                <td>{val.event_date}</td>
                                <td>
                                    <button display="inline" onClick={() => {
                                    selectEvent(val.event_name, val.event_id);
                                    }}>
                                    Select</button>
                                </td>
                            </tr>)
                    })}
                        </tbody>
                    </table>
                    
                    <button onClick={() => {
                        selectEvent("", 0);
                    }}>View All Volunteers</button>
                </div>
            </div>
        </div>
        
    )
}

export default SelectEvent;