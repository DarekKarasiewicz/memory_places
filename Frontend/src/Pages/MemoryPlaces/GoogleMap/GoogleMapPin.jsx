import ArchaeologicalSiteIcon from 'icons/places_icons/ArchaeologicalSiteIcon';
import BattlefieldIcon from 'icons/places_icons/BattlefieldIcon';
import BurialSiteIcon from 'icons/places_icons/BurialSiteIcon';
import CivilCemeteryIcon from 'icons/places_icons/CivilCemeteryIcon';
import ExecutionSiteIcon from 'icons/places_icons/ExecutionSiteIcon';
import HistoricalMonumentIcon from 'icons/places_icons/HistoricalMonumentIcon';
import WarCemeteryIcon from 'icons/places_icons/WarCemeteryIcon';
import WaysideShrineIcon from 'icons/places_icons/WaysideShrineIcon';
import PlusIcon from 'icons/PlusIcon';

const GoogleMapPin = ({ iconPath, isVerified }) => {
  const iconComponents = {
    1: <CivilCemeteryIcon className='h-8 w-8 -rotate-45' />,
    2: <BurialSiteIcon className='h-8 w-8 -rotate-45' />,
    3: <HistoricalMonumentIcon className='h-8 w-8 -rotate-45' />,
    4: <WaysideShrineIcon className='h-8 w-8 -rotate-45' />,
    5: <BattlefieldIcon className='h-8 w-8 -rotate-45' />,
    6: <ExecutionSiteIcon className='h-8 w-8 -rotate-45' />,
    7: <ArchaeologicalSiteIcon className='h-8 w-8 -rotate-45' />,
    8: <WarCemeteryIcon className='h-8 w-8 -rotate-45' />,
  };

  const IconComponent = iconComponents[iconPath] || <PlusIcon className='h-8 w-8 rotate-45' />;

  return (
    <div
      className={`flex items-center justify-center w-10 h-10 ${
        isVerified ? 'bg-mainBgColor' : 'bg-yellow-500'
      } rounded-t-full rounded-bl-full rotate-45 shadow-itemShadow`}
    >
      {IconComponent}
    </div>
  );
};

export default GoogleMapPin;
