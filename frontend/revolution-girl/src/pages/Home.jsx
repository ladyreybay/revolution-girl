import { Link } from "react-router-dom";
import PasswordComp from "../components/PasswordComp";
import UsernameComp from "../components/UsernameComp";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home({setLogged, loading, setLoading, errorMessage, setErrorMessage}){
    const [username, setUsername] = useState("meowers");
    const [password, setPassword] = useState("trustmebro");
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        try{
            if(username.trim()==""||password.trim()==""){
                setUsername("");
                setPassword("");
                throw new Error("Please enter a username and password. Or signup for free!");
            }
            setLoading(true);
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
            sessionStorage.setItem("user", JSON.stringify(dat));//log person's login to session for more "private" use
            setLogged(true);
            navigate("/posts", {replace: true});
        }catch(error){
            setLoading(false);
            setErrorMessage(error.message);
        }
    }

    return(
        <div className="flex flex-col items-center bg-darkBack-500">
            <h1 id="homeTitle" className="text-9xl font-lac mt-10 mb-20">REVOLUTION GIRL!</h1>
            <h2 id="homeSub" className="text-4xl mb-50 font-cover">Punk ain&apos;t dead, it is community</h2>
            <form onSubmit={handleSubmit} id="homeLogin" className="">
                <UsernameComp changeId="loginUsername" username={username} setUsername={setUsername} />
                <br/>
                <PasswordComp changeId="loginPassword" password={password} setPassword={setPassword} />
                <br/>
                <div>
                    {errorMessage&&<span id="errorField">{errorMessage}</span>}
                </div>
                <div className="flex flex-row place-items-center mb-10 place-content-between">
                    <button type="submit" id="loginBut" className="border-black border-2 text-xl p-2 font-quan bg-lightBack-400 hover:bg-darkBack-500 hover:cursor-pointer">Login</button>
                    <Link to="/signup">
                        <button id="signup" className="border-black border-2 p-2 text-xl font-quan bg-lightBack-400 hover:bg-darkBack-500 hover:cursor-pointer">Signup</button>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Home;