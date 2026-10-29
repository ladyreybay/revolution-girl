function PronounsComp(){
    return(
        <>
            <label htmlFor="userPronouns">Pronouns</label>
            <br/>
            <select name="userPronouns" id="userPronouns" multiple required
                className="border-2 border-black text-center w-3xs"
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