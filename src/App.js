// App.js file 

import React from 'react';
import Signup from './SignUp';
import Login from './Login';
import Dashboard from './Dashboard';
import Home from './Home';
import { Route , Routes} from 'react-router-dom'
import Users from './Users';
import UpdateUser from './UpadateUser';

const App = () => {
  return(
    <main className='App'>
      <Home />
      <Routes>
          <Route path='/register' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/Dashboard' element={<Dashboard/>}>
            <Route path='users' element={<Users/>}/>
            <Route path='users/:id' element={<UpdateUser/>}/>
          </Route> 
      </Routes>
    </main>
  )
}
export default App;

