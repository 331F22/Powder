import { useState } from 'react';

import SMSComp from "./TwoFactorComponents/SMS.jsx";
import EmailComp from "./TwoFactorComponents/EmailComp.jsx";
import PhantomConnect from "./TwoFactorComponents/PhantomConnect.tsx";
import CurrentEntries from './CurrentEntries.jsx';
import axios from 'axios';
const TwoFactorAuth = (props) => {

	const [ Web3, setWeb3 ] = useState(false);
	const [ SMS, setSMS ] = useState(false);
	const [ Email, setEmail ] = useState(false);
	const [ SendEmail, setSendEmail ] = useState(false);
	const [ SendSMS, setSendSMS ] = useState(false);
	const [ IsValid, setIsValid ] = useState(false);

	const Aemail = props.Email;
	const Aphone = props.Phone;



	const Propfunction = (Val) => {

		if (Val === true) {
			console.log("IsValid");
			setWeb3(false);
			setSMS(false);
			setEmail(false);
			setIsValid(true);
		}
	}


	const EmailSend = () => {
		console.log("Sending Email....");

		axios.post(`${process.env.REACT_APP_HOST}/api/TwoStepEmail`, { email: Aemail }).then((response) => {
			console.log("email request made to server");

		});
		setSendEmail(true);

	}

	const PhoneSend = () => {
		setSendSMS(true);
	}


	const OnWeb3 = () => {
		setWeb3(true);
		setSMS(false);
		setEmail(false);

	}

	const OnSMS = () => {
		setWeb3(false);
		setSMS(true);
		setEmail(false);

	}

	const OnEmail = () => {
		setWeb3(false);
		setSMS(false);
		setEmail(true);
	}

	return (

		<div>
			{IsValid ?
				<div>
					<CurrentEntries/>
				</div>

					:

				<div id="TwoStep">


					<div id="TwoFAoptions">
						<h3>Select Method of Authentication</h3>
						<button onClick={OnWeb3}>Web3 </button>
						<button onClick={OnSMS} >SMS </button>
						<button onClick={OnEmail}>Email </button>
					</div>
					
					<br />
					{Web3 ? <PhantomConnect Test={Propfunction}/> : null}
					{SMS ? <div> <h3>Text Code to {Aphone}</h3> <br/> <button onClick={PhoneSend}>Send</button> {SendSMS ? <SMSComp/> : null } </div> : null}
					{Email ? <div> <h3>Email Code to {Aemail}</h3> <br/> <button onClick={EmailSend}>Send</button> {SendEmail ? <EmailComp Test={Propfunction}/> : null } </div> : null}
				</div>
			}
		</div>

	);
}; export default TwoFactorAuth;