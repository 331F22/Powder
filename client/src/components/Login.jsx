import { useState } from 'react';
import axios from 'axios';
import SendEmail from './SendEmail.jsx';
import CurrentEntries from './CurrentEntries.jsx';



const Login = () => {

    const [ Email, setEmail ] = useState("");
	const [ UserName, setUserName ] = useState("");
	const [ PassWord, setPassWord ] = useState("");

	const [ Check2FA, setCheck2FA ] = useState(false);

	const [ Auth, setAuth ] = useState(false);


	const [ Aemail, setAemail ] = useState("");

	const [ Aphone, setAphone ] = useState("");

    const [isValid, setisValid] = useState(false)

    const [needsLogin, setneedsLogin] = useState(true)


   
  //this will be moved to login
  const propFunc = (Val) => {
      if (Val === true)
      {
        setisValid(true)
        setCheck2FA(false)
      }
  }

  const OnSubmit = () => {
	console.log("Submit...");
	
	
	//	setAemail(response.data.email);
	//	setAphone(response.data.phone);
   if (PassWord == "Password"){
        console.log("login succesful")
        setCheck2FA(true)
        setneedsLogin(false)
    }
  		}
  
 
	
    
	return (
		<div>
            
			{ Check2FA ? 
				<div id="2FA">
					<SendEmail Test = {propFunc} Email = {Email}/>
				</div>
				: null }
            { needsLogin ?
				<div id="LoginDiv">
					<h1>Login</h1>
					<div id="Uname">
						<h3>Email</h3><br />
						<input type="Email" name="Email" value={Email} onChange={(e) => setEmail(e.target.value)} /><br />
					</div>
					
					<br />
					<button id="Submit" onClick={OnSubmit} >Submit</button>
					
				</div>
			 : null}
            
            {isValid ? <div><CurrentEntries/></div> : <h2>must be logged in to view entries</h2>}
		</div>
        
	);
}; 
export default Login;