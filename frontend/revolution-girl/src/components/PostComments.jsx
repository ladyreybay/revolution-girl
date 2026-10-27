import ProfilePreview from "./ProfilePreview";

function PostComments({comments}){
    return(
        <>
            {comments.map((comment)=>{
                return <article>
                    <ProfilePreview/>
                    <p>{comment.username}</p>
                    <p>{comment.comment}</p>
                </article>
            })}
        </>
    );
}

export default PostComments;