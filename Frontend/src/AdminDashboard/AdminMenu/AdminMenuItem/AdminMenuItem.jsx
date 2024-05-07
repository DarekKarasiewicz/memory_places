import StatisticsIcon from 'icons/admin/StatisticsIcon';
import UserGroupIcon from 'icons/admin/UserGroupIcon';
import PlacesIcon from 'icons/admin/PlacesIcon';
import VarChangesIcon from 'icons/admin/VarChangesIcon';
import VerificationIcon from 'icons/admin/VerificationIcon';
import WebChangesIcon from 'icons/admin/WebChangesIcon';

function AdminMenuItem(props) {
  const iconComponents = {
    statistics: <StatisticsIcon />,
    userGroup: <UserGroupIcon />,
    places: <PlacesIcon />,
    varChanges: <VarChangesIcon />,
    verification: <VerificationIcon />,
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
        <span className='leading-5 flex-grow'>{props.name}</span>
      </div>
    </>
  );
}

export default AdminMenuItem;
