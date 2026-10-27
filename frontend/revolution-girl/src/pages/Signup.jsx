import UsernameComp from "../components/UsernameComp";
import PasswordComp from "../components/PasswordComp";
import PronounsComp from "../components/PronounsComp";
import { Link } from "react-router-dom";
import { useState } from "react";

function Signup(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    async function handleSubmit(e){
        e.preventDefault();
    }

    return(
        <div>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                        <label htmlFor="newUserEmail">Email</label><span>*</span>
                        <br/>
                        <input type="email" name="newUserEmail" id="newUserEmail" required/>
                    </div>
                    <PasswordComp/>
                </div>
                <div>
                    <UsernameComp/>
                    <div>
                        <PronounsComp/>
                        <br/>
                        <small>If your pronouns are not listed here, please <Link to="/contact">contact us</Link>!</small>
                    </div>
                </div>
                <button type="submit">Create Account</button>
            </form>
        </div>
    );
}

export default Signup;