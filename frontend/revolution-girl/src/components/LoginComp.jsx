function LoginComp(){
    return(
        <form id="homeLogin">
            <UsernameComp/>
            <br/>
            <PasswordComp/>
            <br/>
            <div>
                <button id="login">Login</button>
                <button id="signup">Signup</button>
            </div>
        </form>
    );
}

export default LoginComp;