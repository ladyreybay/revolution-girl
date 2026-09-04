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

function App(){
  return(
    <BrowserRouter>
      <Navbar/>
      <main>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/posts" element={<Posts/>}/>
          <Route path="/posts/:username" element={<Posts/>}/>
          <Route path="/posts/:username/:postId" element={<Post/>}/>
          <Route path="/contact" element={<ContactUs/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/profile/:username" element={<Account/>}/>
          <Route path="/friends/:username" element={<Friends/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;