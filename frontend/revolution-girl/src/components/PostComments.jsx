import ProfilePreview from "./ProfilePreview";
import { useEffect, useState } from "react";

function PostComments({comments}){
    const [postComments, setPostComments] = useState([]);

    async function handleSubmit(e){
        e.preventDefault();

    }

    useEffect(()=>{
        if(postComments.length!=0){
            setPostComments([]);
        }
        setPostComments([...comments]);
    }, []);

    let index = 0;
    return(
        <section>
            {comments.map((comment)=>{
                return <article key={index++}>
                    <ProfilePreview/>
                    <p>{comment.comment}</p>
                    <p>{comment.username}</p>
                </article>
            })}
            <br/>
            <form onSubmit={()=>handleSubmit}>
                <input type="text" placeholder="Share your piece"/>
                <button type="submit">Post</button>
            </form>
        </section>
    );
}

export default PostComments;