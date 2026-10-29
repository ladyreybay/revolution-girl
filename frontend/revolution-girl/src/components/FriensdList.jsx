import "/public/friends.css";

function FriendsList(){
    return(
        <div>
            <div id="friend1">
                <img src="/postPlace.png" alt="friend1Image"/>
                <p><span>friend1</span> <span><i>(she/her)</i></span></p>
                <button>Remove</button>
            </div>
        </div>
    );
}

export default FriendsList;