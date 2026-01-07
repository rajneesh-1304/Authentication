import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux'
import AccountCircle from '@mui/icons-material/AccountCircle';
import Lock from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './register.css'
import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';

const RegisterUserSchema = z.object({
  email: z.string().email({message: "Invalid email address"}),
  password : z.string().min(8, {message:"Password must be at least 8 digits"})
})


export default function RegisterForm() {
    const user = useSelector((state)=> state.user.value);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/');
    }
    const onSubmit = (data) =>{
    // console.log(data);
  }
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterUserSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

    const email=watch('email');
    const password = watch('password');
    const isDisabled= !email || !password;



  useEffect(()=>{
    console.log(errors)
  },[errors])
   useEffect(()=>{
    console.log(user)
  },[user])
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
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input
                        id="email"
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

                <Button variant="contained" sx={{ mt: 2 }} type="submit" disabled={isDisabled} onClick={()=> dispatch(register({email, password}))}>
                    Register
                </Button>
            </Box>
            </form>

            <div
                className='login'><p>Already Registered <span className='login_link' onClick={handleLogin}>Login</span></p></div>
        </div>
    );
}
