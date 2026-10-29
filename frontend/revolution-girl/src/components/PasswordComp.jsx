function PasswordComp({changeId, password, setPassword, changePlaceholder}){
    return(
        <div className="flex flex-col items-center">
            <label htmlFor={changeId} className="text-xl">Password</label>
            <br/>
            <input type="password" 
                name="userPass" 
                id={changeId}
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder={changePlaceholder?changePlaceholder:"Enter account's password"}
                required
                className="border-2 border-black rounded-sm p-2 w-3xs"
            />
        </div>
    );
}

export default PasswordComp;