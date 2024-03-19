import { useRef, useState } from 'react';
import BaseButton from './BaseButton';
import { useTranslation } from 'react-i18next';

const BaseImageUpload = ({ fileSize }) => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [isImageValid, setIsImageValid] = useState(null);
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);
  const { t } = useTranslation();
  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  const MAX_FILES = 5;

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
      if (uploadedImage && uploadedImage.type.startsWith('image/')) {
        if (uploadedImage.size <= MAX_FILE_SIZE) {
          setImages([...images, uploadedImage]);
          if (isImageValid === false) {
            setErrorMsg(null);
            setIsImageValid(true);
          }
        } else {
          setErrorMsg(t('common.file_too_large'));
          setIsImageValid(false);
          return;
        }
      } else {
        setErrorMsg(t('common.only_images'));
        setIsImageValid(false);
        return;
      }
    });
  };
  console.log(images);

  return (
    <div className='flex flex-col justify-center items-center m-2'>
      <BaseButton
        className={'mt-1'}
        type='submit'
        name={t('common.upload_file')}
        btnBg='blue'
        onClick={handleClick}
      />
      <input
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
