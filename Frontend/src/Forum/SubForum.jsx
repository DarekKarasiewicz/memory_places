import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CommentForm from './CommentForm';



function SubForum() {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/memo_places_forum/forum_posts/${id}`)
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);


  const handleLike = (post, action) => {
    // Clone the post object to avoid directly modifying the state
    const updatedPost = { ...post };
    

    action === 'like' ? updatedPost.like += 1 : updatedPost.dislike += 1;
  
    // Update the post on the server
    axios
      .put(`http://127.0.0.1:8000/memo_places_forum/posts/${post.id}/`, updatedPost)
      .then((res) => {
        // Fetch the updated data
        axios
          .get(`http://127.0.0.1:8000/memo_places_forum/forum_posts/${id}`)
          .then((res) => {
            setPosts(res.data);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <p>Hello from subforum id:{id}</p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <React.Fragment key={post.id}>
              <li
                style={{
                  border: '1px solid #ccc',
                  margin: '10px',
                  padding: '10px',
                }}
              >
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                {/* Add more details as needed */}
                <label>
                  Like: {post.like}
                  <input
                    type="checkbox"
                    onChange={(e) => handleLike(post, 'like')}
                    // onChange={(e) => handleLikeDislike(post.id, 'like', e.target.checked)}
                  />
                </label>
                <br/>
                <label>
                  Dislike: {post.dislike}
                  <input
                    type="checkbox"
                    onChange={(e) => handleLike(post, 'dislike')}
                  />
                </label>
              </li>
              <CommentForm postID={post.id} />
            </React.Fragment>
          ))}
        </ul>
      )}
    </>
  );
}

export default SubForum;