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
  const [isImageValid, setIsImageValid] = useState(null);
  const fileInputRef = useRef(null);
  const { t } = useTranslation();
  const MAX_FILE_SIZE = fileSize * 1024 * 1024;

  const MAX_FILES = 3;

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = (event) => {
    const uploadedImages = Array.from(event.target.files);
    const allFilesLenght = uploadedImages.length + images.length;

    if (uploadedImages.length > MAX_FILES || allFilesLenght > MAX_FILES) {
      setErrorMsg(`${t('common.max_files_number')} ${MAX_FILES}`);
      setIsImageValid(false);
      return;
    }
    uploadedImages.forEach((uploadedImage) => {
      const duplicateFile = images.find((image) => image.name === uploadedImage.name);
      if (!duplicateFile) {
        if (uploadedImage && uploadedImage.type.startsWith('image/')) {
          if (uploadedImage.size <= MAX_FILE_SIZE) {
            console.log(uploadedImage);
            dispatch(addPlaceActions.addImage(uploadedImage));

            if (isImageValid === false) {
              setErrorMsg(null);
              setIsImageValid(true);
            }
          } else {
            setErrorMsg(`${t('common.file_too_large')} ${uploadedImage.name}`);

            setIsImageValid(false);
            return;
          }
        } else {
          setErrorMsg(t('common.only_images'));
          setIsImageValid(false);
          return;
        }
      } else {
        setErrorMsg(`${t('common.already_uploaded')} ${uploadedImage.name}`);
        setIsImageValid(false);
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
      {isImageValid === false && <p className='text-red-500 text-sm mt-2'>{errorMsg}</p>}
    </div>
  );
};

export default BaseImageUpload;
