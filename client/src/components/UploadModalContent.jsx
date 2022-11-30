import React, {useState} from "react";
import IconMenuClose from "./Icons";
import Papa from "papaparse";

import "../stylesheets/voucherModal.css";

const UploadContent = (prop) => {
  const { setOpenModal } = prop;
  const [tableRows, setTableRows] = useState([]);

  const [values, setValues] = useState([]);

  const changeHandler = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];

        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });
        setTableRows(rowsArray[0]);
        setValues(valuesArray);
      },
    });
  };

  const close = () => {
    setOpenModal(false);
    document.querySelector("body").classList.remove("modal-open");
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
        <input
          type="file"
          name="file"
          onChange={changeHandler}
          accept=".csv"
          style={{ display: "block", margin: "10px auto" }}
        />
        <br />
        <br />
        {/* Table */}
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
      </div>
    </div>
  );
};

export default UploadContent;
