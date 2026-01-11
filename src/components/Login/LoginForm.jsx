import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, register as registerUser } from '../../redux/slice/slice.js';
import './login.css';

const LoginUserSchema = z.object({
  identifier: z.string().min(3, { message: "Username or Email required" }),
  password: z.string().min(8, { message: "Password must be at least 8 digits" }),
});

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users.users);
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginUserSchema),
    defaultValues: { identifier: '', password: '' },
  });

  const identifier = watch('identifier');
  const password = watch('password');
  const isDisabled = !identifier || !password;

  const onSubmit = (data) => {
    const { identifier, password } = data;
    const existingUser = users.find( u =>(u.email === identifier || u.username === identifier) &&u.password === password);

    if (existingUser) {
      dispatch(login({ identifier, password }));
      setSnackbarMessage('Login successful!');
      setSnackbarOpen(true);
    } else {
      setSnackbarMessage('Invalid username/email or password');
      setSnackbarOpen(true);
    }
  };


  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const action = (
    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  const handleRegisterNavigate = () => {
    navigate('/register');
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: 300, gap: 2 }}>
          <FormControl variant="standard">
            <TextField
              label="Username / Email"
              variant="outlined"
              {...register('identifier')}
              error={!!errors.identifier}
              helperText={errors.identifier?.message}
            />

          </FormControl>

          <FormControl variant="standard">
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ''}
            />
          </FormControl>

          <Button variant="contained" sx={{ mt: 2 }} type="submit" disabled={isDisabled}>
            Login
          </Button>
        </Box>
      </form>

      <div className='register'>
        <p>
          Not Registered <span className='register_link' onClick={handleRegisterNavigate}>Register</span>
        </p>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleClose}
        message={snackbarMessage}
        action={action}
      />
    </div>
  );
}
