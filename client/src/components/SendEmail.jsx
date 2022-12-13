import emailjs from '@emailjs/browser'
import {useState} from 'react'



const SendEmail = (props) =>{
    const [ Valid, setValid ] = useState(false);
    let Aemail =props.Email
    let code = 0

function generateCode () {
    code = Math.floor(1000 + Math.random() * 9999)
}

function validate (){
    if (document.getElementById('inputCode').value== code){
        console.log("yep that's valid")
        setValid(true);
        props.Test(true)
    }
    else {
        console.log("that aint right")
    }
}

function send () {
var templateParams = {
    user_email: Aemail,
    user_name: 'bsf',
    message: 'this email was sent from sendEmail component',
    code: code
};

emailjs.send('service_awhgdhj', 'template_x4zca4t', templateParams, '7I-n2RT0-7d2Vq96J')
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });
}

generateCode()
send()

return (
    <div className='TFA'>
            <h2>Authentication</h2>
            <p> a code has been sent to {Aemail}</p>
            <input type = "Text" id = "inputCode" placeholder = "enter code"></input>
            <button id="submit button" onClick={validate}>submit</button>
    </div>
)

}

export default SendEmail

