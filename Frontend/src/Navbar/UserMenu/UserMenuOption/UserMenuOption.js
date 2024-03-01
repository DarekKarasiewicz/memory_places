import { motion } from 'framer-motion';

const UserMenuOption = (props) => {
  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        className={`w-full h-12 cursor-pointer flex gap-2 items-center pl-2 rounded-md hover:bg-slate-400 ${props.isActive === true ? 'bg-slate-400' : ''}`}
        onClick={props.onClick ? props.onClick : undefined}
      >
        <img
          src={`./assets/${props.icon}_icon.svg`}
          alt={`${props.icon}`}
          className='h-8 w-8'
        ></img>
        <div className='capitalize leading-5'>{props.name}</div>
      </motion.div>
    </>
  );
};

export default UserMenuOption;
