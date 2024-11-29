import axios from "axios"
import { useState } from "react"


const Form = () =>{
  const [name , setName] = useState('')
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')                                                     
  const [passwordR , setPasswordR] = useState('')
  const [accept , setAccept] = useState(false)
  const [emailErr , setEmailErr] = useState()

  async function handleSubmit(event){
    let ture_flag = true;
    event.preventDefault();
    setAccept(true);

    if (name.length <= 2 || password.length <= 8 || password !== passwordR) {
      ture_flag =false;
    }else{
      ture_flag = true
    }
    
    try{
        if (ture_flag){
          let response = await axios.post("http://localhost:8000/api/register", {
            name: name,
            email: email,
            password: password,
            password_confirmation: passwordR
          });
          if (response.status === 200 || 204){
            window.location.pathname = '/'
            window.localStorage.setItem("email", email)
          }
        }
      }
    catch(error){
      setEmailErr(error.response.status); 
    };
    
  }
  return(
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>Name</label>
          <input 
            id='name' 
            type="text" 
            placeholder="Name..." 
            value={name}
            name='user name'
            onChange={(event) => {setName(event.target.value)}}
            />
        </div>
        {name.length<=2 && accept &&<p>Enter name have more than 3 Char</p>}
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
        <div>
          <label htmlFor='repeat-password'>Repeat Password</label>
          <input 
            id='repeat-password' 
            type='password' 
            placeholder='Repeat Password...' 
            value={passwordR}
            name='user passwordR'
            onChange={(event) => {setPasswordR(event.target.value)}}
            />
        </div>
        {password !== passwordR && accept && <p>Password does not match!</p>}
        <br/>
        <button type='submit'>Register</button>  
      </form>
    </>
  )
}
export default Form;