import SearchBar from "../components/Searchbar";
import Feed from "../components/Feed";
import { useState } from "react";
import { useEffect } from "react";

function Posts(){
    const [feedOpt, setFeedOpt] = useState("regular");
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        setLoading(true);
        fetch("http://localhost:8080/api/posts")
            .then(response=>{
                if(!response.ok){
                    throw("Critical! Could not load posts");
                }
                return response.json();
            })
            .then(data=>{setPosts(data)})
            .catch((error)=>{
                console.error("Error fetching posts: "+error);
                setLoading(false);
            })
            .finally(()=>{setLoading(false)});
    }, []);
    return(
        <div>
            <div>
                <SearchBar/>
            </div>
            <Feed posts={posts}/>
        </div>
    );
}

export default Posts;