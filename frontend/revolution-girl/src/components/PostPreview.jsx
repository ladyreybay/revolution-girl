import { Link } from "react-router-dom";

function PostPreview({postPath, imageSrc, poster, caption}){
    if(imageSrc.trim()===""||!imageSrc){
        imageSrc = "/postPlace.png";
    }
    return(
        <section className="flex flex-col items-center text-center mb-5 font-quant">
            <span className="text-3xl mb-4 mt-5">{poster}</span>
            <figure>
                <Link to={postPath}>
                    <img src={imageSrc} alt={caption} className="h-auto max-w-6/12 mx-44"/>
                </Link>
                <figcaption className="tracking-wider text-xl">{caption}</figcaption>
            </figure>
        </section>
    );
}

export default PostPreview;