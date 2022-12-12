import { useState, useRef } from 'react';
import React/*, { Component } */ from 'react';
import axios from 'axios'

const AddEntry = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [currentEvent] = useState(parseInt(localStorage.getItem('Event')))
  const [entryList, setEntryList] = useState([])

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  if (localStorage.getItem('Event') === '0') {
    return (
      <p>To add volunteers please select an event above</p>
    )
  }

  // CREATE (POST)
  function submitEntry() {
    axios.post(`${process.env.REACT_APP_HOST}/api/create`, { first: firstName, last: lastName, email: emailAddress, event: currentEvent }).then((response) => {
          setEntryList([...entryList, { first_name: firstName, last_name: lastName, email_address: emailAddress }]
      )
    })

    ref1.current.value = ""
    setFirstName('')
    ref2.current.value = ""
    setLastName('')
    ref3.current.value = ""
    setEmailAddress('')
    
    refreshPage();
  }
  
  function refreshPage() {
    window.location.reload(false);
  }
  
  return (
    <div className="addEntry">
      <div id='wrap'>
      <div id='userInput'>
      <div id='SUTitle'>
      <h2>Sign Up</h2>
      </div>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input ref={ref1} id="firstName" type="text" name="firstName" onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input ref={ref2} id="lastName" type="text" name="lastName" onChange={(e) => setLastName(e.target.value)} />
        </div><br />
        <div className="emailField" >
          <label htmlFor="email">Email Address</label>
          <input ref={ref3} id="email" type="email" name="email" onChange={(e) => setEmailAddress(e.target.value)} />
        </div>
        <button className="submitBtn"
          onClick={() => {
            if (firstName.length > 0 && lastName.length > 0 && emailAddress.length > 0) {
              submitEntry(); 
              refreshPage();
            }
          }}
        >Add Entry</button>
      </div>
      <div id="secondroot">
        <img id="bsflarge" src="/photos/BSFlarge.jpg" alt="BSFLogoLarge" />
        <div id="bsftitle">
          COME SKI WITH US
        </div>
        <div id="bsftext">
          Here at the Bridger Ski Foundation, we know the importance of our mountain and the activities that it provides. 
          However, these activities don't arrange themselves and we will need all the help we can get to make sure that our community can continue to be provided with such activites.
          If you want to help your community and keep our mountain running smoothly then be sure to enter your name and email, as well as what jobs you think could suit you, and we get back to you as soon as possible!
          We will even throw in a discount for day passes for all your hard work. Thank you, we can't wait to see you out on the mountain!
        </div>
      </div>
    </div>
    </div>
  )
}

export default AddEntry;
