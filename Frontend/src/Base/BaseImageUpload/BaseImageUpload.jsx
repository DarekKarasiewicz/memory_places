import { useRef, useState } from 'react';
import BaseButton from '../BaseButton';
import { useTranslation } from 'react-i18next';
import UploadedImagesDisplay from './UploadedImagesDisplay';
import { useDispatch, useSelector } from 'react-redux';
import { selectAddPlace, addPlaceActions } from '../../Redux/addPlaceSlice';

const BaseImageUpload = ({ fileSize }) => {
  const dispatch = useDispatch();
  const images = useSelector(selectAddPlace).images;
  const [errorMsg, setErrorMsg] = useState(null);
  const [showError, setShowError] = useState(null);
  const fileInputRef = useRef(null);
  const { t } = useTranslation();
  const MAX_FILE_SIZE = fileSize * 1024 * 1024;
  const MAX_FILES = 3;

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const validateImagesQuantity = (uploadedImagesLength) => {
    const allFilesLenght = uploadedImagesLength + images.length;

    if (uploadedImagesLength < MAX_FILES || allFilesLenght < MAX_FILES) {
      return true;
    } else {
      setErrorMsg(`${t('common.max_files_number')} ${MAX_FILES}`);
      return false;
    }
  };

  const validateDuplicates = (uploadedImage) => {
    const duplicateFile = images.find((image) => image.name === uploadedImage.name);
    if (!duplicateFile) {
      return true;
    } else {
      setErrorMsg(`${t('common.already_uploaded')} ${uploadedImage.name}`);
      return false;
    }
  };

  const validateImageType = (uploadedImage) => {
    if (uploadedImage.type.startsWith('image/')) {
      return true;
    } else {
      setErrorMsg(t('common.only_images'));
      return false;
    }
  };

  const validateImageSize = (uploadedImage) => {
    if (uploadedImage.size <= MAX_FILE_SIZE) {
      return true;
    } else {
      setErrorMsg(`${t('common.file_too_large')} ${uploadedImage.name}`);
      return false;
    }
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

  const handleImageUpload = (event) => {
    const uploadedImages = Array.from(event.target.files);

    uploadedImages.forEach((uploadedImage) => {
      if (validateImage(uploadedImage, uploadedImages.length)) {
        dispatch(addPlaceActions.addImage(uploadedImage));
        setShowError(false);
      } else {
        setShowError(true);
        return;
      }
    });
  };
  return (
    <div className='flex flex-col justify-center items-center m-2'>
      {images.length > 0 && <UploadedImagesDisplay />}
      <BaseButton
        className={'mt-1'}
        type='submit'
        name={t('common.upload_file')}
        btnBg='blue'
        onClick={handleClick}
      />
      <input
        multiple
        className='hidden'
        type='file'
        name='imageUpload'
        ref={fileInputRef}
        onChange={handleImageUpload}
      />
      {showError === true && <p className='text-red-500 text-sm mt-2'>{errorMsg}</p>}
    </div>
  );
};

export default BaseImageUpload;
