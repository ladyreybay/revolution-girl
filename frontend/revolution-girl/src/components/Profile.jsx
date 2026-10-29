import PostPreview from "./PostPreview";
import PostAdd from "./PostAdd";
import ProfileEdit from "./ProfileEdit";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FriendsCountList from "./FriendsCountLink";

function Profile({posts, setPosts}){
    const userId = useParams();
    const user = JSON.parse(sessionStorage.getItem("user"));
    const [addPostShow, setAddPostShow] = useState(false);
    const [editProfileShow, setEditProfileShow] = useState(false);
    const [pronouns, setPronouns] = useState("");
    const [username, setUsernmae] = useState("");
    const [viewProfile, setViewProfile] = useState({});
    const [viewProfilePosts, setViewProfilePosts] = useState([]);

    function toggleAdd(){
        if(user._id==userId.userId){
            setAddPostShow(!addPostShow);
        }
    }
    function toggleEdit(){
        if(user._id==userId.userId){
            setEditProfileShow(!editProfileShow);
        }
    }

    function isFriend(){//checks if user is self or friend w/ user to view friends list
        if(userId.userId==user._id){
            return true;
        }
        let friendAr = user.friends;
        let friendsLen = friendAr.length;
        console.log("Friend\n",friendAr, friendsLen);
        for(let i=0; i<friendsLen; i++){
            if(user.friends[i].friendId==userId.userId){
                return true;
            }
        }
        return false;
    }

    useEffect(()=>{
        async function loadProfile(){
            try{
                const [accRes, postRes] = await Promise.all([
                    await fetch("http://localhost:8080/api/getAccount", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            userId: userId.userId
                        })
                    }),
                    await fetch("http://localhost:8080/api/getSpecPosts", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            userId: userId.userId
                        })
                    })
                ]);
                if(!accRes.ok||!postRes.ok){
                    throw new Error("Unable to load account. Please try again later");
                }
                const accDat = await accRes.json();
                const postDat = await postRes.json();
                postDat.sort(postSortDate);
                setViewProfile(accDat);
                setViewProfilePosts(postDat);
            }catch(err){
                console.log(err.message);
            }
        }
        loadProfile();
    },[userId.userId]);

    function postSortDate(a, b){//function to sort posts according to most recent to oldest posts
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }

    useEffect(()=>{
        console.log(viewProfilePosts);
        console.log(viewProfile);
    },[viewProfilePosts, viewProfile])

    return(
        <div id="profileTopInfo">
            <section>
                <button id="accountProfile" onClick={toggleEdit}>
                    <img src="/profilePlace.png" id="accountProfile"/>
                </button>
                <br/>
                {user._id==userId.userId&&<button onClick={toggleEdit}>Edit</button>}{editProfileShow&&<ProfileEdit toggleEdit={toggleEdit}/>}
                <div id="usernamePro">
                    <span id="profileUsername">{user.username}</span> <span id="profilePronouns">({user.pronouns.map((pronoun)=>{return <i>{pronoun} </i>})})</span>
                </div>
                <div id="friendsCount">
                    {isFriend()&&<FriendsCountList user={user} userId={userId}/>}
                </div>
                <div>
                    <span id="descrip">{viewProfile.description}</span>
                </div>
            </section>
            <div>
                <section id="typeSections">
                    <span>Posts </span>
                    <span>Albums </span>
                </section>
                <section id="typeResultSection">
                    {userId.userId==user._id&&<button onClick={toggleAdd}>
                        <img src="/addPostPlace.png"/>
                    </button>}{addPostShow&&<PostAdd posts={posts} setPosts={setPosts}/>}
                </section>
                <section>
                    {isFriend()&&viewProfilePosts.map((post, index)=>{return <Link to={`/posts/${post._id}`}><img key={post._id+index} src={post.image?`${post.image}`:"/postPlace.png"}/></Link>})}
                </section>
            </div>
        </div>
    );
}

export default Profile;