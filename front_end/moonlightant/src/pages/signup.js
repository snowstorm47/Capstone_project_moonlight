// import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { Select } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
;

const theme = createTheme();

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>

        <CssBaseline />

        <Box
          sx={{
             marginTop:3,
              mx: 12,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, mb: 7,  
            
              mx: 12,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
          
           }}>
            <Grid  sm={12} md={12}  item xs={12}>
         
            <Grid item xs={12} sx={{ mt: 1 }} >
            <InputLabel htmlFor="grouped-native-select">Sign up as</InputLabel>
            <Select style={{width:'30rem'}}>
            <MenuItem > Hiring Company</MenuItem>
            <MenuItem >Institute</MenuItem>
            <MenuItem >Student</MenuItem>
        </Select>
              </Grid>

              <Grid item xs={12} sx={{ mt: 1 }} >
                <TextField
                  autoComplete="given-name"
                  name="fullName"
                  required
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  autoFocus
                />
              </Grid>
           
              <Grid item xs={12} sx={{ mt: 1 }}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12} sx={{ mt: 1 }}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>

              <Grid item xs={12} sx={{ mt: 1 }}>
                <TextField
                  required
                  fullWidth
                  name="confirm password"
                  label="Confirm Password"
                  type="password"
                  id="password"
                />
              </Grid>
             
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to='/signin'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            
          </Box>
          
        </Box>
       
    </ThemeProvider>
  );
}