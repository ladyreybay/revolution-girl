function PasswordComp(){
    return(
        <div>
            <label htmlFor="userPass">Password</label><span>*</span>
            <br/>
            <input type="password" name="userPass" id="userPass" placeholder="Enter account's password" required/>
        </div>
    );
}

export default PasswordComp;