import { Link } from "react-router-dom";

function FriendsCountList({user, userId}){
    function getNumFriends(){
        let friendsLen = user.friends.length;
        let count = 0;
        for(let i=0; i<friendsLen; i++){
            count++;
        }
        return count;
    }

    return(
        <>
            <Link className="hover:underline" to={`/friends/${userId.userId}`}>{getNumFriends()} Friends</Link>
        </>
    );
}

export default FriendsCountList;