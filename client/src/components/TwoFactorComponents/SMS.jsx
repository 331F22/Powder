import { useState } from 'react';
import axios from 'axios';

const SMS = (props) => {

	const [ SecNum, setSecNum ] = useState("");

	const Aphone = props.Tphone;

	const OnSubmit = () => {


		axios.post(`${process.env.REACT_APP_HOST}/api/VerifySMS`, { phone: Aphone, secnum: SecNum }).then((response) => {

			if (response.data.Auth === true) {
				props.Test(response.data.Auth);
				
			};
		});
		
		setSecNum("");
	}

	return (
		<div id="SMSoption">
			<br/>
			<br />
			<h4>Enter Code sent to Phone Number</h4>
			<input type="text" name="VerNum" value={SecNum} onChange={(e) => setSecNum(e.target.value)} /> <br />
			<br />
			<button onClick={OnSubmit}>Submit</button>
		</div>
	);
}; export default SMS;