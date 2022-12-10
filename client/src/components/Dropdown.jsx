import React, {useState} from 'react';
import axios from 'axios'
import phpTrails from "../php/conn.php"

function Dropdown() {
  //get php data somehow
	//if this doesnt work use backup
	//let trails = JSON.parse(phpTrails);
	//backup
	let trails = [{key: 1, name: "cool", map:"death"}]
	
// Using state to keep track of selected trail
let [trail, setTrail] = useState("Select a trail")

// update state of trail
let handleTrailChange = (e) => {
  setTrail(e.target.value)
  
}

  return (
    <div className="App">
    {trail}
    <br />
    <select onChange={handleTrailChange}> 
      <option value="Select a trail"> -- Select a trail -- </option>
		{trails.map((trail) => <option value={trail.name}>{trail.map}</option>)}
    </select>
	
	
	
    </div>
  );
}

export default Dropdown;