// header.js
// use Link 
// handleLogOut function

import { Link } from 'react-router-dom';
const Header = () => {
  function handleLogOut(){
    window.localStorage.removeItem('email');
    window.location.pathname = "/";
  }
  return(
    <div>
      <Link to="/">Home</Link>
      <Link to="/">About</Link>
      <br/><br/>
      
      { window.localStorage.getItem("email") ? (
        <button onClick={handleLogOut}>Logout</button> 
      ) : (
        <>
          <Link to='/register'>Register</Link>
          <Link to='/login'>Login</Link>
        </>
      )}
      <br/><br/><br/><br/><br/><br/>
    </div>
  )
}
export default Header;
