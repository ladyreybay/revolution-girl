import SearchBar from "../components/Searchbar";
import Feed from "../components/Feed";
import { useState } from "react";
import { useEffect } from "react";

function Posts({posts, setPosts}){
    const [feedOpt, setFeedOpt] = useState("regular");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    async function loadPosts(){
        try{
            setLoading(true);
            const res = await fetch("http://localhost:8080/api/posts");
            if(!res.ok){
                throw new Error("Unable to load posts");
            }
            const dat = await res.json();
            setPosts(dat);
            setLoading(false);
        }catch(err){
            setErrorMessage(err.message);
            setLoading(false);
        }
    }

    function handleRefresh(){
        loadPosts();
    }

    useEffect(()=>{
        loadPosts();
    }, []);
    useEffect(()=>{
        console.log("Stuff\n",posts);
    },[posts]);
    
    return(
        <>
            <div>
                <SearchBar/>
            </div>
            <Feed posts={posts} feedOpt={feedOpt}/>
        </>
    );
}

export default Posts;