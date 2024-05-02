import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import UploadedImagesDisplay from './UploadedImagesDisplay';
import { useDispatch, useSelector } from 'react-redux';
import { selectAddPlace, addPlaceActions } from 'Redux/addPlaceSlice';
import UploadIcon from 'icons/UploadIcon';
import { motion } from 'framer-motion';

const BaseImageUpload = ({ fileSize }) => {
  const dispatch = useDispatch();
  const images = useSelector(selectAddPlace).images;
  const [errorMsg, setErrorMsg] = useState(null);
  const [showError, setShowError] = useState(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const fileInputRef = useRef(null);
  const { t } = useTranslation();
  const MAX_FILE_SIZE = fileSize * 1024 * 1024;
  const fixedFileSize = MAX_FILE_SIZE / 1048576;
  const MAX_FILES = 3;

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const validateImagesQuantity = (uploadedImagesLength) => {
    const allFilesLenght = uploadedImagesLength + images.length;
    if (uploadedImagesLength <= MAX_FILES && allFilesLenght <= MAX_FILES) {
      return true;
    }

    setErrorMsg(`${t('common.max_files_number')} ${MAX_FILES}`);
    return false;
  };

  const validateDuplicates = (uploadedImage) => {
    const duplicateFile = images.find((image) => image.name === uploadedImage.name);
    if (!duplicateFile) {
      return true;
    }
    setErrorMsg(`${t('common.already_uploaded')} ${uploadedImage.name}`);
    return false;
  };

  const validateImageType = (uploadedImage) => {
    if (uploadedImage.type.startsWith('image/')) {
      return true;
    }
    setErrorMsg(t('common.only_images'));
    return false;
  };

  const validateImageSize = (uploadedImage) => {
    if (uploadedImage.size <= MAX_FILE_SIZE) {
      return true;
    }
    setErrorMsg(`${t('common.file_too_large')} ${uploadedImage.name}`);
    return false;
  };

  const validateImage = (uploadedImage, uploadedImagesLength) => {
    const validators = [validateDuplicates, validateImageType, validateImageSize];

    const imageValidationResults = validators.map((validator) => validator(uploadedImage));

    const allValidationResults = imageValidationResults.concat(
      validateImagesQuantity(uploadedImagesLength),
    );

    const isValid = allValidationResults.every((result) => result);

    return isValid;
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDraggingOver(false);
  };

  const handleImageUpload = (event) => {
    event.preventDefault();
    setIsDraggingOver(false);

    const uploadedImages = Array.from(
      event.target.files === undefined ? event.dataTransfer.files : event.target.files,
    );

    uploadedImages.forEach((uploadedImage) => {
      if (validateImage(uploadedImage, uploadedImages.length)) {
        dispatch(addPlaceActions.addImage(uploadedImage));
        setShowError(false);
      }
      setShowError(true);
      return;
    });
  };
  return (
    <div
      className={`border-dashed border-2 my-2 border-textColor w-full p-4 flex flex-col items-center justify-center cursor-pointer ${
        isDraggingOver ? 'opacity-50' : ''
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleImageUpload}
    >
      <motion.div
        className='flex flex-col items-center'
        whileHover={{ scale: 1.05 }}
        onClick={handleClick}
      >
        <UploadIcon />
        <p>{t('common.drag_info1')}</p>
        <p>{t('common.drag_info2', { value: fixedFileSize })}</p>
        {showError === true && <p className='text-red-500 text-sm mt-2'>{errorMsg}</p>}
        <input
          multiple
          className='hidden'
          type='file'
          name='imageUpload'
          ref={fileInputRef}
          onChange={handleImageUpload}
        />
      </motion.div>
      {images.length > 0 && <UploadedImagesDisplay />}
    </div>
  );
};

export default BaseImageUpload;
