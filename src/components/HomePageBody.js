import React, { useState } from 'react';
import { AiOutlineUser } from "react-icons/ai";
import { FcSearch } from "react-icons/fc";
import { HiOutlineClock } from "react-icons/hi";
import { BsChatLeftDots } from "react-icons/bs";
import { Link } from 'react-router-dom';

const HomePageBody = ({ postsData,windowSize }) => {

    const [search,setSearch] = useState('');
    postsData = postsData.filter((post)=>post.title.includes(search) || post.body.includes(search));
    
    return (
        <div className='main-box'>
            <div id='search-box'>
                {/*ICON*/}
                {/*INPUT TAG*/}
                <FcSearch id='search-icon' size={20}/>
                <div style={{ marginLeft:'5px' }}>
                    <input id="search-text" type="text" placeholder="Search Posts" onChange={(e)=>setSearch(e.target.value)}  />
                </div>         
                        
            </div>   
            {/*Generate boxes*/}
            {windowSize >= 450 ?
            //LAPTOP DISPLAY
        
                (postsData.map((item)=>(
                    
                    <li key={item._id} style={{ listStyleType: "none" }}>
                        <div className='card-box'>
                            <div className='content-box'>
                                <Link to={`/home/${item._id}`} style={{ textDecoration:'none' }}><p className='card-title'>{item.title.length<=10 ? item.title : `${item.title.slice(0,8)}...`}</p></Link>
                                <p className='card-body-text'>{item.body.length<=15 ? item.body : `${item.body.slice(0,15)}...`}</p>
                            </div>
                            <div className='info-box'>
                                <div className='author-box'>
                                    {/* ICON */}
                                    
                                    <AiOutlineUser className='author-icon' size={11}/>
                                    
                                    <p className='author-text'>{item.username.length <= 7 ? item.username : `${item.username.slice(0,7)}...`}</p>
                                </div>
                                <div className='date-box'>
                                    {/* ICON */}
                                  
                                    <HiOutlineClock className='author-icon' size={11}/>
                                    <p className='date-text'>{new Date(item.date).toLocaleDateString("en-US")}</p>
                                </div>
                                <div className='comment-box'>
                                    {/* ICON */}
                                    <BsChatLeftDots className='author-icon' size={11}/>
                                    <p className='comment-text'>{item.comments.length}</p>
                                </div>

                            </div>
                        </div>
                            
                    </li>
                    

                )))
                    :
                    //TABLET/MOBILE DISPLAY
                    (postsData.map((item)=>(
                        <li key={item._id} style={{ listStyleType: "none" }}>
                            <div className='card-box-mobile'>
                                <div className='content-box-mobile'>
                                <Link to={`/home/${item._id}`} style={{ textDecoration:'none' }}><p className='card-title-mobile'>{item.title.length<=10 ? item.title : `${item.title.slice(0,8)}...`}</p></Link>
                                    <p className='card-body-text-mobile'>{item.body.length<=15 ? item.body : `${item.body.slice(0,15)}...`}</p>
                                </div>
                                <div className='info-box-mobile'>
                                    <div className='author-box-mobile'>
                                        {/* ICON */}
                                        
                                        <AiOutlineUser className='author-icon-mobile' size={11}/>
                                        
                                        <p className='author-text-mobile'>{item.username.length <= 7 ? item.username : `${item.username.slice(0,7)}...`}</p>
                                    </div>
                                    <div className='date-box-mobile'>
                                        {/* ICON */}
                                        <HiOutlineClock className='author-icon-mobile' size={11}/>
                                        <p className='date-text'>{new Date(item.date).toLocaleDateString("en-US")}</p>
                                    </div>
                                    <div className='comment-box-mobile'>
                                        {/* ICON */}
                                        <BsChatLeftDots className='author-icon-mobile' size={11}/>
                                        <p className='comment-text-mobile'>{item.comments.length}</p>
                                    </div>
        
                                </div>
                            </div>

                            
                        </li>

                        
    
                    )))
                }
        </div>
    )
}

export default HomePageBody