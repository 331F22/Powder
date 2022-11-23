import { useState } from "react";
import axios from 'axios';


const EmailComp = (props) => {

	const [ SecNum, setSecNum ] = useState("");


	const Aemail = props.Temail;

	const OnSubmit = () => {

		axios.post(`${process.env.REACT_APP_HOST}/api/VerifyTwoStep`, { email: Aemail, secnum: SecNum }).then((response) => {

			if (response.data.Auth === true) {
				props.Test(response.data.Auth);
				
			};
		});


		setSecNum("");

	}



	return (

		<div id="Email">
			<br />
			<br />
			<div>
				<h4>Enter Code sent to Email</h4>
				<br/> 
				<input type="text" name="VerNum" value={SecNum} onChange={(e) => setSecNum(e.target.value)} /><br />
				<br />
				<button onClick={OnSubmit}>Submit</button>
			</div>


		</div>

	);
}; export default EmailComp;