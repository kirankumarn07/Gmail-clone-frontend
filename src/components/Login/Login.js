import React, { useState } from 'react'
import './login.css'
import axios from 'axios';
import { useNavigate } from 'react-router';
// import Navbar from '../Navbar/Navbar';
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { Button } from '@mui/material';
import Snackbar from '@mui/material/Snackbar'
import { GoogleOAuthProvider } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import { useEffect } from 'react';

function Login() {
    var count = 0;
    let [open, setOpen] = useState(false)
    let navigate = useNavigate();

    function emailValidate() {
        const email = document.getElementById('email')
        const emailError = document.getElementById('emailError')
        if (email.value === "") {
            emailError.innerText = "*Required"
        }
        else {
            emailError.innerText = ""
        }
    }

    function passwordValidate() {
        const password = document.getElementById('password')
        const passwordError = document.getElementById('passwordError')
        if (password.value === "") {
            passwordError.innerText = "*Required"
        }
        else {
            passwordError.innerText = ""
        }
    }

    async function loginClick() {
        const email = document.getElementById('email');
        const emailError = document.getElementById('emailError');
        const password = document.getElementById('password');
        const passwordError = document.getElementById('passwordError');
    
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    
        if (email.value === '') {
            emailError.innerText = "*Required";
        } else {
            if (!email.value.match(emailPattern)) {
                emailError.innerText = "*Invalid";
            } else {
                emailError.innerText = "";
            }
        }
    
        if (password.value === '') {
            passwordError.innerText = "*Required";
        } else {
            if (password.value.length < 6) {
                passwordError.innerText = "*Password should be greater than 5 characters";
            } else {
                passwordError.innerText = "";
            }
        }
    
        if (emailError.innerText === "" && passwordError.innerText === "") {
            const userLoginDetails = {
                email: email.value,
                password: password.value
            };
    
            try {
                const response = await axios.post('http://localhost:5000/api/users/login', userLoginDetails);
               console.log(response);
                if (response.data) {
                    localStorage.setItem('token',response.data);
                    alert("Login Successful");
                    navigate("/emails/inbox");
                    // Handle successful login
                } else {
                    alert("Invalid email or password");
                    // Handle invalid credentials
                }
            } catch (error) {
                if (error.response && error.response.data) {
                    alert(error.response.data);
                } else {
                    console.error("Error logging in:", error);
                    alert("An error occurred while logging in");
                }
                // Handle other errors
            }
        }
    }
    
    

    function showPasswordClick() {
        const password = document.getElementById('password');
        count++;
        if (count % 2 === 0) {
            password.setAttribute('type', 'password')
        }
        else {
            password.removeAttribute('type')
        }
    }
    const error = (error) => {
        console.log(error)
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    const action = (
        <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    )
    return (
        <div className="backgroundImage">
            {/* <Navbar myProfile={false} logout={false} /> */}
            <div className="loginMainDiv shadow rounded" style={{}}>
                <div className='text-center'>
                    <h3 className='text-primary'>Login</h3>
                </div>
                <div>
                    <label htmlFor="email" className="form-label">Email address </label>
                    <input type="text" className="form-control" id="email" aria-describedby="emailHelp" autoComplete='off' onKeyUp={() => emailValidate()} />
                    <span id='emailError' className='text-danger'></span>
                </div>
                <div className='mt-3'>
                    <label htmlFor="password" className="form-label">Password </label>
                    <input type="password" className="form-control" id="password" aria-describedby="emailHelp" autoComplete='off' onKeyUp={() => passwordValidate()} />
                    <span id='passwordError' className='text-danger'></span>
                </div>
                <div className='mt-2'>
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onClick={() => showPasswordClick()} /> Show password
                </div>
                <div className='mt-1 text-center'>
                    <span className="text-danger" id='loginError'></span>
                </div>
                <div className='text-center mt-3'>
                    <Button type="button" variant='contained' className="btn btn-outline-primary" onClick={() => loginClick()}>Login</Button>
                    <div className="" style={{ width: 'fit-content', marginLeft: '60px', marginTop: '10px' }}>
                        <div>
                        {/* <GoogleOAuthProvider clientId="3ouew">...</GoogleOAuthProvider> */}
                        </div>
                    </div>
                    <h6 className='mt-3 hoverText' onClick={() => { navigate('/signup') }}>new user? <span className='text-primary' >create account</span></h6>
                    <h6 className=' hoverText' onClick={() => { navigate('/change-password') }}>forgot password? <span className='text-primary'>click here</span></h6>
                </div>
            </div>
            {
                open ? <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message="Login successful" action={action} /> : ''
            }
        </div>
    )
}

export default Login