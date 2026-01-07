import React from 'react'
import LoginForm from '../../components/Login/LoginForm.jsx'
import './login.css';

const Login = () => {
  return (
    <div className='login_container'>
      <div className='login_form'>
        <h1 className='login_heading'>Login</h1>
      <LoginForm className='login_main_form'/>
      </div>
    </div>
  )
}

export default Login
