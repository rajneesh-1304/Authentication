import React from 'react'
import RegisterForm from '../../components/Register/RegisterForm.jsx'
import './registerpage.css'

const Register = () => {
  return (
    <div className='register_container'>
      <div className='register_form'>
        <h1 className='register_heading'>Register</h1>
        <RegisterForm className='register_main_form' />
      </div>
    </div>
  )
}

export default Register
