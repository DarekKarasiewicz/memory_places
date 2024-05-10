import { useDispatch } from 'react-redux';
import { modalsActions } from '../Redux/modalsSlice';

function Footer() {
  const dispatch = useDispatch();

  return (
    <>
      <footer className='absolute bottom-0 w-full flex items-center justify-center h-8 bg-mainBgColor text-textColor text-sm font-bold drop-shadow-sm shadow-itemShadow'>
        <span
          className='cursor-pointer hover:scale-105 hover:text-contrastColor transition'
          onClick={() => dispatch(modalsActions.changeIsFoundationInfoOpen())}
        >
          Copyright © 2024 fundacja Miejsca Pamięci
        </span>
      </footer>
    </>
  );
}

export default Footer;
