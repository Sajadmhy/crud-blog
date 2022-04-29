import React from 'react';
import { useState, useEffect } from 'react';
import { AiOutlineUser,AiFillLock } from "react-icons/ai";
import { Link,useHistory } from "react-router-dom";
import axios from 'axios';

const SignUpPage = () => {
    const [firstName,setFirstName]=useState('');
    const [lastName,setLastName]=useState('');
    const [userName,setUserName]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const [inputType,setInputType]=useState("text");
    const history = useHistory();
    useEffect(()=>{
        const userInfo = localStorage.getItem("userInfo");
        
        if(userInfo){
            history.push("/home");
        }    
    },[history]);
    const handleClick=()=>{
        inputType==='text' && setInputType("password")
    }
    const handleRegister=(e)=>{
        e.preventDefault();
        if(password !== confirmPassword){
            return alert("The password does not match with the confirm field");
        }
        if(userName.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )){
            //if username matches email regex...
            return alert("Email themed usernames not allowed");
        }
        if(userName.length>30||password.length>30){
            //prevent idlers from putting longgg strings in the DB trying to crash it...
            return alert("Username and/or password too long!");
        }
        try{
            axios.post('https://nameless-ocean-20366.herokuapp.com/test/register',{ "firstname":firstName,"lastname":lastName,"user":userName,"pwd":password })
            .then((response)=>{
                //checking if status is ok
                localStorage.setItem('userInfo',JSON.stringify(response.data));
                history.push("/home")
            })
            .catch((error)=>{
                //catch failed status codes...
                alert("Registration unsuccessful! Enter all fields and try another username")
            })
        } catch(error){
        }
    }
    return (
        <div className='login-signup-mainframe'>
            <div className='sign-up-container'>
                {/*TITLE BAR*/}
                <div className='title-frame'>
                    <h1 id='signup-title'>{"<Sajad/>"}</h1>
                </div>
                
                {/*FIRST NAME*/}
                <form onSubmit={handleRegister}>
                    <div id='firstname-signup'>
                        <div id='firstname-signup-placeholder'>
                            <AiOutlineUser id='firstname-icon' size={20} opacity={0.3}/>
                            <input id='firstname-text-signup' placeholder="First Name" onChange={(e)=>setFirstName(e.target.value)}/>
                        </div>
                    </div>
                    
                    {/*LAST NAME*/}
                    <div id='lastname-signup'>
                        <div id='lastname-signup-placeholder'>
                            <AiOutlineUser id='lastname-icon' size={20} opacity={0.3}/>
                            <input id='lastname-text-signup' type="text" placeholder="Last Name" onChange={(e)=>setLastName(e.target.value)}/>
                        </div>
                    </div>

                    {/*USERNAME*/}
                    <div id='username-signup'>
                        <div id='username-signup-placeholder'>
                            <AiOutlineUser id='username-icon' size={20} opacity={0.3}/>
                            <input id='username-text-signup' type="text" placeholder="Username" onChange={(e)=>setUserName(e.target.value)}/>
                        </div>
                    </div>

                    {/*PASSWORD*/}
                    <div id='password-signup'>
                        <div id='password-signup-placeholder'>
                            <AiFillLock id='password-icon' size={20} opacity={0.3}/>
                            <input id='password-text-signup' type={inputType} placeholder="Password" onClick={handleClick} onChange={(e)=>setPassword(e.target.value)}/>
                        </div>
                    </div>

                    {/*CONFIRM PASSWORD*/}
                    <div id='confirm-password-signup'>
                        <div id='confirm-password-signup-placeholder'>
                            <AiFillLock id='password-icon' size={20} opacity={0.3}/>
                            <input id='confirm-password-text-signup' type={inputType} placeholder="Confirm Password" onClick={handleClick} onChange={(e)=>setConfirmPassword(e.target.value)}/>
                        </div>
                    </div>

                    {/*CREATE AN ACCOUNT BUTTON*/}
                    <button className='sign-up-button' type='submit' >
                        <p className='sign-up-button-text'>Create an account</p>
                    </button>

                </form>

                <Link to="/" style={{ textDecoration:'none' }}><p id='login-prompt-text'>Already have one? <span id='bold'>Login</span></p></Link>
            </div>
        </div>
    )
}

export default SignUpPage