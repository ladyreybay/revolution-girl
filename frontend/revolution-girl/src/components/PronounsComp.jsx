function PronounsComp({pronouns, setPronouns}){
    return(
        <>
            <label htmlFor="userPronouns" className="text-2xl font-cover mt-3">Pronouns</label>
            <br/>
            <select name="userPronouns" id="userPronouns" multiple required
                className="border-2 border-black text-center w-3xs font-quan"
                value={pronouns} onChange={(e)=>{const sel=Array.from(e.target.selectedOptions, option=>option.value);setPronouns(sel)}}
            >
                <option value="she/her" className="hover:cursor-pointer hover:bg-fuchsia-200 p-2">she/her</option>
                <option value="he/him" className="hover:cursor-pointer hover:bg-fuchsia-200 p-2">he/him</option>
                <option value="it/its" className="hover:cursor-pointer hover:bg-fuchsia-200 p-2">it/its</option>
                <option value="they/them" className="hover:cursor-pointer hover:bg-fuchsia-200 p-2">they/them</option>
            </select>
        </>
    );
}

export default PronounsComp;