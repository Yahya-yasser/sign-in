import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import { Link } from 'react-router-dom';



const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/user/show")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  // }, [users]);
  // to many request problem --> 60 request at the same time
  // res for result

  function deleteUser (id) {
    axios.delete(`http://127.0.0.1:8000/api/user/delete/${id}`)
  // <start> Update the state after deletion
    .then(() => {
      setUsers(users.filter(user => user.id !== id));
    })
  // <end> Update the state after deletion

  }
  const ShowUsers = users.map((user, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        <Link to={`${user.id}`}>
          <EditIcon  style={{ cursor: 'pointer', marginRight: '10px' }} />
        </Link>
        <CloseIcon onClick={() => {deleteUser(user.id)}} style={{ cursor: 'pointer' }} />
      </td>
    </tr>
  ));

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {ShowUsers}
        </tbody>
      </table>
    </div>
  );
};

export default Users;