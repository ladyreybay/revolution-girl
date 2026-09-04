import PostComments from "./PostComments";
import PostEdit from "./PostEdit";
import { useParams } from "react-router-dom";
import { useState } from "react";

function Post(){
    const [postEditShow, setPostEditShow] = useState(false);
    const {postId} = useParams();
    function toggleEdit(){
        setPostEditShow(!postEditShow);
    }
    return(
        <div>
            <section>
                <div>
                    <p>meowers&apos;s post</p>
                    <button onClick={toggleEdit}>Edit Post</button>{postEditShow&&<PostEdit toggleEdit={toggleEdit}/>}
                </div>
                <div>
                    <img src="/postPlace.png" id={postId}/>
                    <p>Wow I am soooooo green</p>
                </div>
            </section>
            <section>
                <PostComments/>
                <br/>
                <input type="text" placeholder="Share your piece"/>
                <button>Post</button>
            </section>
        </div>
    );
}

export default Post;