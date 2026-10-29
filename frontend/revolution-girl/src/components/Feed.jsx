import PostPreview from "./PostPreview";

function Feed({posts, feedOpt}){
    const user = JSON.parse(sessionStorage.getItem("user"));
    if(posts.length===0){
        return(<div className="text-center col-span-2 mt-32 text-9xl font-cover"><p>No posts yet...</p></div>);
    }
    return(
        <>
            {posts.map((post)=>{
                if(feedOpt=="global"){
                    if(post.reportCount>2&&!user.admin){
                        return <div className="border-2 border-black text-center p-4 rounded-md h-44 place-content-center" key={post._id+Math.random(Math.random(1E9))}><p>This post has been hidden and is under review...</p></div>
                    }
                    return <PostPreview postPath={"/posts/"+post._id} imageSrc={post.image} caption={post.caption} poster={post.poster} key={post._id+Math.random(Math.random(1E9))}/>
                }else{
                    if(post.posterId==user._id||user.friends.some((friend)=>friend.friendName==post.poster)){
                        if(post.reportCount>2&&!user.admin){
                            return <div className="border-2 border-black text-center p-4 rounded-md h-44 place-content-center"><p>This post has been hidden and is under review...</p></div>
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