import PronounsComp from "./PronounsComp";
import UsernameComp from "./UsernameComp";

function ProfileEdit({toggleEdit}){
    return(
        <div>
            <form>
                <UsernameComp/>
                <br/>
                <PronounsComp/>
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