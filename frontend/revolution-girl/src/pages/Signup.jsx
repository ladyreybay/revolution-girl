import UsernameComp from "../components/UsernameComp";
import PasswordComp from "../components/PasswordComp";
import PronounsComp from "../components/PronounsComp";
import { Link } from "react-router-dom";

function Signup(){
    return(
        <div>
            <h1>Signup</h1>
            <form action="/posts" method="post">
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
                        {
                            //<input type="text" name="userPronouns" placeholder="Enter your desired pronouns (i.e. it/its)" required/>
                        }
                    </div>
                    <div>
                        <label>Country</label>
                        <select>
                            <option>South Africa</option>
                            <option>Scotland</option>
                            <option>Wales</option>
                            <option>Norhtern Ireland</option>
                            <option>England</option>
                            <option>Ireland</option>
                        </select>
                    </div>
                </div>
                <button>Create Account</button>
            </form>
        </div>
    );
}

export default Signup;