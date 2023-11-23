import axios from "axios";
import React, {useState} from "react";

function CommentForm(props){
    const [content, setContent] = useState("");
    const {postID} =props;

    const handleSubmit = () =>{
        const item = {content:content, author:1, post:postID};
        axios
            .post("http://127.0.0.1:8000/memo_places_forum/comments/", item)
            .catch((error) =>{
                console.log("Error with:",error)
            });
        console.log(`${content} ${postID}`);
    }

    return(
        <>
            <div>
                <label for="comment-content">Comment-Content</label><br/>
                <input 
                    type="text" 
                    id="comment-content"
                    name="comment-content"
                    placeholder="Comment Conntent"
                    onChange={(e)=>setContent(e.target.value)}/><br/>
                <input
                    type="submit"
                    onClick={handleSubmit}
                    value="Save"
                />
            </div>
        </>
    );

}

export default CommentForm;