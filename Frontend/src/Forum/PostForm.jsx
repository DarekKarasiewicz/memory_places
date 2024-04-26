import axios from 'axios';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import { registerAppChanges } from '../utils';

function PostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { t } = useTranslation();
  const [cookies] = useCookies(['user']);

  const handleSubmit = () => {
    const item = { title: title, content: content, author_id: cookies.user_id, subforum: 1 };
    axios
      .post('http://127.0.0.1:8000/memo_places_forum/posts/', item, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        registerAppChanges('admin.changes_messages.post_added', cookies.user);
      })
      .catch((error) => {
        console.log('Erorr with :', error);
      });
    console.log(`${title},${content}`);
  };

  return (
    <>
      <div>
        <label htmlFor='post-title'>{t('forum.title')}</label>
        <input
          type='text'
          id='post-title'
          name='title'
          placeholder={t('forum.post_title')}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />

        <label htmlFor='post-content'>{t('forum.content')}</label>
        <input
          type='text'
          id='post=content'
          name='content'
          placeholder={t('forum.content')}
          onChange={(e) => setContent(e.target.value)}
        />
        <br />
        <input type='submit' onClick={handleSubmit} value={t('common.save')} />
      </div>
    </>
  );
}

export default PostForm;
