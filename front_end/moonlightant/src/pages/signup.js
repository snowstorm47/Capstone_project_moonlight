import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {Link} from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import AsStudent from './asStudent'
import AsHiringCompany from './asHiringcompany';
import AsInstractor from './asInstractor';
import AsInstitute from './asInstitute';

const theme = createTheme();

export default function SignInSide() {


  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   });
  // };

  const[selectItems,setselectItems] =useState('student');

  const handleClick = (key) => {
      switch (key) {
      case "student":
        return <AsStudent />;
      case "institute":
        return <AsInstitute />;
      case "instractor":
        return <AsInstractor/>
      case "hire":
        return <AsHiringCompany/>
      default:
        break;
    }

  }


  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }} >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'linear-gradient(to bottom right, blue[500], blue[900])',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
      >
        <div style={{textAlign:'center', color:'black', marginTop:'5rem', fontWeight:'bold'}}>

          <h2 style={{ textDecoration:'underline',color:'black', fontWeight:'bold'}}>  Sign Up As  </h2>

        <p>Please Choose the way you would like to sign up as, there are four choices that are provided.To sign up as an institiution please select the provided button, please make sure you choose the correct form for avoid problems!  </p>

        </div>

          <div>
            <Grid>
              <Box
              sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
              >
                <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2  , pl:10.5, pr:10.5  }}
                key="student"
                value={selectItems}
                onClick={(e)=>setselectItems("student")}
              >
                Student
              </Button>

              <Button
                type="submit"
                variant="contained"
                key="institute"
                sx={{ mt: 3, mb: 2,  pl:10, pr:10   }}
                 onClick={(e)=>setselectItems("institute")}
              >
                Institute
              </Button>

                <Button
                type="submit"
                variant="contained"
                key="instractor"
                sx={{ mt: 3, mb: 2, pl:9, pr:9 }}
                 onClick={(e)=>setselectItems("instractor")}
              >
                Instractor
              </Button>

                <Button
                type="submit"
                variant="contained"
                key="hire"
                sx={{ mt: 3, mb: 2,  pl:7, pr:7  }}
                 onClick={(e)=>setselectItems("hire")}
              >
                Hiring Company
              </Button>

              </Box>
            </Grid>
           
          </div>
        

      </Grid>
     
          {
            handleClick(selectItems)
          }
      </Grid>
    </ThemeProvider>
  );
}