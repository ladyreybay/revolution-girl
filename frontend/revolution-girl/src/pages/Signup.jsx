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
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        if(username.trim()==""||password.trim()==""||confirmPas.trim()==""||email.trim()==""){
            console.log("Error occured", username, password, confirmPas, email);
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
                console.log("Error occured", username, password, confirmPas, email);
                throw new Error("One or more things are wrong. Please try again");
            }
            const dat = await res.json();
            sessionStorage.setItem("user", JSON.stringify(dat));
            setLogged(true);
            navigate("/posts", {replace: true});
        }catch(err){
            console.log(err.message);
        }
    }

    useEffect(()=>{
        if(sessionStorage.getItem("user")){
            sessionStorage.removeItem("user");
        }
    })

    return(
        <div className="flex flex-col items-center">
            <h1 id="homeTitle" className="text-9xl">Revolution Girl!</h1>
            <h1 className="text-7xl">Signup</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <div className="flex flex-col items-center">
                        <label htmlFor="newUserEmail" className="text-xl">Email</label>
                        <br/>
                        <input type="email" name="newUserEmail" id="newUserEmail" value={email} onChange={(e)=>setEmail(e.target.value)} required
                            className="border-2 border-black rounded-sm p-2 w-3xs"
                            placeholder="Enter email for account"
                        />
                    </div>
                    <PasswordComp changeId="signupPas" password={password} setPassword={setPassword}/>
                    <PasswordComp changeId="confirmPas" confirmPas={confirmPas} setPassword={setConfirmPas} changePlaceholder="Confirm account's password"/>
                </div>
                <div>
                    <UsernameComp changeId="signupUsername" username={username} setUsername={setUsername}/>
                    <div className="flex flex-col items-center">
                        <PronounsComp/>
                        <br/>
                        <small className="mt-2 max-w-3xs text-center">If your pronouns are not listed here, please feel free to add them on your profile!</small>
                    </div>
                </div>
                <div>
                    <button type="submit">Create Account</button>
                    <Link to="/">
                        <button>Login</button>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Signup;