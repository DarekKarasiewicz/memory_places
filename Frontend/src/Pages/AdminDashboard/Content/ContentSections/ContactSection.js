import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { notificationModalActions } from 'Redux/notificationModalSlice';
import { adminDataActions, selectAdminData } from 'Redux/adminDataSlice';

import ContactTable from '../Tables/ContactTable';

function ContactSection() {
  const { t } = useTranslation();
  const [contactData, setContactData] = useState([]);
  const dispatch = useDispatch();
  const modalData = useSelector(selectAdminData);
  const { isContactChanged } = modalData;

  const fetchContactItems = async () => {
    try {
      //TO DO
      //endpoint to change when backend will be updated
      const response = await axios.get(`http://localhost:8000/memo_places/contact_us`);
      const contactItems = response.data.map((obj, index) => {
        return {
          ...obj,
          lp: index + 1,
        };
      });
      setContactData(contactItems);
      dispatch(adminDataActions.updateIsContactChanged(false));
    } catch (error) {
      dispatch(notificationModalActions.changeType('alert'));
      dispatch(notificationModalActions.changeTitle(t('admin.content.alert_error')));
      dispatch(notificationModalActions.changeIsNotificationModalOpen());
    }
  };

  const contactColumns = [
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
    },
    {
      header: t('admin.content.content'),
      accessorKey: 'description',
    },
    {
      header: t('admin.content.send_by'),
      accessorKey: 'username',
    },
  ];

  useEffect(() => {
    if (isContactChanged || contactData.length === 0) {
      fetchContactItems();
    }
  }, [isContactChanged]);

  return (
    <>
      <div className='flex flex-col gap-1'>
        <span className='text-3xl'>{t('admin.common.contact_title')}</span>
        <span className='text-md'>{t('admin.content.contact_info')}</span>
      </div>
      <div className='w-full flex flex-col gap-3'>
        <ContactTable data={contactData} columns={contactColumns} />
      </div>
    </>
  );
}

export default ContactSection;
