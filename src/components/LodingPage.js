import React, { useEffect, useState } from 'react';
import { AiOutlineUser,AiFillLock } from "react-icons/ai";
import { Link,useHistory } from "react-router-dom";
import axios from 'axios';

const LodingPage = () => {
    const [userName,setUserName]=useState('');
    const [password,setPassword]=useState('');
    const [inputType,setInputType]=useState("text");
    
    const history=useHistory();
    useEffect(()=>{
        const userInfo = localStorage.getItem("userInfo");
        
        if(userInfo){
            history.push("/home");
        }  
    },[history]);

    const handleLogin=async(e)=>{
        e.preventDefault();
        try{     
            axios.post('https://nameless-ocean-20366.herokuapp.com/test',{ "user":userName,"pwd":password })
            .then((response)=>{
                //checking if status is ok
                localStorage.setItem('userInfo',JSON.stringify(response.data));
                history.push("/home")
            })
            .catch((error)=>{
                //catch failed status codes....
                alert("Login unsuccessful!");
            })
        
        } catch(error){
        }
    }
    const handleClick=()=>{
        inputType==='text' && setInputType("password")
    }
    return (
        <div className='login-signup-mainframe'>
            <div className='sign-up-container'>
                {/*TITLE BAR*/}
                <div className='title-frame'>
                    <h1 id='signup-title'>{"<Sajad/>"}</h1>
                </div>
                <form onSubmit={handleLogin}>
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
                            <input id='password-text-signup' type={inputType} placeholder='Password' onClick={handleClick} onChange={(e)=>setPassword(e.target.value)}/>
                        </div>
                    </div>
                    {/*LOGIN BUTTON*/}
                    <button className='sign-up-button' type='submit'>
                        <p className='sign-up-button-text'>Login</p>
                    </button>

                </form>

               <Link to="/register" style={{ textDecoration:'none' }}><p id='login-prompt-text'>Don't have an account? <span id='bold'>Sign Up</span></p></Link>
                
            </div>
        </div>
    )
}

export default LodingPage