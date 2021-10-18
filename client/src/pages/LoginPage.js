import React, { useContext,useState } from "react";
import { UserContext, UserProvider } from "../context/UserContext";
import { useHistory } from "react-router-dom";
import { login } from "../apis/auth";

const LoginPage = () => {
  const setIsAuth = useContext(UserContext).setIsAuth;
  const history = useHistory();
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const handleLogin = () =>{
    login(email,password)
    .then(result => {
      if ('Error' in result){
        alert(result.Error)
      }
      else{
        setIsAuth(true)
        history.push("/");
      }
      }
      )
  }


  return (
    <div>
      <h1>Login Page</h1>
       <div>
        <label>Email:</label>
        <input value={email} id="email" type="email" placeholder="email" onChange={(e)=>setEmail(e.target.value)}/>
      </div>
      <div>
        <label>Password:</label>
        <input value={password} id="password" type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
      </div>
      <div>
        <button
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};
export default LoginPage;
