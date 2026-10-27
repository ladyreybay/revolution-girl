import {Link, useLocation} from "react-router-dom";
//import stylesheet for navbar
import "/public/navbar.css";

function Navbar(){
    const loc = useLocation();
    if(loc.pathname=="/"||loc.pathname=="/signup"){
        return(null);
    }else{
        return(
            <nav>
                <Link to={`/:username/posts`}>
                    <img src="/favicon.svg"/>
                </Link>
                <Link to={`/:username/posts`}>Home</Link>
                <Link to={`/:username/friends`}>Friends</Link>
                <Link to={`/:username/profile`}>
                    <img src="/profilePlace.png" id="profileImg"/>
                </Link>
            </nav>
        );
    }
}

export default Navbar;