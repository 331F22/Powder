import { useState } from 'react';
import axios from 'axios'

const DisplayVouchers = () => {

    const [vouchRem, setVouchRem] = useState(-1);
    const [newVols, setNewVols] = useState(-1);

    const countLow = {
        color: 'red',
    }
    const High = () => {
        return <b>{vouchRem}</b>;
    }
    const Low = () => {
        return <b style={countLow}>{vouchRem}</b>
    }
    function ShowCount(vouchRem) {
        if (vouchRem <= 10) {
            return <Low/>;
        }
        return <High/>;
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
  
    // Called from button click, does some read/write
    function handleEmailVouchers() {
      alert('This button has limited use. It only assigns voucher codes to volunteers, does not yet send them out in emails.')
      
      let vouchers = []
      let people = []
  
      // first get available vouchers
      axios.get(`${process.env.REACT_APP_HOST}/api/getvouchers`).then((response) => {
        let voucherList = response.data
        console.log(voucherList[0].ticketCode)
  
        for (let voucher of voucherList) {
          vouchers.push(voucher.ticketCode)
        }
        console.log(vouchers)
  
        // then get people who need a voucher
        axios.get(`${process.env.REACT_APP_HOST}/api/unrewardedvolunteers`).then((response) => {
          let volunteerList = response.data
          console.log(volunteerList[0].first_name)
  
          for (let person of volunteerList) {
            people.push(person.id)
          }
          console.log(people)
      
          // then assign the vouchers to the people
          assignVouchers(vouchers, people)
          getVoucherCount()
          getNewVolunteerCount()
        })
      })
    }
  
    function assignVouchers(vouchers, people) {
      // loop through each person in need of a voucher
      for (let i = 0; i < people.length; i++) {
        // first check if we're out of vouchers
        if (i >= vouchers.length) {
          alert('*******!!! OUT OF VOUCHERS !!!*******\nNot all volunteers have been given a voucher for Bridger. Please request more immediately!\n(And keep a better eye on our fancy voucher count too)')
        } else {
          let id = people[i]
          let voucher = vouchers[i]
          // call the api to update the database with the voucher assignment
          axios.put(`${process.env.REACT_APP_HOST}/api/assignvouchers`, { personId: id, ticket: voucher }).then((response) => {
            console.log("Put them together")
          })
        }
      } // end loop
    }   // end function assignVouchers
  
    getVoucherCount()



    return (
        <div>
            <h1>Display Vouchers</h1>
            <h4>Vouchers Remaining: {ShowCount(vouchRem)}</h4>
            <button id="submitEmailsButton" className='submitBtn' onClick={handleEmailVouchers}>Email Vouchers</button>
        </div>
    );
};

export default DisplayVouchers;