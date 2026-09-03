import { useParams } from "react-router-dom";
import Profile from "../components/Profile";

function Account(){
    const {nameParam} = useParams();
    return(
        <Profile username={nameParam}/>
    );
}

export default Account;