function UsernameComp({changeId, username, setUsername}){
    return(
        <div>
            <label htmlFor={changeId}>Username</label>
            <br/>
            <input type="text"
                name="usernameEnter" 
                id={changeId}
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                required
            />
        </div>
    );
}

export default UsernameComp;