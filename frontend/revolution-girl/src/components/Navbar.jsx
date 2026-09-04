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
                <Link to="/posts/meowers">
                    <img src="/favicon.svg"/>
                </Link>
                <Link to={`/posts/meowers`}>Home</Link>
                <Link to={`/friends/meowers`}>Friends</Link>
                <Link to={`/profile/meowers`}>
                    <img src="/profilePlace.png" id="profileImg"/>
                </Link>
            </nav>
        );
    }
}

export default Navbar;