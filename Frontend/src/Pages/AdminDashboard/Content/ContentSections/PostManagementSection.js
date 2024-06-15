import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { notificationModalActions } from 'Redux/notificationModalSlice';
import { adminDataActions, selectAdminData } from 'Redux/adminDataSlice';

import AdminTileStat from '../Charts/AdminTileStat';
import PostsTable from '../Tables/PostsTable';

import { useFontSize } from 'Components/FontSizeSwitcher/FontSizeContext';

function PostManagementSection() {
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const dispatch = useDispatch();
  const modalData = useSelector(selectAdminData);
  const { isPostsChanged } = modalData;
  const { fontSize } = useFontSize();
  const appPath = process.env.REACT_APP_URL_PATH;

  const fetchPostItems = async () => {
    try {
      const response = await axios.get(`${appPath}/memo_places_forum/post/`);

      const modifiedPostData = response.data.map((obj, index) => ({
        ...obj,
        lp: index + 1,
      }));

      const getItemDate = (date) => {
        return new Date(date).getMonth();
      };

      const previousMonthDate = () => {
        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() - 1);
        return currentDate.getMonth();
      };

      const sumOfCurrentMonthPosts = modifiedPostData.filter(
        (item) => getItemDate(item.creation_date) === new Date().getMonth(),
      );

      const sumOfPreviousMonthPosts = modifiedPostData.filter(
        (item) => getItemDate(item.creation_date) === previousMonthDate,
      );

      setPosts(modifiedPostData);
      setStatistics((statistics) => ({ ...statistics, ['allPosts']: modifiedPostData.length }));
      setStatistics((statistics) => ({
        ...statistics,
        ['previousMonthPosts']: sumOfPreviousMonthPosts.length,
      }));
      setStatistics((statistics) => ({
        ...statistics,
        ['currentMonthPosts']: sumOfCurrentMonthPosts.length,
      }));
      dispatch(adminDataActions.updateIsPostsChanged(false));
    } catch (error) {
      dispatch(notificationModalActions.changeType('alert'));
      dispatch(notificationModalActions.changeTitle(t('admin.content.alert_error')));
      dispatch(notificationModalActions.changeIsNotificationModalOpen());
    }
  };

  useEffect(() => {
    if (isPostsChanged || posts.length === 0) {
      fetchPostItems();
    }
  }, [isPostsChanged]);

  useEffect(() => {
    fetchPostItems();
  }, []);

  const postsColumns = [
    {
      header: t('admin.content.lp'),
      accessorKey: 'lp',
    },
    {
      header: 'ID',
      accessorKey: 'id',
      show: false,
    },
    {
      header: t('admin.content.title'),
      accessorKey: 'title',
      cell: (props) => {
        if (props.getValue().length > 30) {
          return props.getValue().substring(0, 27) + ' ...';
        } else {
          return props.getValue();
        }
      },
    },
    {
      header: t('admin.content.like'),
      accessorKey: 'like',
    },
    {
      header: t('admin.content.id_place'),
      accessorKey: 'place',
    },
    {
      header: t('admin.content.created_by'),
      accessorKey: 'username',
    },
    {
      header: t('admin.content.created'),
      accessorKey: 'created_at',
      cell: (props) => {
        return props.getValue().split('T')[0];
      },
    },
  ];

  return (
    <>
      <div className='flex flex-col gap-1'>
        <span className={`text-${fontSize}-3xl`}>{t('admin.common.post_manage_title')}</span>
        <span className={`text-${fontSize}-base`}>{t('admin.content.all_post_info')}</span>
      </div>
      <div className='flex flex-col gap-8'>
        <div className='grid grid-cols-3 max-xl:grid-cols-2 gap-6 w-full p-6 bg-thirdBgColor'>
          <AdminTileStat
            title={t('admin.content.all_posts')}
            value={statistics.allPosts}
            icon='post'
          />
          <AdminTileStat
            title={t('admin.content.previous_posts')}
            value={statistics.previousMonthPosts}
            icon='post'
          />
          <AdminTileStat
            title={t('admin.content.current_posts')}
            value={statistics.currentMonthPosts}
            icon='post'
          />
        </div>
        <hr />
        <div className='w-full flex flex-col gap-3'>
          <PostsTable data={posts} columns={postsColumns} />
        </div>
      </div>
    </>
  );
}

export default PostManagementSection;
