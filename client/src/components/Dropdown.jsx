import React, {useState} from 'react';
import axios from 'axios'
import phpTrails from "../php/conn.php"

function Dropdown() {
  //get php data somehow
	let trails = phpTrails;
	
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
		{trails.map((trail) => <option value={trail.name}>{trail.name}</option>)}
    </select>
	
	
	
    </div>
  );
}

export default Dropdown;