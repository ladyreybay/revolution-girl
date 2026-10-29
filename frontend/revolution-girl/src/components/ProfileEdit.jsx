import { useState } from "react";
import PronounsComp from "./PronounsComp";
import UsernameComp from "./UsernameComp";

function ProfileEdit({toggleEdit}){
    const userCont = JSON.parse(sessionStorage.getItem("user"));
    const [pronouns, setPronouns] = useState([]);
    const [pronoun, setPronoun] = useState("");

    function handlePronounAdd(e){
        e.preventDefault();
        if(pronoun.trim()==""){
            return;
        }
        setPronouns((prev)=>[...prev, pronoun]);
        setPronoun("");
    }

    function handlePronounRemove(e, removeIndex){
        e.preventDefault();
        setPronouns(pronouns.filter((onePronoun, index)=>index!==removeIndex));
    }

    return(
        <div>
            <form>
                <UsernameComp/>
                <br/>
                <label htmlFor="customPronouns" className="font-cover text-2xl w-xl">Pronouns</label>
                <br/>
                <input className="border-2 border-black p-2 mb-4 rounded-xs font-quan w-3xs" type="text" value={pronoun} 
                    id="customPronouns" name="customPronouns" onChange={((e)=>setPronoun(e.target.value))}
                    placeholder="Enter your custom pronouns"    
                />
                <section>
                    {pronouns.map((onePronoun, index=0)=>{return <span key={index}>{onePronoun}
                        <button className="hover:cursor-pointer border-black border-2 p-2 mb-3 mx-2 bg-lightBack-400 hover:bg-red-500" type="button" onClick={(e)=>handlePronounRemove(e, index)}>X</button> </span>})
                    }
                    </section>
                <button className="border-2 mb-5 border-black p-2 hover:cursor-pointer bg-lightBack-400 hover:bg-darkBack-500" type="button" onClick={handlePronounAdd}>Add Pronouns</button>
                <br/>
                <label className="font-cover text-2xl" htmlFor="bioInput">Bio</label>
                <br/>
                <input className="border-black border-2 p-2 font-quan" name="bioInput" 
                    id="bioInput" type="text" placeholder="Enter new bio"
                />
                <button className="border-black border-2 p-2 font-quan bg-lightBack-400 hover:bg-darkBack-500 hover:cursor-pointer" onClick={toggleEdit}>Submit</button>
            </form>
        </div>
    );
}

export default ProfileEdit;