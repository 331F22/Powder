import { useState } from "react";
import axios from 'axios';


const EmailComp = (props) => {

	const [ SecNum, setSecNum ] = useState("");
	const [ SendEmail, setSendEmail ] = useState(false);

	const OnSubmit = () => {

		axios.post(`${process.env.REACT_APP_HOST}/api/VerifyTwoStep`, { secnum: SecNum }).then((response) => {

			if (response.data.Auth === true) {
				props.Test(response.data.Auth);
				
			};
		});


		setSecNum("");

	}

	const EmailSend = () => {
		console.log("Sending Email....");
		setSendEmail(true);

	}

	return (

		<div id="Email">
			<h2>Email option selected</h2>
			<br />
			<br />
			{SendEmail ? <div> <h4>Enter Code sent to Email</h4> <br/> <input type="text" name="VerNum" value={SecNum} onChange={(e) => setSecNum(e.target.value)} /><br /> <br /> <button onClick={OnSubmit}>Submit</button></div> : <button onClick={EmailSend}>Send</button>}


		</div>

	);
}; export default EmailComp;