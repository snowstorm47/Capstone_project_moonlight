import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';

const theme = createTheme();

const SignIn = ()=> {
	
	
    const navigate = useNavigate();
	const [message, setMessage] = useState(null);
	const [failMessage, setFailMessage] = useState(null);

	const [loginInput,setLogin] = useState({
        email: '',
        password: '',
        error_list: []
    });

    const handleInput = (e) => {
        e.persist();
        setLogin({...loginInput,[e.target.name]: e.target.value});
    }

    const loginSubmit = (e) => {
        e.preventDefault();

        const data = {
            email: loginInput.email,
            password: loginInput.password
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
        axios.post('api/login', data).then(res =>{
            if(res.data.status === 200)
            {
                localStorage.setItem('auth_token',res.data.token);
                localStorage.setItem('auth_email',res.data.email);
                localStorage.setItem('auth_name',res.data.name);
                localStorage.setItem('auth_id',res.data.id);
				setMessage(res.message);
                console.log(res.data.message);
				// if(first === 0)
				// {
				// 	navigate("/createProfile");
				// 	first++;
				// }
				// else
				// {
                navigate("/newsfeed");
				// }
            }
            else if(res.data.status === 401)
            {
                console.log(res.data.message);
				setFailMessage(res.data.message);
				console.log(message);

            }
            else
            {
        setLogin({...loginInput, error_list: res.data.validation_errors});

            }
        });
    });
    }

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						marginBottom: 12,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<Box
						component="form"
						onSubmit={loginSubmit}
						noValidate
						sx={{ mt: 1 }}
					>
						<div style={{color:"green"}}>{message}</div>
						<div style={{color:"red"}}>{failMessage}</div>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							onChange={handleInput} 
							value={loginInput.email}
							autoFocus
						/>
						<span>{loginInput.error_list.email}</span>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							onChange={handleInput}
							value={loginInput.password}
							id="password"
						/>
						<span>{loginInput.error_list.password}</span>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 3 }}
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link to="">Forgot password?</Link>
							</Grid>
							<Grid item>
								<Link to="/signup">{"Don't have an account? Sign Up"}</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
export default SignIn;