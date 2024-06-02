import { useDispatch, useSelector } from 'react-redux';
import { modalsActions } from 'Redux/modalsSlice';
import { selectUserPlaces } from 'Redux/userPlacesSlice';

import { useFontSize } from 'Components/FontSizeSwitcher/FontSizeContext';

function Footer() {
  const dispatch = useDispatch();
  const userPlacesData = useSelector(selectUserPlaces);
  const { fontSize } = useFontSize();

  return (
    <>
      <footer
        className={`${
          userPlacesData.isOpen ? 'w-2/3 right-0' : 'w-full'
        } absolute bottom-0 flex items-center justify-center h-8 bg-mainBgColor text-textColor text-sm font-bold drop-shadow-sm shadow-itemShadow`}
      >
        <span
          className={`cursor-pointer hover:scale-105 hover:text-contrastColor transition text-${fontSize}-base`}
          onClick={() => dispatch(modalsActions.changeIsFoundationInfoOpen())}
        >
          Copyright © 2024 fundacja Miejsca Pamięci
        </span>
      </footer>
    </>
  );
}

export default Footer;
