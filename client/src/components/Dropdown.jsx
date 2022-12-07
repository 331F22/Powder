import React, {useState} from 'react';

function Dropdown() {
  //get php data somehow
	let trails = [
	{name: "Bridger Bowl", 
	map: "poop"}
	]
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