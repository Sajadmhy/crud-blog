import React from 'react'
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import HomePageBody from './HomePageBody';



const HomePage = ({ postsData, windowSize }) => {
  //to protect the route
  const history=useHistory();
  useEffect(()=>{
    const userInfo = localStorage.getItem("userInfo");
    if(!userInfo){
        history.push("/");
    }    
  },[history]);

  return (
    <>
      <HomePageBody postsData={postsData} windowSize={windowSize}/>  
    </>
  )
}

export default HomePage