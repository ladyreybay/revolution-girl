function PasswordComp({changeId, password, setPassword}){
    return(
        <div>
            <label htmlFor={changeId}>Password</label><span>*</span>
            <br/>
            <input type="password" 
                name="userPass" 
                id={changeId}
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Enter account's password" 
                required
            />
        </div>
    );
}

export default PasswordComp;