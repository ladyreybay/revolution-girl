function PasswordComp({changeId}){
    return(
        <div>
            <label htmlFor={changeId}>Password</label><span>*</span>
            <br/>
            <input type="password" name="userPass" id={changeId} placeholder="Enter account's password" required/>
        </div>
    );
}

export default PasswordComp;