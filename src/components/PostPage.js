import React, { useEffect, useState } from 'react'
import { useHistory, useParams,Link } from 'react-router-dom';
import axios from 'axios';
import { FiSend } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";


const PostPage = ({ posts }) => {
    const postId = useParams().id;
    const specificPost = posts.find((post)=>post._id===postId);
    //to protect the route
    const history=useHistory();
    const [commentBody,setCommentBody]=useState('');
    useEffect(()=>{
        const userInfo = localStorage.getItem("userInfo");
        if(!userInfo){
            history.push("/");
        }    
    },[history]);

        
    const handleDelete = async (postId) =>{
        const payload = {id:postId};
        axios.delete("https://nameless-ocean-20366.herokuapp.com/posts/delete-post",{ data: payload })
            .then((response)=>{
                history.push('/home');
                window.location.reload(false);
            })
            .catch((error)=>{
                alert("Error deleting post!");
            })
    }

    const handleCreateComment= async (e,postId)=>{
        e.preventDefault();
        axios.put("https://nameless-ocean-20366.herokuapp.com/posts/add-comment",{id:postId,author:JSON.parse(localStorage.getItem("userInfo")).firstName,username:JSON.parse(localStorage.getItem("userInfo")).username,body:commentBody})
            .then((response)=>{
                window.location.reload(false);
            })
            .catch((error)=>{
                alert("Error adding comment");
            })
    }

    const handleDeleteComment = (postId,commentId) =>{
        axios.put("https://nameless-ocean-20366.herokuapp.com/posts/delete-comment",{postId:postId,commentId:commentId})
            .then((response)=>{
                window.location.reload(false);
            })
            .catch((error)=>{
                console.error(error);
            })
        
    }


    return (
        <div className='main-box'>
           
            {specificPost && specificPost.title && specificPost.body ?
                <>
                    <p className='create-text'>Title:</p>
                    <p id='title-input'>{specificPost.title}</p>
                    
                    <p className='create-text'>Body:</p>
                    <p id='create-post-input' >{specificPost.body}</p>

                    {specificPost.username === JSON.parse(localStorage.getItem("userInfo")).username &&
                        <div className='edit-delete-box'>
                            <button className='delete-post-button' onClick={()=>handleDelete(specificPost._id)}>Delete post</button>
                            <Link to={`/edit/${specificPost._id}`} style={{ textDecoration:'none' }}><button className='edit-post-button'>Edit</button></Link>
                        </div>
                    }
                    
                   
                    <form onSubmit={(e)=>handleCreateComment(e,specificPost._id)}>
                        <div className='add-comment-box'>
                            <input className='add-comment-text' type="text" placeholder="Add a comment..." onChange={(e)=>setCommentBody(e.target.value)}/>
                            <button type='submit' className='add-comment-button' style={{ border:"none" }}>{<FiSend/>}</button>
                        </div> 
                    </form>
                     
                    {specificPost.comments && (
                        specificPost.comments.map((comment)=>(
                            <li key={comment._id} style={{ listStyleType: "none" }}>
                                <div className='comment-container'>
                                    <div className='comments-box'>
                                        <p className='comment-author'>{comment.username}</p>
                                        <p className='comment-body'>{comment.body}</p>
                                        <p className='comment-date'>{new Date(comment.date).toLocaleDateString("en-US")}</p>
                                    </div> 
                                    {comment.username === JSON.parse(localStorage.getItem("userInfo")).username &&
                                        <BsTrash className='delete-comment-button' onClick={()=>handleDeleteComment(specificPost._id,comment._id)}/>
                                        }
                                </div>
                                
                            </li>
                        ))
                    ) 
                    }
                </>
                    

                : (
                    <p>Post not available....</p>
                )}

        </div>
    )
}

export default PostPage