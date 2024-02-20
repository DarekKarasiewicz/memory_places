import axios from 'axios';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function CommentForm(props) {
  const [content, setContent] = useState('');
  const { postID } = props;
  const { t } = useTranslation();

  const handleSubmit = () => {
    const item = { content: content, author: 1, post: postID };
    axios
      .post('http://127.0.0.1:8000/memo_places_forum/comments/', item, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .catch((error) => {
        console.log('Error with:', error);
      });
    console.log(`${content} ${postID}`);
  };

  return (
    <>
      <div>
        <label htmlFor='comment-content'>{t('forum.comment_content')}</label>
        <br />
        <input
          type='text'
          id='comment-content'
          name='comment-content'
          placeholder='Comment Conntent'
          onChange={(e) => setContent(e.target.value)}
        />
        <br />
        <input type='submit' onClick={handleSubmit} value={t('common.save')} />
      </div>
    </>
  );
}

export default CommentForm;
