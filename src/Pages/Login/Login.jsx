import styled from "@emotion/styled";
import { useState } from "react";
import { login } from '../../controller/moduls/AuthModule'
import './Login.css'


const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  outline:none;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Login = () => {

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  

  const handleUserName = (e) =>{
    setUserName(e.target.value)
  }
  const handlePassword = (e) =>{
    setPassword(e.target.value)
  }
  const handleLogin = (e) =>{
    e.preventDefault()
    login(userName, password)
  }

  return (
    <div className="containerLogIn">
      <div className="wrapperLogin">
        <div className="titleLogIn">SIGN IN</div>
        <div className="formLogin">
          <div className="inputLogin">
            <Input placeholder="username" value={userName} onInput={handleUserName} />
          </div>
          <div className="inputLogin">
          <Input type='password' value={password} placeholder="password" onInput={handlePassword}/>
          </div>
          <button className="button-488" onClick={handleLogin} ><span className="text">LOGIN</span></button>
          <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link href="/signin" className="linkSignUp">CREATE A NEW ACCOUNT</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;