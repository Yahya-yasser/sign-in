// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import Header from './Components/Header';
const Signup = () => {
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')                                                     
  const [accept , setAccept] = useState(false)
  const [emailErr , setEmailErr] = useState()
  // const [false_flag , setFlag] = useState(true)

  async function handleSubmit(event){
    let ture_flag = true;
    event.preventDefault();
    setAccept(true);
      if (password.length <= 8) {
        // setFlag(false);
        ture_flag =false;
      }else{
        // setFlag(true)
        ture_flag = true
      }
      try {
        if (ture_flag) {
          let response = await axios.post("http://localhost:8000/api/login", {
            email: email,
            password: password,
          });
      
          if (response.status === 200) {
            window.localStorage.setItem('email', email);
            window.location.pathname = "/";
          }
        }
      } catch (error) {
        // Check if error.response exists to avoid undefined errors
        if (error.response) {
          setEmailErr(error.response.status);  // This will give you more information on the error
        } else {
          console.error("Error occurred: ", error.message);
          // Optionally set a different error message for network errors
          setEmailErr('Network Error or No Response from Server');
        }
      }
      
  }
  return(
    <div>
      <Header/>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Email</label>
          <input 
            id='email' 
            type='email' 
            placeholder='Email...' 
            value={email}
            name='user email'
            onChange={(event) => {setEmail(event.target.value)}}
            required/>
        </div>
        {accept && emailErr === 422 && <p>This email is already been taken</p>}
        <div>
          <label htmlFor='password'>Password</label>
          <input 
            id='password' 
            type='password' 
            placeholder='Password...' 
            value={password}
            name='user password'
            onChange={(event) => {setPassword(event.target.value)}}
            />
        </div>
        {password.length <= 8 && accept &&<p>Password must be more than 8 Char</p>}
        <br/>
        <button type='submit'>Register</button>  
      </form>
    </div>
  )
}
export default Signup;