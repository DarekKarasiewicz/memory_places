import React from 'react';

import UserGroupIcon from 'icons/admin/UserGroupIcon';
import PlacesIcon from 'icons/admin/PlacesIcon';
import UsersIcon from 'icons/admin/UsersIcon';
import ModUserIcon from 'icons/admin/ModUserIcon';
import AdminUserIcon from 'icons/admin/AdminUserIcon';
import NewUsersIcon from 'icons/admin/NewUsersIcon';
import MapPinIcon from 'icons/admin/MapPinIcon';
import ClipboardCheckIcon from 'icons/admin/ClipboardCheckIcon';
import FlagCheckIcon from 'icons/admin/FlagCheckIcon';
import TrailIcon from 'icons/TrailIcon';
import PostIcon from 'icons/PostIcon';
import CommentIcon from 'icons/CommentIcon';

function AdminTileStat(props) {
  const iconComponents = {
    userGroup: <UserGroupIcon />,
    places: <PlacesIcon />,
    users: <UsersIcon />,
    modUser: <ModUserIcon />,
    adminUser: <AdminUserIcon />,
    newUsers: <NewUsersIcon />,
    mapPin: <MapPinIcon />,
    clipboardCheck: <ClipboardCheckIcon />,
    flagCheck: <FlagCheckIcon />,
    trail: <TrailIcon />,
    post: <PostIcon />,
    comment: <CommentIcon />,
  };

  const IconComponent = iconComponents[props.icon] || null;

  return (
    <>
      <div className='flex flex-col justify-between rounded-lg h-36 px-6 py-6 bg-mainBgColor'>
        <span className='flex justify-start items-center gap-2 text-2xl leading-6'>
          {IconComponent ? IconComponent : null}
          <span>{props.title}</span>
        </span>
        <div className='flex justify-between mx-4'>
          <span className='text-3xl font-semibold'>{props.value}</span>
        </div>
      </div>
    </>
  );
}

export default AdminTileStat;
