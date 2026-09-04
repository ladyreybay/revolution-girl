function PostAdd({toggleAdd}){
    return(
        <div>
            <form>
                <label>Caption</label>
                <br/>
                <input type="text" required/>
                <br/>
                <label>Image</label>
                <br/>
                <input type="file" required/>
                <br/>
                <label>Hashtags</label>
                <br/>
                <input type="text"/>
                <button onClick={toggleAdd}>Submit</button>
            </form>
        </div>
    )
}

export default PostAdd;