import PostPreview from "./PostPreview";
import { useParams } from "react-router-dom";

function Feed({posts, feedOpt}){
    const {username} = useParams();
    if(posts.length===0){
        return(<p>No posts yet...</p>);
    }
    return(
        <>
            {posts.map((post)=>{
                return <PostPreview postPath={"/"+username+"/posts/"+post._id} imageSrc={post.image} caption={post.caption} key={post._id}/>
            })}
        </>
    );
}

export default Feed;