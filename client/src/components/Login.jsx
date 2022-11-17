import { useState } from 'react';
import TwoFactorAuth from './TwoFactorAuth.jsx'
import axios from 'axios';



const Login = () => {

	const [ UserName, setUserName ] = useState("");
	const [ PassWord, setPassWord ] = useState("");

	const [ Check2FA, setCheck2FA ] = useState(false);

	const [ Auth, setAuth ] = useState(false);





	const OnSubmit = () => {
		console.log("Submit...");
		
		axios.post(`${process.env.REACT_APP_HOST}/api/Login`, { Uname: UserName, Pword: PassWord }).then((response) => {
			console.log(response);

			if (response.data.Auth === true) {
				setCheck2FA(true);
			} else {
				alert("Error Not Valid Admin!\nLogin Attempt has been Logged.");
			}
		});



		setUserName("");
		setPassWord("");

	}



	return (
		<div>
			{ Check2FA ? 
				<div id="2FA">
					<TwoFactorAuth />
				</div>
				:
				<div id="LoginDiv">
					<h1>Login</h1>
					<div id="Uname">
						<h3>Username</h3><br />
						<input type="username" name="Username" value={UserName} onChange={(e) => setUserName(e.target.value)} /><br />
					</div>
					<div id="Pword">
						<h3>Password</h3>
						<input type="password" name="Password" value={PassWord} onChange={(e) => setPassWord(e.target.value)} /><br />
					</div>
					<br />
					<button id="Submit" onClick={OnSubmit} >Submit</button>
					
				</div>
			}
		</div>
	);
}; export default Login;