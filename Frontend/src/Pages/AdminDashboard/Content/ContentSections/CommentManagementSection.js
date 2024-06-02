import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { notificationModalActions } from 'Redux/notificationModalSlice';
import { adminDataActions, selectAdminData } from 'Redux/adminDataSlice';

import AdminTileStat from '../Charts/AdminTileStat';
import CommentsTable from '../Tables/CommentsTable';

import { useFontSize } from 'Components/FontSizeSwitcher/FontSizeContext';

function CommentManagementSection() {
  const { t } = useTranslation();
  const [comments, setComments] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const dispatch = useDispatch();
  const modalData = useSelector(selectAdminData);
  const { isCommentsChanged } = modalData;
  const { fontSize } = useFontSize();

  const fetchCommentItems = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/memo_places_forum/comment/`);

      const modifiedCommentData = response.data.map((obj, index) => ({
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

      const sumOfCurrentMonthComments = modifiedCommentData.filter(
        (item) => getItemDate(item.creation_date) === new Date().getMonth(),
      );

      const sumOfPreviousMonthComments = modifiedCommentData.filter(
        (item) => getItemDate(item.creation_date) === previousMonthDate,
      );

      setComments(modifiedCommentData);
      setStatistics((statistics) => ({
        ...statistics,
        ['allComments']: modifiedCommentData.length,
      }));
      setStatistics((statistics) => ({
        ...statistics,
        ['previousMonthComments']: sumOfPreviousMonthComments.length,
      }));
      setStatistics((statistics) => ({
        ...statistics,
        ['currentMonthComments']: sumOfCurrentMonthComments.length,
      }));
      dispatch(adminDataActions.updateIsCommentsChanged(false));
    } catch (error) {
      dispatch(notificationModalActions.changeType('alert'));
      dispatch(notificationModalActions.changeTitle(t('admin.content.alert_error')));
      dispatch(notificationModalActions.changeIsNotificationModalOpen());
    }
  };

  useEffect(() => {
    if (isCommentsChanged || comments.length === 0) {
      fetchCommentItems();
    }
  }, [isCommentsChanged]);

  useEffect(() => {
    fetchCommentItems();
  }, []);

  const commentsColumns = [
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
      header: t('admin.content.content'),
      accessorKey: 'content',
    },
    {
      header: t('admin.content.like'),
      accessorKey: 'like',
    },
    {
      header: t('admin.content.id_post'),
      accessorKey: 'post',
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
        <span className={`text-${fontSize}-3xl`}>{t('admin.common.comment_manage_title')}</span>
        <span className={`text-${fontSize}-base`}>{t('admin.content.all_comment_info')}</span>
      </div>
      <div className='flex flex-col gap-8'>
        <div className='grid grid-cols-3 gap-6 w-full p-6 bg-thirdBgColor'>
          <AdminTileStat
            title={t('admin.content.all_comments')}
            value={statistics.allComments}
            icon='comment'
          />
          <AdminTileStat
            title={t('admin.content.previous_comments')}
            value={statistics.previousMonthComments}
            icon='comment'
          />
          <AdminTileStat
            title={t('admin.content.current_comments')}
            value={statistics.currentMonthComments}
            icon='comment'
          />
        </div>
        <hr />
        <div className='w-full flex flex-col gap-3'>
          <CommentsTable data={comments} columns={commentsColumns} />
        </div>
      </div>
    </>
  );
}

export default CommentManagementSection;
