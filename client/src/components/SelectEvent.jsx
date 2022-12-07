import { useState, useRef, useEffect } from 'react';
import axios from 'axios'
import React from 'react';

const SelectEvent = () => {
    const [toEventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventList, setEventList] = useState([]);
    const [updateName, setUpdateName] = useState('');
    const [updateDate, setUpdateDate] = useState('');

    const ref1 = useRef(null);
    const ref2 = useRef(null);

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
        const addButton = document.getElementById('createEvent');

        for (let i = 0; i < collection.length; i++)
            collection[i].style.display = 'block';
        
        showButton.style.display = 'none';

        addButton.style.display = 'block';
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

    function showCreateEvent() {
        console.log("Showing to create event")

        const inputs = document.getElementsByClassName('input');
        const first = document.getElementById('firstBtn')

        for (let i = 0; i < inputs.length; i++)
            inputs[i].style.display = 'block';

        first.style.display = 'none';
    }

    function createEvent() {
        console.log("Name: " + toEventName + ", Date: " + eventDate);

        axios.post(`${process.env.REACT_APP_HOST}/api/createEvent`, { event_name: toEventName, event_date: eventDate }).then((response) => {})

        setEventDate('');
        setEventName('');
        ref1.current.value = '';
        ref2.current.value = '';

        const inputs = document.getElementsByClassName('input');
        const first = document.getElementById('firstBtn')

        for (let i = 0; i < inputs.length; i++)
            inputs[i].style.display = 'none';

        first.style.display = 'block';
    }

    function DeleteEvent(event_id) {
        console.log("deleting event: " + event_id);
        axios.delete(`${process.env.REACT_APP_HOST}/api/deleteEvent/${event_id}`).then((response) => {})
    }

    function UpdateEvent(event_id) {
        console.log("updating event: " + event_id);
        axios.put(`${process.env.REACT_APP_HOST}/api/updateEvent`, { newName: updateName, newDate: updateDate, event_id: event_id }).then((response) => {})
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
                                <td>{val.event_name} </td>
                                <td>{val.event_date} </td>
                                <td>
                                    <button display="inline" onClick={() => {
                                        selectEvent(val.event_name, val.event_id);
                                    }}>
                                    Select</button>
                                </td>

                                <td>
                                    <button display="inline" onClick={() => {
                                        DeleteEvent(val.event_id);
                                    }}>
                                    Delete</button>
                                </td>

                                <td>
                                    <button onClick={() => {
                                        UpdateEvent(val.event_id)
                                    }}>
                                    Update</button>
                                </td>

                                <td>
                                    <input type="text" placeholder={val.event_name} 
                                    onChange={(e) => setUpdateName(e.target.value)} />
                                </td>

                                <td>
                                    <input type="date" placeholder={val.event_date}
                                    onChange={(e) => setUpdateDate(e.target.value)} />
                                </td>
                                
                            </tr>)
                            })}
                        </tbody>
                    </table>
                    
                    <button onClick={() => {
                        selectEvent("", 0);
                    }}>View All Volunteers</button>
                </div>

                <div id='createEvent'>
                    <button id='firstBtn' onClick={() => {
                        showCreateEvent();
                    }
                    }>Create Event</button>
                    <p className='input'>Name:</p> 
                    <input className='input' id='EventName' type="text" placeholder='Event Name' ref={ref1}
                    onChange={(e) => setEventName(e.target.value)}/>
                    <p className='input'>Date:</p> 
                    <input className="input" type="date" name='Date' placeholder='YY/MM/DD' ref={ref2}
                    onChange={(e) => setEventDate(e.target.value)}/>
                    <button className='input' onClick={() => {
                        if (toEventName.length > 0 && eventDate.length > 0 ) {
                            createEvent();
                        }
                    }}>Create Event</button>
                </div>
            </div>
        </div>
        
    )
}

export default SelectEvent;