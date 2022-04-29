import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react';
import axios from 'axios';

const CreatePostPage = () => {
    const history=useHistory();
    useEffect(()=>{
        const userInfo = localStorage.getItem("userInfo");
        if(!userInfo){
            history.push("/");
        }    
      },[history]);
    const [title,setTitle]=useState('');
    const [body,setBody]=useState('');
    const handleCreate = (e) =>{
        e.preventDefault();
        if(title.length>130 || body.length>300) return alert("Title and/or the body is too long!")
        axios.post("https://nameless-ocean-20366.herokuapp.com/posts/create",{title:title,body:body,author:JSON.parse(localStorage.getItem("userInfo")).firstName,username:JSON.parse(localStorage.getItem("userInfo")).username})
            .then((response)=>{
                history.push('/home')
                window.location.reload(false);
            })
            .catch((error)=>{
                alert("Error creating post!");
            })
    }
    
    return (
        <div className='main-box'>
            <form onSubmit={handleCreate}>
                <p className='create-text'>Title:</p>
                <input id='title-input' type="text" placeholder="Title" onChange={(e)=>setTitle(e.target.value)}/>
                <p className='create-text'>Body:</p>
                <input id='create-post-input' type="text" placeholder="Post Body" onChange={(e)=>setBody(e.target.value)}/>

                <button id='create-post-button' type='submit'>Create Post</button>

            </form>
            
        </div>
    )
}

export default CreatePostPage