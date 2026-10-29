import FriendsList from "../components/FriensdList";
import { useParams } from "react-router-dom";

function Friends(){
    return(
        <div>
            <FriendsList/>
        </div>
    );
}

export default Friends;