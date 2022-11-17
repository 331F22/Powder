import { useState } from 'react';
import U2F2FA from "./TwoFactorComponents/U2F2FA.jsx";
import SMSComp from "./TwoFactorComponents/SMS.jsx";
import EmailComp from "./TwoFactorComponents/EmailComp.jsx";

import CurrentEntries from './CurrentEntries.jsx';

const TwoFactorAuth = () => {

	const [ U2F, setU2F ] = useState(false);
	const [ SMS, setSMS ] = useState(false);
	const [ Email, setEmail ] = useState(false);

	const [ IsValid, setIsValid ] = useState(false);

	const Propfunction = (Val) => {

		if (Val == true) {
			console.log("IsValid");
			setU2F(false);
			setSMS(false);
			setEmail(false);
			setIsValid(true);
		}
	}

	const OnU2F = () => {
		setU2F(true);
		setSMS(false);
		setEmail(false);

	}

	const OnSMS = () => {
		setU2F(false);
		setSMS(true);
		setEmail(false);

	}

	const OnEmail = () => {
		setU2F(false);
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
						<button onClick={OnU2F}>U2F Key</button>
						<button onClick={OnSMS} >SMS </button>
						<button onClick={OnEmail}>Email </button>
					</div>
					
					<br />
					{U2F ? <U2F2FA /> : null}
					{SMS ? <SMSComp/> : null}
					{Email ? <EmailComp Test={Propfunction}/> : null}
				</div>
			}
		</div>

	);
}; export default TwoFactorAuth;