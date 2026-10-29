function UsernameComp({changeId, username, setUsername}){
    return(
        <div className="flex flex-col items-center">
            <label htmlFor={changeId} className="text-xl">Username</label>
            <br/>
            <input type="text"
                name="usernameEnter" 
                id={changeId}
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                required
                className="border-2 border-black rounded-sm p-2 w-3xs"
                placeholder="Enter account's username"
            />
        </div>
    );
}

export default UsernameComp;