function UsernameComp({changeId}){
    return(
        <div>
            <label htmlFor={changeId}>Username</label>
            <br/>
            <input type="text" name="usernameEnter" id={changeId} required/>
        </div>
    );
}

export default UsernameComp;