import PostComments from "./PostComments";
import PostEdit from "./PostEdit";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Post(){
    const user = JSON.parse(sessionStorage.getItem("user"));
    const [postEditShow, setPostEditShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState({hashtags:["dsa","adsa"], comments:[{}]});
    const [comment, setComment] = useState("");
    const {postId} = useParams();
    const [errorMessage, setErrorMessage] = useState("");

    function toggleEdit(){
        setPostEditShow(!postEditShow);
    }

    async function getPost(){
        try{
            setLoading(true);
            const res = await fetch("http://localhost:8080/api/getPost", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    postId
                })
            });
            if(!res.ok){
                throw new Error("Provided postId does not exist, please return to a safe page or find a valid post");
            }
            const dat = await res.json();
            setPost(dat);
            setLoading(false);
        }catch(err){
            setLoading(false);
            setErrorMessage(err.message);
        }
    }

    useEffect(()=>{
        getPost();
    }, []);

    function checkEditPermish(){
        if(user.admin==true||post.posterId==user._id){
            return true;
        }else{
            return false;
        }
    }

    return(
        <div>
            <section className="grid-rows-2 grid-cols-2">
                <div>
                    <p><Link to={`/profile/${post.posterId}`}>{post.poster}</Link>&apos;s post</p>
                    <p>Posted: {post.date}</p>
                    {checkEditPermish()&&<button onClick={toggleEdit}>Edit Post</button>}{postEditShow&&<PostEdit toggleEdit={toggleEdit}/>}
                </div>
                <div>
                    <img src={post.image?`${post.image}`:"/postPlace.png"} id={postId} className=""/>
                    <p>{post.caption}</p>
                    <p>Likes: {post.likes}</p>
                    <ul>{post.hashtags.map((tag, index)=>{
                        return <li key={index}>{tag}</li>
                    })}</ul>
                </div>
            </section>
            <PostComments comments={post.comments}/>
        </div>
    );
}

export default Post;