import { Link } from "react-router-dom";
import PasswordComp from "../components/PasswordComp";
import UsernameComp from "../components/UsernameComp";

function Home(){
    return(
        <div>
            <h1 id="homeTitle">Revolution Girl!</h1>
            <h2 id="homeSub">Punk ain&apos;t dead, it is community</h2>
            <form id="homeLogin" action="/posts" method="get">
                <UsernameComp changeId="loginUsername"/>
                <br/>
                <PasswordComp changeId="loginPassword"/>
                <br/>
                <div>
                    <span id="errorField"></span>
                </div>
                <div>
                    <button id="loginBut">Login</button>
                    <Link to="/signup">
                        <button id="signup">Signup</button>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Home;