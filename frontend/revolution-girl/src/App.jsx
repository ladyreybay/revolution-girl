import Home from "./pages/Home";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Posts from "./pages/Posts";
import Account from "./pages/Account";
import ContactUs from "./pages/ContactUs";
import Friends from "./pages/Friends"
import Navbar from "./components/Navbar";
import Post from "./components/Post";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import "/public/main.css";
import { useEffect, useState } from "react";

function App(){
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handlePostsRefresh(){
    loadPosts();
  }

  function loadPosts(){
    setErrorMessage("");
    setLoading(true);
    try{
      fetch("http://localhost:8080/api/posts")
        .then((res)=>{
          if(!res.ok){
            throw new Error("Unable to load posts");
          }
          return res.json();
        })
        .then((data)=>{
          setPosts(data);
        })
        .finally(()=>setLoading(false));
    }catch(err){
      setErrorMessage(err.message);
      setLoading(false);
    }
  }

  function loadUsers(){
    setErrorMessage("");
    setLoading(true);
    try{
      fetch("http://localhost:8080/api/posts")
        .then((res)=>{
          if(!res.ok){
            throw new Error("Unable to load user data");
          }
          return res.json();
        })
        .then((data)=>{
          setUsers(data);
        })
        .finally(()=>setLoading(false));
    }catch(err){
      setErrorMessage(err.message);
      setLoading(false);
    }
  }

  useEffect(()=>{
    loadUsers();
  }, []);

  return(
    <BrowserRouter>
      <Navbar/>
      <main>
        <Routes>
          <Route path="/" element={<Home loading={loading} setLoading={setLoading} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />}/>
          <Route path="/signup" element={<Signup/>}/>
          {/*<Route path="/posts" element={<Posts/>}/>*/}
          <Route path="/:username/posts" element={<Posts posts={posts} setPosts={setPosts}/>}/>
          <Route path="/:username/posts/:postId" element={<Post posts={posts}/>}/>
          <Route path="/:username/profile" element={<Account/>}/>
          <Route path="/:username/profile/:userId" element={<Account/>}/>
          <Route path="/:username/friends" element={<Friends/>}/>
          <Route path="/contact" element={<ContactUs/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;