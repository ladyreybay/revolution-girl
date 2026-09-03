import { Link } from "react-router-dom";
import UsernameComp from "../components/UsernameComp";
import PasswordComp from "../components/PasswordComp";

function Signup(){
    return(
        <div>
            <h1>Signup</h1>
            <form>
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
                        <label htmlFor="userPronouns">Pronouns</label><span>*</span>
                        <br/>
                        <select name="userPronouns" id="userPronouns" required>
                            <option>she/her</option>
                            <option>he/him</option>
                            <option>it/its</option>
                            <option>they/them</option>
                        </select>
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