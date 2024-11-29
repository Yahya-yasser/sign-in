// SignUp.js file 

import React, { useState } from 'react';
import axios from 'axios';
import Header from './Components/Header';
import Form from './Components/Form';

const Signup = () => {
  return(
    <div>
      <Header/>
      <Form/>
    </div>
  )
}
export default Signup;

// use axios 
// bulid handle sumbit function with async and wait 
// async -> fo2
// wait  -> tht
// use try and catch
// return ( build form and handle erros )
