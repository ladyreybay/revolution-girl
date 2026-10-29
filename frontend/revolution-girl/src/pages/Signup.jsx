import UsernameComp from "../components/UsernameComp";
import PasswordComp from "../components/PasswordComp";
import PronounsComp from "../components/PronounsComp";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Signup({setLogged}){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPas, setConfirmPas] = useState("");
    const [email, setEmail] = useState("");
    const [pronouns, setPronouns] = useState(["they/them"]);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        if(username.trim()==""||password.trim()==""||confirmPas.trim()==""||email.trim()==""){
            return;
        }
        try{
            const res = await fetch("http://localhost:8080/api/user",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    username,
                    password,
                    confirmPas,
                    pronouns
                })
            })
            if(!res.ok){
                throw new Error("One or more things are wrong. Please try again");
            }
            const dat = await res.json();
            sessionStorage.setItem("user", JSON.stringify(dat));
            setLogged(true);
            navigate("/posts", {replace: true});
        }catch(err){
            setErrorMessage(err.errorMessage)
        }
    }

    useEffect(()=>{
        if(sessionStorage.getItem("user")){
            sessionStorage.removeItem("user");
        }
    })

    return(
        <div className="flex flex-col items-center">
            <h1 id="homeTitle" className="text-9xl font-lac mt-10 mb-20">Revolution Girl!</h1>
            <h1 className="text-4xl mb-50 font-cover">Signup</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <div className="flex flex-col items-center">
                        <label htmlFor="newUserEmail" className="text-2xl font-cover tracking-wider">Email</label>
                        <br/>
                        <input type="email" name="newUserEmail" id="newUserEmail" value={email} onChange={(e)=>setEmail(e.target.value)} required
                            className="border-2 border-black rounded-sm p-2 w-3xs tracking-wider"
                            placeholder="Enter email for account"
                        />
                    </div>
                    <PasswordComp changeId="signupPas" password={password} setPassword={setPassword}/>
                    <PasswordComp changeId="confirmPas" confirmPas={confirmPas} setPassword={setConfirmPas} changePlaceholder="Confirm account's password"/>
                </div>
                <div>
                    <UsernameComp changeId="signupUsername" username={username} setUsername={setUsername}/>
                    <div className="flex flex-col items-center">
                        <PronounsComp pronouns={pronouns} setPronouns={setPronouns}/>
                        <br/>
                        <small className="mt-2 max-w-3xs text-center">If your pronouns are not listed here, please feel free to add them on your profile!</small>
                    </div>
                </div>
                <div>
                    {errorMessage&&<span id="errorField">{errorMessage}</span>}
                </div>
                <div>
                    <button type="submit" className="border-black border-2 text-xl p-2 font-quan bg-lightBack-400 hover:bg-darkBack-500 hover:cursor-pointer mx-4 mb-8">Create Account</button>
                    <Link to="/">
                        <button className="border-black border-2 p-2 text-xl font-quan bg-lightBack-400 hover:bg-darkBack-500 hover:cursor-pointer">Login</button>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Signup;