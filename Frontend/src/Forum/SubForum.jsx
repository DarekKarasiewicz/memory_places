import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CommentForm from './CommentForm';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import { registerAppChanges } from 'utils';
import { useDispatch } from 'react-redux';
import { notificationModalActions } from 'Redux/notificationModalSlice';

function SubForum() {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const [cookies] = useCookies(['user']);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/memo_places_forum/forum_posts/${id}`)
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        dispatch(notificationModalActions.changeType('alert'));
        dispatch(notificationModalActions.changeTitle(t('modal.filled_box_error')));
        dispatch(notificationModalActions.changeIsNotificationModalOpen());
      });
  }, [id]);

  const handleLike = (post, action) => {
    // Clone the post object to avoid directly modifying the state
    const updatedPost = { ...post };

    action === 'like' ? (updatedPost.like += 1) : (updatedPost.dislike += 1);

    // Update the post on the server
    axios
      .put(`http://127.0.0.1:8000/memo_places_forum/posts/${post.id}/`, updatedPost)
      .then((res) => {
        // Fetch the updated data
        registerAppChanges('admin.changes_messages.post_edit', cookies.user.user_id, post.id);
        axios
          .get(`http://127.0.0.1:8000/memo_places_forum/forum_posts/${id}`)
          .then((res) => {
            setPosts(res.data);
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            dispatch(notificationModalActions.changeType('alert'));
            dispatch(notificationModalActions.changeTitle(t('modal.filled_box_error')));
            dispatch(notificationModalActions.changeIsNotificationModalOpen());
          });
      })
      .catch((err) => {
        dispatch(notificationModalActions.changeType('alert'));
        dispatch(notificationModalActions.changeTitle(t('modal.filled_box_error')));
        dispatch(notificationModalActions.changeIsNotificationModalOpen());
      });
  };

  return (
    <>
      <p>
        {t('forum.welcome_id')}
        {id}
      </p>
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
                    type='checkbox'
                    onChange={(e) => handleLike(post, 'like')}
                    // onChange={(e) => handleLikeDislike(post.id, 'like', e.target.checked)}
                  />
                </label>
                <br />
                <label>
                  Dislike: {post.dislike}
                  <input type='checkbox' onChange={(e) => handleLike(post, 'dislike')} />
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
