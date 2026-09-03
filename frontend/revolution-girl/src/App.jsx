import Home from "./pages/Home";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Posts from "./pages/Posts";
import Account from "./pages/Account";
import ContactUs from "./pages/ContactUs";
import Navbar from "./components/Navbar";
import {BrowserRouter, Routes, Route, useLocation} from "react-router-dom";

function App(){
  return(
    <BrowserRouter>
      <Navbar/>
      <main>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/posts" element={<Posts/>}/>
          <Route path="/contact" element={<ContactUs/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/profile/:username" element={<Account/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;