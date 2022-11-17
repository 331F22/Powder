import Papa from "papaparse"
import { useState } from "react";

function UploadVouchers() {

    const [parseData, setParseData] = useState([]);

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

            setParseData(results.data);
            setTableRows(rowsArray[0]);
            setValues(valuesArray);
        },
        });
    };

    return (
        <div>
          {/* File Uploader */}
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
      );
    }

export default UploadVouchers;