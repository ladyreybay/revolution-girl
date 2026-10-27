import { Link } from "react-router-dom";

function PostPreview({postPath, imageSrc, caption}){
    if(imageSrc.trim()===""||!imageSrc){
        imageSrc = "/postPlace.png";
    }
    return(
        <section>
            <Link to={postPath}>
                <img src={imageSrc} alt={caption}/>
            </Link>
        </section>
    );
}

export default PostPreview;