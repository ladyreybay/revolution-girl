import PostPreview from "./PostPreview";
import { useParams } from "react-router-dom";

function Feed({posts, feedOpt}){
    const user = JSON.parse(sessionStorage.getItem("user"));
    if(posts.length===0){
        return(<p>No posts yet...</p>);
    }
    return(
        <>
            {posts.map((post)=>{
                if(feedOpt=="global"){
                    if(post.reportCount>2&&!user.admin){
                        return <div className="border-2 border-black text-center p-4 rounded-md"><p>This post has been hidden and is under review...</p></div>
                    }
                    return <PostPreview postPath={"/posts/"+post._id} imageSrc={post.image} caption={post.caption} poster={post.poster} key={post._id+Math.random(Math.random(1E9))}/>
                }else{
                    if(post.posterId==user._id||user.friends.some((friend)=>friend.friendName==post.poster)){
                        if(post.reportCount>2&&!user.admin){
                            return <div><p>This post has been hidden and is under review...</p></div>
                        }
                        return  <PostPreview postPath={"/posts/"+post._id} imageSrc={post.image} caption={post.caption} poster={post.poster} key={post._id+Math.random(Math.random(1E9))}/>
                    }else{
                        return null;
                    }
                }
            })}
        </>
    );
}

export default Feed;