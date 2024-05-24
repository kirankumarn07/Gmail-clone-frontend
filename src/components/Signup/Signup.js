import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Snackbar from '@mui/material/Snackbar'
import { Button } from '@mui/material'
import { GoogleOAuthProvider } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios'
import './signup.css'

function Signup() {
    let count = 0;
    let navigate = useNavigate()
    let [open, setOpen] = useState(false)
    let [allUsers, setAllUsers] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8001/allUsers')
            .then((res) => {
                setAllUsers(res.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    function nameValidate() {
        const name = document.getElementById('name')
        const nameError = document.getElementById('nameError')
        if (name.value === '') {
            nameError.innerText = "*Name is Required"
        }
        else {
            nameError.innerText = ""

        }
    }

    function emailValidate() {
        const email = document.getElementById('email')
        const emailError = document.getElementById('emailError')
        if (email.value === '') {
            emailError.innerText = "*Email is Required"
        }
        else {
            emailError.innerText = ""

        }
    }

    function passwordValidate() {
        const password = document.getElementById('password')
        const passwordError = document.getElementById('passwordError')
        if (password.value === '') {
            passwordError.innerText = "*Password is Required"
        }
        else {
            passwordError.innerText = ""

        }
    }

    function securityCodeValidate() {
        const securityCode = document.getElementById('securityCode')
        const securityCodeError = document.getElementById('securityCodeError')
        if (securityCode.value === '') {
            securityCodeError.innerText = "*Required"
        }
        else {
            securityCodeError.innerText = ""

        }
    }

    async function registerClick() {
        const name = document.getElementById('name')
        const nameError = document.getElementById('nameError')
        const email = document.getElementById('email')
        const emailError = document.getElementById('emailError')
        const password = document.getElementById('password')
        const passwordError = document.getElementById('passwordError')
   
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/
        if (name.value === '') {
            nameError.innerText = "*Required"
        }
        else {
            if (!isNaN(name.value)) {
                nameError.innerText = "*Invalid"
            }
            else {
                nameError.innerText = ""
            }
        }
        if (email.value === '') {
            emailError.innerText = "*Required"
        }
        else {
            if (email.value.match(emailPattern)) {
                emailError.innerText = ""
            }
            else {
                emailError.innerText = "*Invalid"
            }
        }
        if (password.value === '') {
            passwordError.innerText = "*Required"
        }
        else {
            if (password.value.length < 6) {
                passwordError.innerText = "*Password should be greater than 5 characters"
            }
            else {
                passwordError.innerText = ""
            }
        }
 
        if (nameError.innerText === "" && emailError.innerText === "" && passwordError.innerText === "" ) {
            var userId = 1;
            if (allUsers.length) {
                userId = allUsers[0].userId + 1
            }
            let userSignupDetails = {
                name: name.value,
                email: email.value,
                password: password.value,
            
            }
            try {
                const response = await axios.post('https://gmail-clone-backend-4s35.onrender.com/api/users/register', userSignupDetails);
                
                if (response.data.message === "User already exists") {
                    alert("Email address already exists");
                    // Handle email already exists error
                } else {
                    alert("User registered successfully");
                    navigate('/login')
                    // Handle successful registration
                }
            } catch (error) {
                if (error.response && error.response.data) {
                    alert(error.response.data);
                } else {
                    console.error("Error registering user:", error);
                    alert("An error occurred while registering the user");
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
                const response = await axios.post('https://gmail-clone-backend-4s35.onrender.com/api/users/login', userLoginDetails);
    
                if (response.data.message === "Login Successful") {
                    alert("Login Successful");
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
        <div className='backgroundSignupImage'>
            <div className="mainSignupDiv shadow rounded">
                <div className='text-center'>
                    <h3 className='text-primary'>Sign Up</h3>
                </div>
                <div>
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" placeholder='Name' aria-describedby="emailHelp" autoComplete='off' onKeyUp={() => nameValidate()} />
                    <span id='nameError' className='text-danger'></span>
                </div>
                <div className='mt-3'>
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="text" className="form-control" id="email" placeholder='Email' aria-describedby="emailHelp" autoComplete='off' onKeyUp={() => emailValidate()} />
                    <span id='emailError' className='text-danger'></span>
                </div>
                <div className='mt-3'>
                    <label htmlFor="password" className="form-label">Password</label>
                    <input  type="password" className="form-control" id="password" placeholder='Password' aria-describedby="emailHelp" autoComplete='off' onKeyUp={() => passwordValidate()} />
                    <span id='passwordError' className='text-danger'></span>
                </div>
                {/* <div className='mt-3'>
                    <label htmlFor="securityCode" className="form-label">Account security code</label>
                    <input type="password" className="form-control" id="securityCode" aria-describedby="emailHelp" autoComplete='off' onKeyUp={() => securityCodeValidate()} />
                    <span id='securityCodeError' className='text-danger'></span>
                </div> */}
                <div className='mt-3'>
                    <input className="form-check-input" type="checkbox" id="flexCheckDefault" onClick={() => showPasswordClick()} /> Show password 
                </div>
                <div className='text-center mt-3'>
                    <span className="text-danger" id='signupError'></span><br />
                    <Button variant='contained' className="btn btn-outline-primary mt-3" onClick={() => { registerClick() }}>Register</Button>
                    <div className="" style={{ width: 'fit-content', marginLeft: '65px', marginTop: '10px' }}>
                    {/* <GoogleOAuthProvider clientId="3ouew">...</GoogleOAuthProvider> */}
                    </div>
                    <h6 className='mt-3 hoverText text-primary' onClick={() => { navigate('/login') }}>back to login</h6>
                </div>
            </div>
            {
                open ? <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message="Registration successful" action={action} /> : ''
            }
        </div>
    )
}

export default Signup