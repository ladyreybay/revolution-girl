import Home from "./pages/Home";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Posts from "./pages/Posts";
import Account from "./pages/Account";
import ContactUs from "./pages/ContactUs";
import Friends from "./pages/Friends"
import Navbar from "./components/Navbar";
import Post from "./components/Post";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import "/public/main.css";
import { useEffect, useState } from "react";

function App(){
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [logged, setLogged] = useState(false);
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
      <main className="min-h-full bg-darkBack-500 text-indigo-200">
        <Routes>
          <Route path="/" element={<Home setLogged={setLogged} loading={loading} setLoading={setLoading} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />}/>
          <Route path="/signup" element={<Signup setLogged={setLogged}/>}/>
          <Route path="/posts" element={logged?<Posts posts={posts} setPosts={setPosts}/>:<Navigate to="/" replace/>}/>
          <Route path="/posts/:postId" element={logged?<Post posts={posts}/>:<Navigate to="/" replace/>}/>
          <Route path="/profile/:userId" element={logged?<Account posts={posts} setPosts={setPosts}/>:<Navigate to="/" replace/>}/>
          <Route path="/friends/:userId" element={logged?<Friends/>:<Navigate to="/" replace/>}/>
          <Route path="/contact" element={<ContactUs/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;