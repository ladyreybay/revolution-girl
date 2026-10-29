import { useParams } from "react-router-dom";
import Profile from "../components/Profile";

function Account({posts, setPosts}){
    /*let userId = useParams();
    if(userId==null||userId==undefined||userId==""){
        userId = JSON.parse(sessionStorage.getItem("user"))._id;
    }*/
    return(
        <Profile posts={posts} setPosts={setPosts}/>
    );
}

export default Account;