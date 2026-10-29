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
                {/*<PronounsComp/>
                <br/>*/}
                <label>Pronouns</label>
                <br/>
                <input type="text" value={pronoun} name="customPronouns" onChange={((e)=>setPronoun(e.target.value))}/>
                <section>{pronouns.map((onePronoun, index=0)=>{return <span key={index}>{onePronoun}<button type="button" onClick={(e)=>handlePronounRemove(e, index)}>X</button> </span>})}</section>
                <button type="button" onClick={handlePronounAdd}>Add Pronouns</button>
                <br/>
                <label>Bio</label>
                <br/>
                <input type="text"/>
                <button onClick={toggleEdit}>Submit</button>
            </form>
        </div>
    );
}

export default ProfileEdit;