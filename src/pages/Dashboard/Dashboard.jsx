import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/slice/slice.js'
import './dashboard.css'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const user = useSelector(state=>state.users.currUser)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className='container'>
      <h1 className='heading'>Welcome {user.email}</h1>
      <button className='logout_button' onClick={logoutHandler}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
