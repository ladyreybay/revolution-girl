import FriendsList from "../components/FriensdList";
import { useParams } from "react-router-dom";

function Friends(){
    const {username} = useParams();
    return(
        <div>
            <FriendsList name={username}/>
        </div>
    );
}

export default Friends;