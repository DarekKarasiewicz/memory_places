import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PostForm from './PostForm';
import CommentForm from './CommentForm';

class ForumMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
      subforum: [],
      comment: [],
      searchQuery: '',
      filteredSubforums: [],
    };

    // Initialize a variable to store the timeout ID
    this.timeoutId = null;
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get('http://127.0.0.1:8000/memo_places_forum/comments')
      .then((res) => this.setState({ comment: res.data }))
      .catch((err) => console.log(err));

    axios
      .get('http://127.0.0.1:8000/memo_places_forum/subforums')
      .then((res) => this.setState({ subforum: res.data }))
      .catch((err) => console.log(err));

    axios
      .get('http://127.0.0.1:8000/memo_places_forum/posts')
      .then((res) => this.setState({ post: res.data }))
      .catch((err) => console.log(err));
  };

  handleSearch = (event) => {
    const searchQuery = event.target.value;
    this.setState({ searchQuery }, () => {
      // Clear the previous timeout
      clearTimeout(this.timeoutId);
      // Set a new timeout
      this.timeoutId = setTimeout(this.filterSubforums, 300);
    });
  };

  filterSubforums = () => {
    const { subforum, searchQuery } = this.state;
    const filteredSubforums = subforum.filter((item) =>
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    this.setState({ filteredSubforums });
  };

  renderCommentList = () => {
    return this.state.comment.map((item) => (
      <li key={item.id} className='list-of-comments'>
        <span>{item.content}</span>
      </li>
    ));
  };

  renderFilteredSubforums = () => {
    return this.state.filteredSubforums.map((item) => (
      <li key={item.id} className='list-of-subforum'>
        <Link to={`http://localhost:3000/forum/${item.id}`} title={item.name}>
          {item.description}
        </Link>
      </li>
    ));
  };

  renderPostList = () => {
    return this.state.post.map((item) => (
      <React.Fragment key={item.id}>
        <li className='list-of-posts'>
          <span title={item.title}>
            <p>
              id: {item.id} subforum: {item.subforum} content:{' '}
              {item.content}
            </p>
          </span>
        </li>
        <CommentForm postID={item.id} />
      </React.Fragment>
    ));
  };

  render() {
    return (
      <main className='container'>
        <div className='search-bar'>
          <input
            type='text'
            placeholder='Search forums...'
            value={this.state.searchQuery}
            onChange={this.handleSearch}
          />
        </div>
        {/* <div className='post-list'>
          <p>Post list</p>
          <ul>{this.renderPostList()}</ul>
        </div> */}
        <div className='filtered-subforums'>
          <p>Filtered Subforums</p>
          <ul>{this.renderFilteredSubforums()}</ul>
        </div>
        <div className='add-post'>
          <PostForm />
        </div>
      </main>
    );
  }
}

export default ForumMain;