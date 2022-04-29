import './components/css/SignUpPage.css';
import './components/css/HomePage.css';
import './components/css/CreatePostPage.css';
import './components/css/PostPage.css';
import LodingPage from './components/LodingPage';
import SignUpPage from './components/SignUpPage';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import CreatePostPage from './components/CreatePostPage';
import MyPostsPage from './components/MyPostsPage';
import Footer from './components/Footer';
import PostPage from './components/PostPage';
import { BrowserRouter, Route } from "react-router-dom";
import { useEffect,useState } from 'react';
import axios from 'axios';
import EditPost from './components/EditPost';
import useWindowSize from './components/useWindowSize';



function App() {

  const { width } = useWindowSize();

  const [postsData,setPostsData] = useState([]);

  const loadPostsData = async()=>{
    await axios.get('https://nameless-ocean-20366.herokuapp.com/posts')
      .then((response)=>{
        setPostsData(response.data);
      })
      .catch((error)=>{
        alert("Error fetching posts!");
      })
  }
  
  useEffect(()=>{
    loadPostsData();
  },[]);

  return (
    <BrowserRouter>
      <main>
        <Route path="/" render={()=><LodingPage/>} exact/>
        <Route path="/register" render={()=><SignUpPage/>} />
        <Navbar windowSize={width}/>
        <Route path = "/home" render={()=><HomePage postsData={postsData} windowSize={width}/>} exact/>
        <Route path = "/home/:id" exact render={()=><PostPage posts = {postsData}/>} />
        <Route path="/edit/:id" render={()=><EditPost posts={postsData}/>} />
        <Route path = "/create" render={()=><CreatePostPage/>} />
        <Route path = "/posts" render={()=><MyPostsPage postsData={postsData} windowSize={width}/>} />
        <Footer/>
      </main>
    </BrowserRouter>
      
  );
}

export default App;
