import SearchBar from "../components/Searchbar";
import Feed from "../components/Feed";
import { useState, useEffect, useMemo } from "react";
import Fuse from "fuse.js";

function Posts({posts, setPosts}){
    const user = JSON.parse(sessionStorage.getItem("user"));
    const [feedOpt, setFeedOpt] = useState("global");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [search, setSearch] = useState("");

    const fuse = useMemo(()=>new Fuse(posts, {//init fuse for fuzzy search
        keys: [
            "caption",
            "poster",
            "hashtags"
        ],
        threshold: 0.45,
        ignoreLocation: true,
        includeScore: true
    }), [posts]);

    const filtPosts = useMemo(()=>{//implement fuzzy search
        if(search.trim()==""){
            return posts;
        }
        return fuse.search(search.trim()).map(result=>result.item);
    }, [search, posts, fuse]);

    function postSortDate(a, b){//function to sort posts according to most recent to oldest posts
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }

    async function loadPosts(){
        try{
            setLoading(true);
            const res = await fetch("http://localhost:8080/api/posts");
            if(!res.ok){
                throw new Error("Unable to load posts");
            }
            const dat = await res.json();
            dat.sort(postSortDate);
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

    return(
        <div className="p-3">
            <SearchBar search={search} setSearch={setSearch} setFeedOpt={setFeedOpt}/>
            <div className="grid-cols-2 auto-rows-auto">
                <Feed posts={filtPosts} feedOpt={feedOpt}/>
            </div>
        </div>
    );
}

export default Posts;