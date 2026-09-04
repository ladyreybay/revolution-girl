import { useParams } from "react-router-dom";
import Profile from "../components/Profile";

function Account(){
    const {username} = useParams();
    return(
        <Profile name={username}/>
    );
}

export default Account;