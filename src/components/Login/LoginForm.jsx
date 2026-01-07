import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';

import AccountCircle from '@mui/icons-material/AccountCircle';
import Lock from '@mui/icons-material/Lock';
import './login.css'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';


const RegisterUserSchema = z.object({
  email: z.string().email({message: "Invalid email address"}),
  password : z.string().min(8, {message:"Password must be at least 8 digits"})
})
export default function LoginForm() {

  const navigate=useNavigate();
  const handleRegister=()=>{
    navigate('/register');
  }
  const onSubmit = (data) =>{
    console.log(data);
  }
  const {
    register, handleSubmit, watch,formState: { errors },
  } = useForm({resolver: zodResolver(RegisterUserSchema),
    defaultValues: {
      email: '',
      password: '',
    }});

    const email=watch('email');
    const password = watch('password');
    const isDisabled= !email || !password;

      useEffect(()=>{
        console.log(errors)
      },[errors])
  
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: 300,
        gap: 2,
      }}
    >
      <FormControl variant="standard">
        <InputLabel htmlFor="username">Email</InputLabel>
        <Input
          id="username"
          {...register('email')}
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
        />
      </FormControl>

      <FormControl variant="standard">
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input
          id="password"
          type="password"
          {...register('password')}
          startAdornment={
            <InputAdornment position="start">
              <Lock />
            </InputAdornment>
          }
        />
      </FormControl>

      <Button variant="contained" sx={{ mt: 2 }} type='submit' disabled={isDisabled}>
        Login
      </Button>
    </Box>
      </form>

    <div
        className='register'><p>Not Registered <span className='register_link' onClick={handleRegister}>Register</span></p></div>
    </div>
  );
}
