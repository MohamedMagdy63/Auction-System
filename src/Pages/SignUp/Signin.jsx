import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import './Signup.css'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import { useState } from "react";
import { insertNewUser } from "../../controller/moduls/insertModule";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  outline:none;
`;
const Input2 = styled.input`
  flex: 1;
  min-width: 44.5%;
  height:3vh;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  outline:none;
`;
const Agreement = styled.span`
  font-size: 15px;
  margin: 20px 0px;
`;

const Text = styled.p`
color:white;
text-decoration:underline #60a3bc;
margin-left: 10px;
`
const Gender =styled.div`
flex:1;
margin: 20px 10px 0px 0px;
padding: 10px;
`





const Signin = () => {
  const [firstname,setFirstname] = useState('')
  const [lastname,setLastname] = useState('')
  const [username,setUsername] = useState('')
  const [phone,setPhone] = useState('')
  const [otherPhone,setOtherPhone] = useState('')
  const [address,setAddress] = useState('')
  const [birthday,setBirthday] = useState('')
  const [SSN,setSSN] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  const [gender,setGander] = useState('female')
// check_firstName check_lastName check_userName check_phoneNumber check_birthday check_address check_ssn check_pass check_conpass check_email
  const [check_firstName,setCheck_firstName]=useState(false)
  const [check_lastName,setCheck_lastName]=useState(false)
  const [check_userName,setCheck_userName]=useState(false)
  const [check_phoneNumber,setCheck_phoneNumber]=useState(false)
  const [check_phoneNumber2,setCheck_phoneNumber2]=useState(false)
  const [check_birthday,setCheck_birthday]=useState(false)
  const [check_address,setCheck_address]=useState(false)
  const [check_ssn,setCheck_ssn]=useState(false)
  const [check_pass,setCheck_pass]=useState(false)
  const [check_conpass,setCheck_conpass]=useState(false)
  const [check_email,setCheck_email]=useState(false)
  const [check_accept_terms,setCheck_accept_terms]=useState(false)
// max_firstName max_lastName max_userName max_phoneNumber max_phoneNumber2 max_ssn
  const [max_firstName,setMax_firstName]=useState(false)
  const [max_lastName,setMax_lastName]=useState(false)
  const [max_userName,setMax_userName]=useState(false)
  const [max_phoneNumber,setMax_phoneNumber]=useState(false)
  const [max_phoneNumber2,setMax_phoneNumber2]=useState(false)
  const [max_ssn,setMax_ssn]=useState(false)
// valid_firstName valid_lastName valid_phoneNumber valid_phoneNumber2 valid_ssn valid_email confirmPass
  const [valid_firstName, setValid_firstName] = useState('');
  const [valid_lastName, setValid_lastName] = useState('');
  const [valid_phoneNumber, setValid_phoneNumber] = useState('');
  const [valid_phoneNumber2, setValid_phoneNumber2] = useState('');
  const [valid_ssn, setValid_ssn] = useState('');
  const [valid_birth, setValid_birth] = useState('');

  const [valid_email, setValid_email] = useState(false);
  const [confirmPass, setConfirmPass] = useState(false);
  const [equalityPhones, setEqualityPhones] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const date  = new Date()
  const validBirthDate = date.getFullYear()  
  const handleFirstname = (e) =>{
    setFirstname(e.target.value)
    const result = e.target.value.replace(/[^a-z]/gi, '');
    setValid_firstName(result);
    if(firstname.length >= 15){
      setMax_firstName(true)
    }else{
      setMax_firstName(false)
    }
  }
  const handleLastname = (e) =>{
    setLastname(e.target.value)
    const result = e.target.value.replace(/[^a-z]/gi, '');
    setValid_lastName(result);
    if (lastname.length >= 15){
      setMax_lastName(true)
    }else{
      setMax_lastName(false)
    }
  }
  const handleUsername = (e) =>{
    setUsername(e.target.value)
    if(username.length >= 20){
      setMax_userName(true)
    }else{
      setMax_userName(false)
    }
  }
  const handlePhoneNumber = (e) =>{
    setPhone(e.target.value)
    const { value } = e.target;
    const regex = /^\d{0,11}$/; // only allow up to 11 digits
    if (regex.test(value)) {
      setValid_phoneNumber(value);
    }
    if(0 < phone.length && phone.length < 10){
      setMax_phoneNumber(true)
    }else{
      setMax_phoneNumber(false)
    }
  }
  const handleOtherPhoneNumber = (e) =>{
    setOtherPhone(e.target.value)
    const { value } = e.target;
    const regex = /^\d{0,11}$/; // only allow up to 11 digits
    if (regex.test(value)) {
      setValid_phoneNumber2(value);
    }
    if(0<otherPhone.length && otherPhone.length<10){
      setMax_phoneNumber2(true)
    }else{
      setMax_phoneNumber2(false)
    }
  }
  const handleAddress = (e) =>{
    setAddress(e.target.value)
  }
  const handleBirthday = (e) =>{
    setBirthday(e.target.value)
    const { value } = e.target;
    const check  = value.split('-',1)
    if (check >= validBirthDate || check > validBirthDate-16 || check < validBirthDate- 90){
      setValid_birth(true)
    }else{
      setValid_birth(false)
    }
  }
  const handleSSN =(e)=>{
    const { value } = e.target;
    const regex = /^\d{0,14}$/g; // only allow up to 11 digits
    if (regex.test(value)) {
      setValid_ssn(value);
      setSSN(e.target.value)
    }
    if(0< SSN.length && SSN.length < 13){
      setMax_ssn(true)
    }else{
      setMax_ssn(false)
    }
  }
  const handleEmail = (e) =>{
    setEmail(e.target.value)
    const validEmail =  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i 
      if(!validEmail.test(email)){
        setValid_email(true)
      }else{
        setValid_email(false)
      }
  }
  const handlePassword = (e) =>{
    setPassword(e.target.value)
  }
  const handleConfirmPassword = (e) =>{
    setConfirmPassword(e.target.value)
  }
  const handleGander = (e) =>{
    setGander(e.target.value)
  }
  const handleSubmitData = (e) =>{
    e.preventDefault()
    if(firstname === ''){
      setCheck_firstName(true)
    }
    else if(lastname === ''){
      setCheck_lastName(true)
      setCheck_firstName(false)
    }
    else if(username === ''){
      setCheck_userName(true)
      setCheck_lastName(false)
      setCheck_firstName(false)
    }
    else if(phone === ''){
      setCheck_phoneNumber(true)
      setCheck_lastName(false)
      setCheck_firstName(false)
      setCheck_userName(false)
    }
    
    else if(otherPhone === ''){
      setCheck_phoneNumber2(true)
      setCheck_phoneNumber(false)
      setCheck_lastName(false)
      setCheck_firstName(false)
      setCheck_userName(false)
    }
    else if (phone.valueOf() ===otherPhone.valueOf()){
      setEqualityPhones(true)
      setCheck_phoneNumber2(false)
      setCheck_phoneNumber(false)
      setCheck_lastName(false)
      setCheck_firstName(false)
      setCheck_userName(false)
    }else if(birthday === ''){
      // setCheck_birthday(true)
      setEqualityPhones(false)
      setCheck_address(false)
      setCheck_phoneNumber2(false)
      setCheck_phoneNumber(false)
      setCheck_lastName(false)
      setCheck_firstName(false)
      setCheck_userName(false)
    }
    else if(address === ''){
      setCheck_address(true)
      setEqualityPhones(false)
      setCheck_phoneNumber2(false)
      setCheck_phoneNumber(false)
      setCheck_lastName(false)
      setCheck_firstName(false)
      setCheck_userName(false)
      setCheck_birthday(false)
    }
    
    else if(SSN === ''){
      setCheck_ssn(true)
      setEqualityPhones(false)
      setCheck_birthday(false)
      setCheck_address(false)
      setCheck_phoneNumber2(false)
      setCheck_phoneNumber(false)
      setCheck_lastName(false)
      setCheck_firstName(false)
      setCheck_userName(false)
    }
    else if(email === ''){
      setCheck_email(true)
      setEqualityPhones(false)
      setCheck_ssn(false)
      setCheck_birthday(false)
      setCheck_address(false)
      setCheck_phoneNumber2(false)
      setCheck_phoneNumber(false)
      setCheck_lastName(false)
      setCheck_firstName(false)
      setCheck_userName(false)
    }
    else if(password === ''){
      setCheck_pass(true)
      setCheck_email(false)
      setEqualityPhones(false)
      setCheck_ssn(false)
      setCheck_birthday(false)
      setCheck_address(false)
      setCheck_phoneNumber2(false)
      setCheck_phoneNumber(false)
      setCheck_lastName(false)
      setCheck_firstName(false)
      setCheck_userName(false)
    }
    else if(confirmPassword === ''){
      setCheck_conpass(true)
      setEqualityPhones(false)
      setCheck_pass(false)
      setCheck_email(false)
      setCheck_ssn(false)
      setCheck_birthday(false)
      setCheck_address(false)
      setCheck_phoneNumber2(false)
      setCheck_phoneNumber(false)
      setCheck_lastName(false)
      setCheck_firstName(false)
      setCheck_userName(false)
    }
    else if(password.valueOf() != confirmPassword.valueOf()){
      setConfirmPass(true)
      setEqualityPhones(false)
      setCheck_conpass(false)
      setCheck_pass(false)
      setCheck_email(false)
      setCheck_ssn(false)
      setCheck_birthday(false)
      setCheck_address(false)
      setCheck_phoneNumber2(false)
      setCheck_phoneNumber(false)
      setCheck_lastName(false)
      setCheck_firstName(false)
      setCheck_userName(false)
    }
    else if (acceptTerms != true){
      setCheck_accept_terms(true)
      setConfirmPass(false)
      setEqualityPhones(false)
      setCheck_conpass(false)
      setCheck_pass(false)
      setCheck_email(false)
      setCheck_ssn(false)
      setCheck_birthday(false)
      setCheck_address(false)
      setCheck_phoneNumber2(false)
      setCheck_phoneNumber(false)
      setCheck_lastName(false)
      setCheck_firstName(false)
      setCheck_userName(false)
    }
    else {
      setCheck_accept_terms(false)
      setConfirmPass(false)
      setEqualityPhones(false)
      setCheck_conpass(false)
      setCheck_pass(false)
      setCheck_email(false)
      setCheck_ssn(false)
      setCheck_birthday(false)
      setCheck_address(false)
      setCheck_phoneNumber2(false)
      setCheck_phoneNumber(false)
      setCheck_lastName(false)
      setCheck_firstName(false)
      setCheck_userName(false)
    
      
      insertNewUser(firstname,lastname,username,
            phone,otherPhone,
            address,birthday,
            SSN,email,
            password,confirmPassword,
            gender)
    }
  }
  const handleAgreeOnTerms = (e) =>{
    setAcceptTerms(e.target.checked)
  }
  return (
    <div className="containerSignUp">
      <div className="wrapperSignUp">
      <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input onChange={handleFirstname} type="text" value={valid_firstName} placeholder="First name" />
          <Stack sx={{ width: '98%' }} spacing={2}>
            {check_firstName == true ? <Alert severity="error">Empty Field — check it out!</Alert> : ''}
            { max_firstName == true ? <Alert severity="warning">Very Maximum input — check it out!</Alert>:''}
          </Stack> 
          <Input onChange={handleLastname} type="text" value={valid_lastName} placeholder="Last name" />
          <Stack sx={{ width: '98%' }} spacing={2}>
            {check_lastName == true ? <Alert severity="error">Empty Field — check it out!</Alert> : ''}
            {max_lastName == true ? <Alert severity="warning">Very Maximum input — check it out!</Alert>:''}
          </Stack> 
          <Input2 onChange={handleUsername} placeholder="Username" /> 
          <Stack sx={{ width: '98%' }} spacing={2}>
            {check_userName == true ? <Alert severity="error">Empty Field — check it out!</Alert> : ''}
            {max_userName == true ? <Alert severity="warning">Very Maximum input — check it out!</Alert>:''}
          </Stack>
          <Input className="phoneSignUp" onChange={handlePhoneNumber} value={valid_phoneNumber} type='tel' pattern="^01[0125][0-9]{8}$" placeholder="Phone number" />
          <Stack sx={{ width: '98%' }} spacing={2}>
            {check_phoneNumber == true ? <Alert severity="error">Empty Field — check it out!</Alert> : ''}
            {max_phoneNumber == true ? <Alert severity="warning">Wrong phone number — check it out!</Alert>:''}
          </Stack>
          <Input onChange={handleOtherPhoneNumber} type='tel' value={valid_phoneNumber2} placeholder="Additional phone number" />
          <Stack sx={{ width: '98%' }} spacing={2}>
            {check_phoneNumber2 == true ? <Alert severity="error">Empty Field — check it out!</Alert> : ''}
            {max_phoneNumber2 == true ? <Alert severity="warning">Wrong phone number — check it out!</Alert>:''}
            {equalityPhones == true ? <Alert severity="error">Repeated Field — check it out!</Alert> : ''}
          </Stack>
          <Input onChange={handleBirthday} type='date' placeholder="Birthday" />
          <Stack sx={{ width: '98%' }} spacing={2}>
            {check_birthday == true ? <Alert severity="error">Empty Field — check it out!</Alert> : ''}
            {valid_birth == true ? <Alert severity="warning">Your age must be +16</Alert>:''}
          </Stack>
          <Gender>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label" style={{color:'white'}}>Gender</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
              onChange={handleGander}
              style={{display:"flex", flexDirection:'row'}}
            >
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl> 
          </Gender>  
          
          <Stack sx={{ width: '50%' }} spacing={2}>
           
          </Stack>
          <Input onChange={handleAddress} placeholder="Address" />
          <Stack sx={{ width: '98%' }} spacing={2}>
            {check_address == true ? <Alert severity="error">Empty Field — check it out!</Alert> : ''}
          </Stack>
          <Input onChange={handleSSN} value={valid_ssn} placeholder="SSN number" />
          <Stack sx={{ width: '98%' }} spacing={2}>
            {check_ssn == true ? <Alert severity="error">Empty Field — check it out!</Alert> : ''}
            {max_ssn == true ? <Alert severity="warning">Wrong SSN Number — check it out!</Alert>:''}
          </Stack>
          <Input onChange={handleEmail} type='email' placeholder="Email" />
          <Stack sx={{ width: '98%' }} spacing={2}>
            {valid_email == true ? <Alert severity="warning">Wrong email — check it out!</Alert> : ''}
            {check_email == true ? <Alert severity="error">Empty Field — check it out!</Alert> : ''}
          </Stack>
          <Input onChange={handlePassword} type='password' placeholder="Password" />
          <Stack sx={{ width: '98%' }} spacing={2}>
            {check_pass == true ? <Alert severity="error">Empty Field — check it out!</Alert> : ''}
          </Stack>
          <Input onChange={handleConfirmPassword} type='password' placeholder="Confirm password" />
          <Stack sx={{ width: '98%' }} spacing={2}>
            {check_conpass == true ? <Alert severity="error">Empty Field — check it out!</Alert> : ''}
            {confirmPass == true ? <Alert severity="error">Password doesn't match — check it out!</Alert> : ''}
          </Stack>
          <Agreement>
          <label class="form-control">
            <input onChange={handleAgreeOnTerms} type="checkbox" name="" id="" />
            <p>
              By creating an account, I consent to the processing of my personal
              data in accordance with the <NavLink className="privacyLink" to="/Privacy" target="_blank">PRIVACY POLICY</NavLink>
            </p>
          </label>
          {check_accept_terms == true ? <Alert severity="error">Required Field — check it out!</Alert> : ''}
          </Agreement>
          <button className="button-48"  onClick={handleSubmitData}><span className="text">Sign up</span></button>
          <NavLink to="/Login">
          <Text>Sign in</Text>
          </NavLink>
        </Form>
      </div>
    </div>
  );
};

export default Signin;