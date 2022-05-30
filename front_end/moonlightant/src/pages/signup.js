// import * as React from 'react';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { Select } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { useState} from  'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const theme = createTheme();

const SignUp = ()=> {
  const first = 0;
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
	const [failMessage, setFailMessage] = useState(null);
  const [registerInput, setRegister] = useState({
    email: "",
    password: "",
    name: "",
    position: "",
    confirmPassword: "",
    error_list: [],
    confirm_error: "",
  });

  const handleInput = (e) => {
    e.persist();

    setRegister({ ...registerInput, [e.target.name]: e.target.value });
  };

  const registerSubmit = (e) => {
    // console.log(e.target.value);
    e.preventDefault();

    const data = {
      email: registerInput.email,
      password: registerInput.password,
      position: registerInput.position,
      name: registerInput.name,
    };

    const confirmPassword = registerInput.confirmPassword;
		if (confirmPassword === registerInput.password) {
    axios.get("/sanctum/csrf-cookie").then((res) => {
      axios.post("/api/register", data).then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("auth_email", res.data.email);
          localStorage.setItem("auth_name", res.data.name);
          localStorage.setItem("auth_id", res.data.id);
          localStorage.setItem("auth_position", res.data.position);
          localStorage.setItem("auth_profile", 0);
          console.log("after auth_token");
			  	setMessage(res.message);

          console.log(res.data.message);
          console.log(first);
          // swal("Success", res.data.message, "success");
          navigate("/signin",{state:{first}});
        } else {
          console.log("inside else");
				  setFailMessage(res.data.message);
          setRegister({
            ...registerInput,
            error_list: res.data.validation_errors,
          });
        }
      });
    });
  } else {
    setRegister({
      ...registerInput,
      confirm_error: "passwords are not the same",
    });
  }
  };

  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box
        sx={{
          marginTop: 3,
          mx: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={registerSubmit}
          sx={{
            mt: 1,
            mb: 7,

            mx: 12,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid sm={12} md={12} item xs={12}>
            {/* <Grid item xs={12} sx={{ mt: 1 }}>
              <InputLabel htmlFor="grouped-native-select">
                Sign up as
              </InputLabel>
              <Select 
              style={{ width: "30rem" }} 
              name="position"
              onChange={handleInput}
               value={registerInput.position}>
                <MenuItem value="Hiring Company">Hiring Company</MenuItem>
                <MenuItem value="Institution">Institute</MenuItem>
                <MenuItem value="Student">Student</MenuItem>
                <MenuItem value="Instructor">Instructor</MenuItem>
              </Select>
            </Grid> */}
            <div style={{color:"green"}}>{message}</div>
						<div style={{color:"red"}}>{failMessage}</div>
            <Grid item xs={12} sx={{ mt: 1 }}>
              <TextField
                autoComplete="given-name"
                name="position"
                required
                fullWidth
                id="position"
                label="Position"
                autoFocus
                onChange={handleInput}
                value={registerInput.position}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 1 }}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="fullName"
                label="Full Name"
                autoFocus
                onChange={handleInput}
                value={registerInput.name}
              />
              <span style={{color:"red"}}>{registerInput.error_list.name}</span>
            </Grid>

            <Grid item xs={12} sx={{ mt: 1 }}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleInput} 
                value={registerInput.email}
              />
              <span style={{color:"red"}}>{registerInput.error_list.email}</span>
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
                onChange={handleInput}  
                value={registerInput.password}
              />
              <span style={{color:"red"}}>{registerInput.error_list.password}</span>

            </Grid>

            <Grid item xs={12} sx={{ mt: 1 }}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="password"
                onChange={handleInput}
              />
              <div style={{color:"red"}}>{registerInput.error_list.password}</div>
          <div style={{color:"red"}}>{registerInput.confirm_error}</div>
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
              <Link to="/signin">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
export default SignUp;