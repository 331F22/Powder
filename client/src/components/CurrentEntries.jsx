import { useState, useRef, useEffect } from 'react';
import axios from 'axios'

const CurrentEntries = () => {

  const SECRET = process.env.REACT_APP_PASSCODE

  const [entryList, setEntryList] = useState([]);
  const [vouchRem, setVouchRem] = useState(-1);
  const [newVols, setNewVols] = useState(-1);


  // READ (GET)
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_HOST}/api/read`).then((response) => {
      setEntryList(response.data)
    })
  }, [entryList])

  const [newEmail, setNewEmail] = useState('')
  const [passcode, setPasscode] = useState('')

  function getObjectByValue(objVal) {
    let objectWithValue = {}
    entryList.forEach(entry => {
      if (Object.values(entry).indexOf(objVal) > -1) { // email value is inside obj inside array
        console.log('entry', entry)
        objectWithValue = entry
      }
    })
    return objectWithValue
  }

  // DELETE
  const deleteEntry = (email) => { // deletes ALL such email instances in the database
    axios.delete(`${process.env.REACT_APP_HOST}/api/delete/${email}`).then((response) => {
      let objToDelete = getObjectByValue(email)
      const index = entryList.indexOf(objToDelete) // deletes ONE instance in the state var
      if (index > -1) {
        let entryListCopy = [...entryList] // copy
        entryListCopy.splice(index, 1) // remove index
        setEntryList(entryListCopy)
      }
    }) //close .then()
  }

  // UPDATE (PUT)
  const updateEmail = (email) => { // replaces ALL such email instances in the database
    axios.put(`${process.env.REACT_APP_HOST}/api/update`, { old: email, new: newEmail }).then((response) => {
      let objToChange = getObjectByValue(email)
      const index = entryList.indexOf(objToChange)  // deletes ONE instance in the state var
      objToChange.email_address = newEmail
      if (index > -1) {
        let entryListCopy = [...entryList]
        entryListCopy[index] = objToChange
        setEntryList(entryListCopy)
      }
    }) //close .then()

    setNewEmail('') // clear all update email input fields
    let updateInputs = document.getElementsByClassName('updateInput');
    for (let i = 0; i < updateInputs.length; i++) {
      updateInputs[i].value = ''
    }
  }

  // READ (Display Num Vouchers left)
  const getVoucherCount = () => {
    axios.get(`${process.env.REACT_APP_HOST}/api/vouchersremaining`).then((response) => {
      let entryListCopy = response.data
      console.log(entryListCopy)
      console.log(entryListCopy[0])
      console.log(entryListCopy[0].Count)

      setVouchRem(entryListCopy[0].Count)
    })
  }

  // READ (Display number of volunteers without vouchers)
  const getNewVolunteerCount = () => {
    axios.get(`${process.env.REACT_APP_HOST}/api/unrewardedvolunteercount`).then((response) => {
      let entryListCopy = response.data
      console.log(entryListCopy)
      console.log(entryListCopy[0])
      console.log(entryListCopy[0].Count)

      setNewVols(entryListCopy[0].Count)
    })
  }

  function handleEmailVouchers() {
    alert('This button has limited use. It only assigns voucher codes to volunteers, does not yet send them out in emails.')
    
    // first get available vouchers
    axios.get(`${process.env.REACT_APP_HOST}/api/getvouchers`).then((response) => {
      let voucherList = response.data
      console.log(voucherList[0].ticketCode)

      let emails = []
      for (let voucher of voucherList) {
        emails = emails + voucher.ticketCode
      }
      console.log(emails)
    })

    // then get people who need a voucher
    axios.get(`${process.env.REACT_APP_HOST}/api/unrewardedvolunteers`).then((response) => {
      let volunteerList = response.data
      console.log(volunteerList[0].first_name)

      for (let person of volunteerList) {
        console.log(person.first_name)
      }
    })

    // then put them together
    //axios.put(`${process.env.REACT_APP_HOST}/api/assignvouchers`)
  }

  const refPass = useRef(null);

  function handleEditList(e) {
    const collection = document.getElementsByClassName("editControls")
    const editButton = document.getElementById('editButton')
    const doneButton = document.getElementById('doneButton')
    const editPasscodeInput = document.getElementById('editPasscodeInput')
    const submitEmailsButton = document.getElementById('submitEmailsButton')

    getVoucherCount()
    getNewVolunteerCount()

    if (passcode === SECRET) {

      for (let i = 0; i < collection.length; i++)
        collection[i].style.display = 'block'
      doneButton.style.display = 'inline'
      editButton.style.display = 'none'
      editPasscodeInput.style.visibility = 'hidden'
      submitEmailsButton.style.display = 'block'
      
      // Just for new Group 20 work
      const voucherLabel = document.getElementById('vouchersLeft')
      const voucherCount = document.getElementById('voucherCount')
      const volunteerLabel = document.getElementById('newVolunteers')
      const volunteerCount = document.getElementById('volunteerCount')

      // Displaying the things
      voucherCount.innerHTML = vouchRem
      voucherLabel.style.display = 'inline'
      volunteerCount.innerHTML = newVols
      volunteerLabel.style.display = 'inline'


    } else {
      for (let i = 0; i < collection.length; i++)
        collection[i].style.display = 'none'
      doneButton.style.display = 'none'
      editButton.style.display = 'inline'
      editPasscodeInput.style.visibility = 'visible'
      editPasscodeInput.focus()
    }
    setPasscode('')
    refPass.current.value = ''
  }


  function handleFinishedEditing() {
    const editPasscodeInput = document.getElementById('editPasscodeInput')
    const editButton = document.getElementById('editButton')
    const doneButton = document.getElementById('doneButton')
    const collection = document.getElementsByClassName("editControls")
    const submitEmailsButton = document.getElementById('submitEmailsButton')
    const voucherLabel = document.getElementById('vouchersLeft')
    const volunteerLabel = document.getElementById('newVolunteers')

    for (let i = 0; i < collection.length; i++)
      collection[i].style.display = 'none'
    editPasscodeInput.style.visibility = 'hidden'
    doneButton.style.display = 'none'
    editButton.style.display = 'inline'
    editButton.innerHTML = "Edit List"
    submitEmailsButton.style.display = 'none'
    voucherLabel.style.display = 'none'
    volunteerLabel.style.display = 'none'
  }

  function checkPasscode(e) {
    const editButton = document.getElementById('editButton')
    if ((e.target.value) === SECRET) {
      editButton.innerHTML = "OK"
      editButton.focus()
    }
    else {
      editButton.innerHTML = "Edit List"
    }
    setPasscode(e.target.value)
  }

  function abortPasscodeAttempt(e) {
    const editPasscodeInput = document.getElementById('editPasscodeInput')
    if (e !== SECRET) {
      setPasscode('')
      refPass.current.value = ''
      editPasscodeInput.style.visibility = 'hidden'
    }
  }

  return (

    <div className="currentEntries posRel">
      <h2>Current Entries</h2>

      <div className='userData'>
        {entryList.map((val, k) => {
          return (<div key={k}>
            <div>{val.last_name}, {val.first_name} <span className="emailListed">{val.email_address}</span> </div>

            <div className="editControls editGui">
              <button className='delete' onClick={() => {

                deleteEntry(val.email_address)
              }}>delete</button>
              <button className='update' onClick={() => {
                if (newEmail.length > 0) {
                  updateEmail(val.email_address);
                }
              }}>update</button>
              <input type="email" className="updateInput" placeholder={val.email_address}
                onChange={(e) => setNewEmail(e.target.value)} />
            </div>
          </div>)

        })}
        <div className="editField editGui">
          <button id="editButton" onClick={handleEditList}>Edit List</button>
          <button id="doneButton" onClick={handleFinishedEditing}>Finished Editing</button>
          <input id="editPasscodeInput" ref={refPass} type="password"
            placeholder='Enter passcode' onChange={checkPasscode}
            onBlur={(e) => abortPasscodeAttempt(e.target.value)} />
        </div>
        <button id="submitEmailsButton" className='submitBtn' onClick={handleEmailVouchers}>Email Vouchers</button>

        <div id="vouchersLeft">Unused Vouchers: <span id="voucherCount"></span></div>
        <div id="newVolunteers">New Volunteers w/o vouchers: <span id="volunteerCount"></span></div>

      </div>
    </div>
  )
}

export default CurrentEntries;