import {Link, useLocation} from "react-router-dom";
import "/public/navbar.css";

function Navbar(){
    const loc = useLocation();
    const user = JSON.parse(sessionStorage.getItem("user"));
    if(user==null||user==undefined){//ensure that navbar can render without crash + for redirect of unreg user
        var userId = "";
    }else{
        userId = user._id;
    }
    if(loc.pathname=="/"||loc.pathname=="/signup"){
        return(null);
    }else{
        return(
            <nav className="p-2">
                <Link to="/posts">
                    Revolution Girl!
                </Link>
                <Link to="/posts" className="hover:underline">Home</Link>
                <Link to={`/friends/${userId}`} className="hover:underline">Friends</Link>
                <Link to={`/profile/${userId}`} className="hover:underline">
                    <img src="/profilePlace.png" id="profileImg"/>
                </Link>
            </nav>
        );
    }
}

export default Navbar;