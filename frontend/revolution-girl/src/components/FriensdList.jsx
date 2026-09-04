import "/public/friends.css";

function FriendsList({username}){
    console.log(`This is ${username}'s friend(s)`);
    //basic showing of friends list
    return(
        <div>
            <div id="friend1">
                <img src="" alt="friend1Image"/>
                <p><span>friend1</span> <span><i>(she/her)</i></span></p>
                <button>Remove</button>
            </div>
        </div>
    );
}

export default FriendsList;