import { Link } from "react-router-dom";

function PostPreview({postId}){
    const postPath = "/posts/"+postId;
    return(
        <section>
            <Link to={postPath}>
                <img src="/postPlace.png"/>
            </Link>
        </section>
    );
}

export default PostPreview;