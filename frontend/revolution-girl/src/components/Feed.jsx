import PostPreview from "./PostPreview";
import { useParams } from "react-router-dom";

function Feed(){
    const {username} = useParams();
    return(
        <>
            <PostPreview postId={username+"/1"}/>
            <PostPreview postId={username+"/2"}/>
            <PostPreview postId={username+"/3"}/>
            <PostPreview postId={username+"/4"}/>
        </>
    );
}

export default Feed;