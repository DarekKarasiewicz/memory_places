import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAddObjectImage, addObjectImageActions } from 'Redux/addObjectImageSlice';

import CancelIcon from 'icons/CancelIcon';

const UploadedImagesDisplay = () => {
  const dispatch = useDispatch();
  const images = useSelector(selectAddObjectImage).images;
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    const readerPromises = images.map((image) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        if (image instanceof Blob) {
          reader.onload = (event) => {
            resolve({ url: event.target.result, name: image.name });
          };
          reader.readAsDataURL(image);
        } else if (typeof image === 'object' && image.img) {
          resolve({ url: image.img, name: image.name, id: image.id });
        } else {
          resolve(null);
        }
      });
    });

    Promise.all(readerPromises).then((results) => {
      setImagePreviews(results);
    });
  }, [images]);

  const deleteImage = (name) => {
    const updatedImages = images.filter((image) => image.name !== name);
    dispatch(addObjectImageActions.setImages(updatedImages));
  };

  return (
    <div className='overflow-x-auto max-w-full'>
      <div className='flex space-x-4 p-2'>
        {imagePreviews.map((preview, index) => (
          <div key={index} className='flex-shrink-0 relative p-2'>
            <img src={preview.url} alt={preview.name} className='w-32 h-24' />
            <button
              className='absolute w-7 h-7 -top-1 -right-1 bg-red-500 p-1 text-sm rounded-full border-black border hover:scale-110'
              onClick={() => deleteImage(preview.name)}
            >
              <CancelIcon className='relative' />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadedImagesDisplay;
