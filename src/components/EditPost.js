import React, { useState,useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

const EditPost = ({ posts }) => {
    const postId = useParams().id;
    const specificPost = posts.find((post)=>post._id===postId);
    //to protect the route
    const history=useHistory();
    useEffect(()=>{
        const userInfo = localStorage.getItem("userInfo");
        if(!userInfo){
            history.push("/");
        }    
    },[history]);
    const [newTitle,setNewTitle]=useState('');
    const [newBody,setNewBody]=useState('');

    const handleEdit = (e)=>{
        e.preventDefault();
        axios.put("https://nameless-ocean-20366.herokuapp.com/posts/update-post",{id:specificPost._id,title:newTitle,body:newBody})
            .then((response)=>{
                history.push('/home');
                window.location.reload(false);
            })
            .catch((error)=>{
                alert("Edit unsuccesful! Ensure to change both the title and body");
             
            })
    }

    return (
        <div className='main-box'>
            {specificPost && specificPost.title && specificPost.body? (
                <>
                    <form onSubmit={handleEdit}>
                        <p style={{ fontWeight:"500" }}>Edit Post</p>
                        <p className='create-text'>Title:</p>
                        <input id='title-input' type="text" defaultValue={specificPost.title} onChange={(e)=>setNewTitle(e.target.value)}/>
                        <p className='create-text'>Body:</p>
                        <input id='create-post-input' type="text" defaultValue={specificPost.body} onChange={(e)=>setNewBody(e.target.value)}/>
                        <button className='edit-post-button' type='submit'>Edit Post</button>
                    </form>
                </>
            
            ) : (
                <p>Post not available....</p>
            )}

        </div>
    )
}

export default EditPost