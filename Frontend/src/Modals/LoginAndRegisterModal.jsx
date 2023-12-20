import BaseModal from '../Base/BaseModal';

const LoginAndRegisterModal = (props) => {
  return (
    <BaseModal title={props.title} isOpen={props.isOpen} closeModal={props.closeModal}></BaseModal>
  );
};

export default LoginAndRegisterModal;
