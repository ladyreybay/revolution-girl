import { useEffect, useRef, useState } from "react";

function PostAdd({toggleAdd, posts, setPosts}){
    const [tag, setTag] = useState("");
    const [tags, setTags] = useState([]);
    const [image, setImage] = useState(null);
    const [preUrl, setPreUrl] = useState(null);
    const [caption, setCaption] = useState("");
    const user = JSON.parse(sessionStorage.getItem("user"));
    const [errorMessage, setErrorMessage] = useState("");

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
            setErrorMessage(err.message)
        }
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
                <label className="font-cover text-3xl" htmlFor="captionUpload">Caption</label>
                <br/>
                <input className="border-black border-2 p-2 mb-4 font-quan w-3xs rounded-xs" type="text" name="captionUpload" 
                    id="captionUpload" value={caption} onChange={(e)=>setCaption(e.target.value)} required placeholder="Enter post caption"
                />
                <br/>
                <label className="font-cover text-3xl mb-4" htmlFor="imageUpload">Image</label>
                <br/>
                <input className="border-2 mt-2 border-black bg-lightBack-400 hover:cursor-pointer hover:bg-darkBack-500 p-3 font-quan mb-2" 
                    type="file" name="imageUpload" id="imageUpload" accept="image/*" onChange={handleFile} required
                />
                <br/>
                <label className="font-cover text-3xl mt-5 mb-2" htmlFor="tagsUpload">Hashtags</label>
                <section>
                    {tags.map((oneTag, index=0)=>{return <span key={index}>{oneTag}<button 
                        className="hover:cursor-pointer mt-3 border-black border-2 p-2 mb-3 mx-2 bg-lightBack-400 hover:bg-red-500" 
                        type="button" onClick={(e)=>handleTagRemove(e, index)}>X</button> </span>
                    })}
                </section>
                <br/>
                <input className="border-black border-2 p-2 mb-1 font-quan w-3xs rounded-xs" type="text" name="tagsUpload" 
                    id="tagsUpload" value={tag} onChange={(e)=>setTag(e.target.value)} placeholder="Enter tag for post"
                />
                <button className="border-2 mb-5 border-black p-2 hover:cursor-pointer bg-lightBack-400 hover:bg-darkBack-500" 
                    type="button" onClick={handleTagAdd}>Add tag</button>
                <br/>
                <button className="border-black border-2 p-2 font-quan bg-lightBack-400 hover:bg-darkBack-500 hover:cursor-pointer mb-10"
                    type="submit">Submit</button>
            </form>
        </div>
    )
}

export default PostAdd;