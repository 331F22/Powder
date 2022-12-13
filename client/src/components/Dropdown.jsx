import React, {useState} from 'react';
import axios from 'axios'
import trailsJson from "../php/trails.json"
import './Dropdown.css'

let img1 = "";
let img2 = "";
let gEmbed = "";
let opTime = "";
let oDate = "";
let cDate = "";

function Dropdown() {
  //get php data somehow
	//if this doesnt work use backup
	let trails = trailsJson;
	console.log(trails);
	//backup
	//let trails = [{key: 1,
	//Name: 'Bridger Bowl',
	//Trail_Map_URL_1:'/images/trail-map2022-1.png',
	//Trail_Map_URL_2: "NULL",
	//Google_Maps_Embed_code: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8822.04651571907!2d-110.90525222022265!3d45.81572396808015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x53456b352bbc731f%3A0xfb325ae8b584df5c!2sBridger%20Bowl%20Ski%20Area!5e0!3m2!1sen!2sus!4v1669849040326!5m2!1sen!2sus',
	//Lift_Operation_Time: '9 AM - 4 PM',
	//Open_Date: '2022-12-09 00:00:00',
	//Close_Date: '2023-04-09 00:00:00'}]
	
// Using state to keep track of selected trail
let [trail, setTrail] = useState("Select a trail")

// update state of trail
let handleTrailChange = (e, link) => {
	let test = e.target.value.split(",");
	setTrail(test[0]);
	img1 = test[1];
	if(test[2] === "NULL"){
		img2 = "";
	} else {
		img2 = test[2];
	}
	
	gEmbed = test[3];
	opTime = test[4];
	oDate = test[5];
	cDate = test[6];
	console.log(img1)
}

  return (
    <div className="drop">
    {trail}
    <br />
    <select onChange={handleTrailChange}> 
      <option value="Select a trail"> -- Select a trail -- </option>
		{trails.map((trail) => <option key={trail.key} value={[trail.name, trail.Trail_Map_URL_1,trail.Trail_Map_URL_2, trail.Google_Maps_Embed_code, trail.Lift_Operation_Time, trail.Open_Date, trail.Close_Date ]}>{trail.Name}</option>)}
    </select>
	<p>Operation Time: {opTime}</p>
	<p>Open Date: {oDate}</p>
	<p>Close Date: {cDate}</p>
	<br />
	{img1 !== "" ?
	<img src={img1} alt = "" style={{width:"100%",height:"100%"}}/> : console.log('no image')}
	<br />
	{img2 !== "" ?
	<img src={img2} alt = "" style={{width:"100%",height:"100%"}}/> : console.log('no image')}
	<br />
	<iframe src={gEmbed} style={{width:"100%",height:"600"}} allowFullScreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
	
    </div>
  );
}

export default Dropdown;
