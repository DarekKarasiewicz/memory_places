import axios from "axios";
import React, {Component, useState} from "react";

function PostForm(){
    const [title, setTitle] = useState(""); 
    const [content, setContent] = useState(""); 

    const handleSubmit =()=>{
        const item = {title:title, content:content, author_id:1,subforum:1}
        axios
            .post("http://127.0.0.1:8000/memo_places_forum/posts/", item)
            .catch((error)=>{
                console.log("Erorr with :",error)
        });
        console.log(`${title},${content}`);
    }

    return(
        <>
            <div>
                <label for="post-title">Title</label>
                <input
                    type="text"
                    id="post-title"
                    name="title"
                    placeholder="Post title"
                    onChange={(e)=>setTitle(e.target.value)}
                /><br/>

                <label for="post-content">Content</label>
                <input
                    type="text"
                    id="post=content"
                    name="content"
                    placeholder="Content"
                    onChange={(e)=>setContent(e.target.value)}
                /><br/>
                <input
                    type="submit"
                    onClick={handleSubmit}
                    value="Save"
                />
            </div>
        </>
        );
}

export default PostForm;