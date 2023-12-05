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

  return (
    <>
      <p>Hello form subforum id:{id}</p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <>
            <li key={post.id} 
                style={{
                  border: '1px solid #ccc',
                  margin: '10px',
                  padding: '10px',
            }}
            >
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              {/* Add more details as needed */}
            </li>
            <CommentForm postID={post.id} />
            </>
          ))}
        </ul>
      )}
    </>
  );
}

export default SubForum;