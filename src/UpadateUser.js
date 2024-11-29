import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordR, setPasswordR] = useState('');
  const [accept, setAccept] = useState(false);
  
  // Added errorMessage state for feedback
  const [errorMessage, setErrorMessage] = useState('');

  const id = window.location.pathname.split('/').slice(-1)[0];

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/user/showbyid/${id}`)
      .then(res => res.json())
      .then((data) => {
        if(data && data.length > 0) {
          setName(data[0].name);
          setEmail(data[0].email);
        }
      });
  }, [id]);

  async function handleSubmit(event) {
    event.preventDefault();
    setAccept(true);
    
    // Reset error message on submit
    setErrorMessage('');

    // Simplified validation logic
    if (name.length <= 2 || password.length <= 8 || password !== passwordR) {
      return;
    }

    try {
      let response = await axios.post(`http://localhost:8000/user/${id}`, {
        name: name,
        email: email,
        password: password,
        password_confirmation: passwordR
      });

      if (response.status === 200 || response.status === 204) {
        window.location.pathname = '/dashboard/users';
        window.localStorage.setItem("email", email);
      }
    } catch (error) {
      // Set error message if update fails
      setErrorMessage('Failed to update user. Please try again.');
      console.error(error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>Name</label>
          <input 
            id='name' 
            type="text" 
            placeholder="Name..." 
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        {name.length <= 2 && accept && <p>Enter name with more than 3 characters.</p>}
        
        <div>
          <label htmlFor='email'>Email</label>
          <input 
            id='email' 
            type='email' 
            placeholder='Email...' 
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor='password'>Password</label>
          <input 
            id='password' 
            type='password' 
            placeholder='Password...' 
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        {password.length <= 8 && accept && <p>Password must be more than 8 characters.</p>}
        
        <div>
          <label htmlFor='repeat-password'>Repeat Password</label>
          <input 
            id='repeat-password' 
            type='password' 
            placeholder='Repeat Password...' 
            value={passwordR}
            onChange={(event) => setPasswordR(event.target.value)}
          />
        </div>
        {password !== passwordR && accept && <p>Passwords do not match!</p>}
        
        {/* Display error message if there's an error */}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        
        <br/>
        <h1 type='submit'>Update BTN</h1>  
        <h1>there is error fo update the data</h1>
      </form>
    </div>
  );
}

export default UpdateUser;