import Home from "./pages/Home";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Posts from "./pages/Posts";
import Account from "./pages/Account";
import ContactUs from "./pages/ContactUs";k
import Friends from "./pages/Friends"
import Navbar from "./components/Navbar";
import Post from "./components/Post";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import "/public/main.css";
import { useEffect } from "react";

function App(){
  function handlePostsRefresh(){

  }

  function loadPosts(){

  }

  function loadUsers(){

  }

  function loadAlbums(){
    
  }

  useEffect(()=>{

  }, []);

  return(
    <BrowserRouter>
      <Navbar/>
      <main>
        <Routes>
          <Route path="/" element={<Home/>}/>
          {/*<Route path="/posts" element={<Posts/>}/>*/}
          <Route path="/:username/posts" element={<Posts/>}/>
          <Route path="/:username/posts/:postId" element={<Post/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/:username/profile" element={<Account/>}/>
          <Route path="/:username/friends" element={<Friends/>}/>
          <Route path="/contact" element={<ContactUs/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;