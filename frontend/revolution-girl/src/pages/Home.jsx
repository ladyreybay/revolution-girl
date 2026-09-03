import { Link } from "react-router-dom";
import { useState } from "react";
import PasswordComp from "../components/PasswordComp";
import UsernameComp from "../components/UsernameComp";

function Home(){
    return(
        <div>
            <h1 id="homeTitle">Revolution Girl!!!</h1>
            <h2 id="homeSub">Punk ain&apos;t dead, it is community</h2>
            <form id="homeLogin">
                <UsernameComp/>
                <br/>
                <PasswordComp/>
                <br/>
                <div>
                    <button id="login">Login</button>
                    <Link to="/signup">
                        <button id="signup">Signup</button>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Home;