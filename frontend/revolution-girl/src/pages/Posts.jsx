import SearchBar from "../components/Searchbar";
import Feed from "../components/Feed";
import { useState } from "react";

function Posts(){
    const [feedOpt, setFeedOpt] = useState("regular");
    return(
        <div>
            <div>
                <SearchBar/>
            </div>
            <Feed/>
        </div>
    );
}

export default Posts;