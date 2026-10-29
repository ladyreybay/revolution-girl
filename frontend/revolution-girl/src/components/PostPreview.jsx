import { Link } from "react-router-dom";

function PostPreview({postPath, imageSrc, poster, caption}){
    if(imageSrc.trim()===""||!imageSrc){
        imageSrc = "/postPlace.png";
    }
    return(
        <section className="flex flex-col items-center text-center">
            <figure>
                <span>{poster}</span>
                <Link to={postPath}>
                    <img src={imageSrc} alt={caption} className="max-w-3xs"/>
                </Link>
                <figcaption>{caption}</figcaption>
            </figure>
        </section>
    );
}

export default PostPreview;