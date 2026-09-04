import PostPreview from "./PostPreview";
import PostAdd from "./PostAdd";
import ProfileEdit from "./ProfileEdit";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";

function Profile({name}){
    const {username} = useParams();
    const [addPostShow, setAddPostShow] = useState(false);
    const [editProfileShow, setEditProfileShow] = useState(false);
    const [numPeeps, setNumPeeps] = useState(1);
    function toggleAdd(){
        setAddPostShow(!addPostShow);
    }
    function toggleEdit(){
        setEditProfileShow(!editProfileShow);
    }
    return(
        <div id="profileTopInfo">
            <section>
                <button id="accountProfile" onClick={toggleEdit}>
                    <img src="/profilePlace.png" id="accountProfile"/>
                </button>
                <br/>
                <button onClick={toggleEdit}>Edit</button>{editProfileShow&&<ProfileEdit toggleEdit={toggleEdit}/>}
                <div id="usernamePro">
                    <span id="profileUsername">{name}</span> <span id="profilePronouns"><i>(it/its)</i></span>
                </div>
                <div id="friendsCount">
                    <Link to="/friends/meowers">{numPeeps} Friends</Link>
                </div>
            </section>
            <div>
                <section id="typeSections">
                    <span>Posts </span>
                    <span>Albums </span>
                    <span>Saved</span>
                </section>
                <section id="typeResultSection">
                    <PostPreview postId={username+"/1"}/>
                    <PostPreview postId={username+"/2"}/>
                    <button onClick={toggleAdd}>
                        <img src="/addPostPlace.png"/>
                    </button>{addPostShow&&<PostAdd/>}
                </section>
            </div>
        </div>
    );
}

export default Profile;