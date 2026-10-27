import { Link } from "react-router-dom";
import PasswordComp from "../components/PasswordComp";
import UsernameComp from "../components/UsernameComp";
import { useEffect, useState } from "react";

function Home({loading, setLoading, errorMessage, setErrorMessage}){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e){
        e.preventDefault();
        if(username.trim()==""||password.trim()==""){
            setUsername("");
            setPassword("");
            return;
        }
        setLoading(true);
        try{
            const res = await fetch("http://localhost:8080/login/users", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });
            if(!res.ok){
                throw new Error("Incorrect username and/or password provided. Try again or create a new account");
            }
            setLoading(false);
            const dat = await res.json();
            sessionStorage.setItem("user", dat);
            window.history.pushState(null, "Redirected Page", `/${dat.username}/posts`);
            window.location.reload();
        }catch(error){
            setErrorMessage(error.message);
            setLoading(false);
        }
    }

    useEffect(()=>{
        if(sessionStorage.getItem("user")){
            sessionStorage.removeItem("user");
        }
    }, []);

    return(
        <div>
            <h1 id="homeTitle">Revolution Girl!</h1>
            <h2 id="homeSub">Punk ain&apos;t dead, it is community</h2>
            <form onSubmit={handleSubmit} id="homeLogin">
                <UsernameComp changeId="loginUsername" username={username} setUsername={setUsername} />
                <br/>
                <PasswordComp changeId="loginPassword" password={password} setPassword={setPassword} />
                <br/>
                <div>
                    {errorMessage&&<span id="errorField">{errorMessage}</span>}
                </div>
                <div>
                    <button type="submit" id="loginBut">Login</button>
                    <Link to="/signup">
                        <button id="signup">Signup</button>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Home;