import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { logout } from '../redux/actions/authActions'; // Ensure you have this action
// import { updateProfile } from '../redux/actions/userActions'; // Ensure you have this action

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  // const { orders } = useSelector((state) => state.orderList); // Assuming you have this slice

  const [username, setUsername] = useState(userInfo?.username || '');
  const [email, setEmail] = useState(userInfo?.email || '');
  
  if (!userInfo) {
    return <div>Loading...</div>;
  }

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ username, email }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className='profile-page'>
      <h6>Profile Page</h6>
      <section>
        <h2>Update Profile Information</h2>
        <form onSubmit={handleUpdateProfile}>
          <div>
            <label htmlFor="username">Username:</label>
            <input 
              id="username" 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input 
              id="email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <button type="submit">Update</button>
        </form>
      </section>
      
      <section>
        <h2>Your Orders</h2>
        {/* <ul>
          {orders?.map(order => (
            <li key={order.id}>
              <div>Order ID: {order.id}</div>
              <div>Total: ${order.total}</div>
              <div>Status: {order.status}</div>
            </li>
          ))}
        </ul> */}
      </section>

      <section>
        <button onClick={handleLogout}>Log Out</button>
      </section>
    </div>
  );
};

export default ProfilePage;
