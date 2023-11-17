import React, { Component } from "react";
import axios from "axios"

class ForumMain extends Component{
    constructor(props){
        super(props);
        this.state = {
            post:[],
            subforum:[],
            comment:[],
        };
    }

    componentDidMount(){
        this.refreshList();
    }

    refreshList = () =>{
        axios
          .get("http://127.0.0.1:8000/memo_places_forum/comments")
          .then((res) => this.setState({ comment: res.data }))
          .catch((err) => console.log(err));

        axios
          .get("http://127.0.0.1:8000/memo_places_forum/subforums")
          .then((res) => this.setState({ subforum: res.data }))
          .catch((err) => console.log(err));

        axios
          .get("http://127.0.0.1:8000/memo_places_forum/posts")
          .then((res) => this.setState({ post: res.data }))
          .catch((err) => console.log(err));
    };

    renderCommentList = () =>{
        return this.state.comment.map((item)=>(
                <li
                  key={item.id}
                  className="list-of-comments"
                >
                <span>
                    {item.content}
                </span>
                </li>
        ));
    }; 

    renderSumforumList = () =>{
        return this.state.subforum.map((item)=>(
                <li
                  key={item.id}
                  className="list-of-subforum"
                >
                <span 
                title={item.name}>
                    {item.description}
                </span>
                </li>
        ));
    }; 

    renderPostList = () =>{
        return this.state.comment.map((item)=>(
                <li
                  key={item.id}
                  className="list-of-posts"
                >
                <span
                  title={item.title}
                >
                    {item.content}
                </span>
                </li>
        ));
    }; 

render(){
    return (
        <main className="container">
            <div className="comment-list">
                <ul>
                    {this.renderCommentList()}
                </ul>
            </div>
            <div className="post-list">
                <ul>
                    {this.renderPostList()}
                </ul>
            </div>
            <div className="sumforum-list">
                <ul>
                    {this.renderSumforumList()}
                </ul>
            </div>

        </main>
    );
  }
}

export default ForumMain;