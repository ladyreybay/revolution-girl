import {Link, useLocation} from "react-router-dom";

function Navbar(){
    const loc = useLocation();
    if(loc.pathname=="/"||loc.pathname=="/signup"){
        return(null);
    }else{
        return(
            <nav>
                <Link to="/posts">
                    <img src="/favicon.svg"/>
                </Link>
                <Link to="/posts">Posts</Link>
                <Link to="/profile/meowers">
                    <img src="/favicon.svg"/>
                </Link>
            </nav>
        );
    }
}

export default Navbar;