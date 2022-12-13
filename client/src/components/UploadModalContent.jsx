import React, { useState } from "react";
import IconMenuClose from "./Icons";
import Papa from "papaparse";
import "../stylesheets/voucherModal.css";

const axios = require('axios')

const UploadContent = (prop) => {
  const { setOpenModal } = prop;
  const [tableRows, setTableRows] = useState([]);

  const [values, setValues] = useState([]);

  const changeHandler = (event) => {
    // Passing file data to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true, //set to flase if first row in CSV is a not a header
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];

        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
          return d;
        });

        setTableRows(rowsArray[0]);
        setValues(valuesArray);
      },
    });
  };

  const discard = () => {
    setValues([])
    setTableRows([])
  }

  const close = () => {
    setOpenModal(false);
    document.querySelector("body").classList.remove("modal-open");
  };

  const requestUpload = (values) => {
    const data = {
      voucherCode: values
    }
    axios.post(process.env.REACT_APP_HOST + '/api/uploadVouchers', data)
      .then(res => {
        console.log(`Status: ${res.status}`)
        console.log("Body: ", res.data)
      })
      .catch(err => {
        console.error(err)
      })
  };

  return (
    <div className="modal-Container">
      <div className="modal-Header">
        <div className="modal-Header-Logo">BSF</div>
        <div className="modal-Header-Text">Upload Vouchers</div>
        <div className="modal-Header-CloseBtn" onClick={() => close()}>
          <IconMenuClose />
        </div>
      </div>

      <div className="modal-Content">
        {!values[0] ? <>
        <img 
          alt=""
          className="logo"
          src="http://skitrax.com/wp-content/uploads/2019/06/Bridger-Ski-Foundation-logo.jpeg"
        ></img>
        <input
          type="file"
          name="file"
          onChange={changeHandler}
          accept=".csv"
          style={{ display: "block", margin: "10px auto" }}
        /></> : ''}
        {values[0] ? <h3>PREVIEW CODES BEFORE UPLOAD</h3> : ''}
        <table>
          <thead>
            <tr>
              {tableRows.map((rows, index) => {
                return <th key={index}>{rows}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {values.map((value, index) => {
              return (
                <tr key={index}>
                  {value.map((val, i) => {
                    return <td key={i}>{val}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        {values[0] ? <><button className="btn btn-danger" onClick={() => discard()}>Discard</button><button className="btn btn-primary" onClick={() => requestUpload(values)}>Upload {values.length} Codes to Database</button></> : ''}
      </div>
    </div>
  );
};

export default UploadContent;
