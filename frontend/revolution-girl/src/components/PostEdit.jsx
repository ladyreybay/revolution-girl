function PostEdit({toggleEdit}){
    return(
        <div id="postEdit">
            <form>
                <label>Caption</label>
                <br/>
                <input type="text" required/>
                <br/>
                <label>Hashtags</label>
                <br/>
                <input type="text"/>
                <button onClick={toggleEdit}>Submit</button>
            </form>
        </div>
    );
}

export default PostEdit;