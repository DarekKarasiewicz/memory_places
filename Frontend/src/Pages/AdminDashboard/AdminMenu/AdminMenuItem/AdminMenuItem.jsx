import StatisticsIcon from 'icons/admin/StatisticsIcon';
import UserGroupIcon from 'icons/admin/UserGroupIcon';
import PlacesIcon from 'icons/admin/PlacesIcon';
import TrailIcon from 'icons/TrailIcon';
import VarChangesIcon from 'icons/admin/VarChangesIcon';
import VerificationIcon from 'icons/admin/VerificationIcon';
import PostIcon from 'icons/PostIcon';
import CommentIcon from 'icons/CommentIcon';
import ContactIcon from 'icons/ContactIcon';
import WebChangesIcon from 'icons/admin/WebChangesIcon';

import { useFontSize } from 'Components/FontSizeSwitcher/FontSizeContext';

function AdminMenuItem(props) {
  const { fontSize } = useFontSize();

  const iconComponents = {
    statistics: <StatisticsIcon />,
    userGroup: <UserGroupIcon />,
    places: <PlacesIcon />,
    trails: <TrailIcon />,
    varChanges: <VarChangesIcon />,
    verification: <VerificationIcon />,
    post: <PostIcon />,
    comment: <CommentIcon />,
    contact: <ContactIcon />,
    webChanges: <WebChangesIcon />,
  };

  const IconComponent = iconComponents[props.icon] || null;

  return (
    <>
      <div
        className={`${
          props.active ? 'border-l-4 pl-2 border-cyan-600 text-cyan-600' : ''
        } flex items-center gap-3 p-1 text-textColor hover:border-l-4 hover:pl-2 hover:border-cyan-600 hover:text-cyan-600 cursor-pointer transition`}
        onClick={props.onClick}
      >
        {IconComponent}
        <span className={`text-${fontSize}-base leading-5 flex-grow`}>{props.name}</span>
      </div>
    </>
  );
}

export default AdminMenuItem;
