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
    const [errorMessage, setErrorMessage] = useState("");

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
                
            }
        }
        loadProfile();
    },[userId.userId]);

    function postSortDate(a, b){//function to sort posts according to most recent to oldest posts
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }

    useEffect(()=>{
    },[viewProfilePosts, viewProfile])

    return(
        <div id="profileTopInfo">
            <section>
                <button className="hover:border-indigo-300 hover:border-3" id="accountProfile" onClick={toggleEdit}>
                    <img src="/profilePlace.png" id="accountProfile"/>
                </button>
                <br/>
                {user._id==userId.userId&&<button className="border-black border-2 w-1/17 p-2 font-quan bg-lightBack-400 hover:bg-darkBack-500 hover:cursor-pointer" onClick={toggleEdit}>Edit</button>}{editProfileShow&&<ProfileEdit toggleEdit={toggleEdit}/>}
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
                <section className="mt-10 flex flex-row flex-wrap place-content-around">
                    {isFriend()&&viewProfilePosts.map((post, index)=>{return <Link key={post._id+Math.random(Math.random(1E9))} to={`/posts/${post._id}`}><img key={post._id+index} src={post.image?`${post.image}`:"/postPlace.png"} 
                        className="max-w-3xs"
                    /></Link>})}
                </section>  
            </div>
        </div>
    );
}

export default Profile;