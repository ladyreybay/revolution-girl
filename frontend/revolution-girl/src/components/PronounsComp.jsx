function PronounsComp(){
    return(
        <>
            <label htmlFor="userPronouns">Pronouns</label>
            <br/>
            <select name="userPronouns" id="userPronouns" required>
                <option>she/her</option>
                <option>he/him</option>
                <option>it/its</option>
                <option>they/them</option>
            </select>
        </>
    );
}

export default PronounsComp;