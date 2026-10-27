import PostComments from "./PostComments";
import PostEdit from "./PostEdit";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Post(){
    const [postEditShow, setPostEditShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState({hashtags:["dsa","adsa"], comments:[{}]});
    const {username, postId} = useParams();

    function toggleEdit(){
        setPostEditShow(!postEditShow);
    }

    async function getPost(){
        try{
            console.log("Gettin post");
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
                console.log("post error");
                throw new Error("Provided postId does not exist, please return to a safe page or find a valid post");
            }
            const dat = await res.json();
            console.log("Post\n",dat);
            setPost(dat);
            setLoading(false);
        }catch(err){
            setLoading(false);
        }
    }

    useEffect(()=>{
        getPost();
    }, []);

    useEffect(()=>{
        console.log("gotten post\n",post);
    }, [post]);

    return(
        <div>
            <section>
                <div>
                    <p>{post.poster}&apos;s post</p>
                    <p>Posted: {post.date}</p>
                    {post.poster==username&&<button onClick={toggleEdit}>Edit Post</button>}{postEditShow&&<PostEdit toggleEdit={toggleEdit}/>}
                </div>
                <div>
                    <img src="/postPlace.png" id={postId}/>
                    <p>{post.caption}</p>
                    <p>Likes: {post.likes}</p>
                    <ul>{post.hashtags.map((element, index)=>{
                        return <li key={index}>{element}</li>
                    })}</ul>
                </div>
            </section>
            <section>
                <PostComments comments={post.comments}/>
                <br/>
                <input type="text" placeholder="Share your piece"/>
                <button>Post</button>
            </section>
        </div>
    );
}

export default Post;