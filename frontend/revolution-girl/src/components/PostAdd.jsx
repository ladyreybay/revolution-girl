import { useEffect, useRef, useState } from "react";

function PostAdd({toggleAdd, posts, setPosts}){
    const [tag, setTag] = useState("");
    const [tags, setTags] = useState([]);
    const [image, setImage] = useState(null);
    const [preUrl, setPreUrl] = useState(null);
    const [caption, setCaption] = useState("");
    const user = JSON.parse(sessionStorage.getItem("user"));

    useEffect(()=>{
        if(!image){
            setPreUrl(null);
            return;
        }
        const url = URL.createObjectURL(image);
        setPreUrl(url);
        return ()=>URL.revokeObjectURL(url);
    }, [image]);

    function handleTagAdd(e){
        e.preventDefault();
        if(tag.trim()==""){
            return;
        }
        if(!tag.startsWith("#")){//checks if # there else add it
            var manipTag = "#"+tag.trim();
        }else{
            manipTag = tag.trim();
        }   
        setTags([...tags, manipTag]);
        setTag("");
    }

    async function handleSubmit(e){
        e.preventDefault();
        try{
            const formDat = new FormData();
            formDat.append("poster", user.username);
            formDat.append("posterId", user._id);
            formDat.append("caption", caption);
            formDat.append("hashtags", JSON.stringify(tags));
            formDat.append("image", image);
            const res = await fetch("http://localhost:8080/api/posts", {
                method: "POST",
                body: formDat
            });
            if(!res.ok){
                throw new Error("One or more things are missing.");
            }
            const dat = await res.json();
            setPosts((prev)=>[dat, ...prev]);
        }catch(err){
            console.log(err.message);
        }
        setImage(null);
        setCaption("");
        setTags("");
        setTag("");
    }

    function handleTagRemove(e, indexRemove){
        e.preventDefault();
        setTags(tags.filter((oneTag, index)=>index!==indexRemove));
    }

    function handleFile(e){
        setImage(e.target.files[0]??null);
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="captionUpload">Caption</label>
                <br/>
                <input type="text" name="captionUpload" id="captionUpload" value={caption} onChange={(e)=>setCaption(e.target.value)} required/>
                <br/>
                <label htmlFor="imageUpload">Image</label>
                <br/>
                <input type="file" name="imageUpload" id="imageUpload" accept="image/*" onChange={handleFile} required/>
                <br/>
                <label htmlFor="tagsUpload">Hashtags</label>
                <section>
                    {tags.map((oneTag, index=0)=>{return <span key={index}>{oneTag}<button type="button" onClick={(e)=>handleTagRemove(e, index)}>X</button> </span>})}
                </section>
                <br/>
                <input type="text" name="tagsUpload" id="tagsUpload" value={tag} onChange={(e)=>setTag(e.target.value)}/>
                <button type="button" onClick={handleTagAdd}>Add tag</button>
                <br/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default PostAdd;