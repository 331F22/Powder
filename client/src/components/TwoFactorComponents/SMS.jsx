import { useState } from 'react';


const SMS = () => {

	const [ SecNum, setSecNum ] = useState("");

	const OnSubmit = () => {
		console.log(SecNum);
		setSecNum("");
	}

	return (
		<div id="SMSoption">
			<h2>SMS option selected</h2>
			<br/>
			<br />
			<h4>Enter Code sent to Phone Number</h4>
			<input type="text" name="VerNum" value={SecNum} onChange={(e) => setSecNum(e.target.value)} /> <br />
			<br />
			<button onClick={OnSubmit}>Submit</button>
		</div>
	);
}; export default SMS;