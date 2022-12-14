import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const onSubmit = async (data) => {
    let response = null;
    try {
      response = await toast.promise(
        axios.post(`${process.env.REACT_APP_URL}/api/auth/register`, data),
        {
          pending: 'Processing ...',
          success: 'Register successfully',
        }
      );

      if (response.data.success) {
        navigate('/');
        console.log('REGISTER SUCCESS');
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.response.data.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#C70039' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                {...register('username', {
                  required: true,
                  pattern: /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/,
                })}
              />
              {errors.username?.type === 'required' && (
                <Typography
                  margin="normal"
                  fullWidth
                  style={{ color: 'red', fontSize: '13px' }}
                >
                  Username is required
                </Typography>
              )}
              {errors.username?.type === 'pattern' && (
                <p style={{ color: 'red', fontSize: '13px' }}>
                  Username/Email format is not true
                </p>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="nickname"
                label="Your Nickname"
                name="nickname"
                autoComplete="nickname"
                {...register('nickname', {
                  required: true,
                })}
              />
              {errors.nickname?.type === 'required' && (
                <Typography
                  margin="normal"
                  fullWidth
                  style={{ color: 'red', fontSize: '13px' }}
                >
                  Nickname is required
                </Typography>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register('password', {
                  required: true,
                  pattern:
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                })}
              />
              {errors.password?.type === 'required' && (
                <p style={{ color: 'red', fontSize: '13px' }}>
                  Password is required
                </p>
              )}
              {errors.password?.type === 'pattern' && (
                <p style={{ color: 'red', fontSize: '13px' }}>
                  Password format is not true
                </p>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                {...register('confirmPassword', {
                  required: true,
                  validate: (value) => value === watch('password'),
                })}
              />
              {errors.confirmPassword?.type === 'required' && (
                <p style={{ color: 'red', fontSize: '13px' }}>
                  Confirm password is required
                </p>
              )}
              {errors.confirmPassword?.type === 'validate' && (
                <p style={{ color: 'red', fontSize: '13px' }}>
                  Confirm password is not equal Password
                </p>
              )}
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/" variant="body2">
                    {'Already had an account? Sign In'}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Grid>
      <ToastContainer autoClose={2000} theme="colored" />
    </ThemeProvider>
  );
}
