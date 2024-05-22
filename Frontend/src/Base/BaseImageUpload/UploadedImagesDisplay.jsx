import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAddPlace, addPlaceActions } from 'Redux/addPlaceSlice';
import CancelIcon from 'icons/CancelIcon';

const UploadedImagesDisplay = () => {
  const dispatch = useDispatch();
  const images = useSelector(selectAddPlace).images;
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    const readerPromises = images.map((image) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve({ url: event.target.result, name: image.name });
        };
        reader.readAsDataURL(image);
      });
    });

    Promise.all(readerPromises).then((results) => {
      setImagePreviews(results);
    });
  }, [images]);

  const deleteImage = (name) => {
    const updatedImages = images.filter((image) => image.name !== name);
    dispatch(addPlaceActions.setImages(updatedImages));
  };

  return (
    <div className='overflow-x-auto max-w-full'>
      <div className='flex space-x-4 p-2'>
        {imagePreviews.map((preview, index) => (
          <div key={index} className='flex-shrink-0 relative p-2'>
            <img src={preview.url} alt={preview.name} className='w-32 h-24' />
            <button
              className='absolute w-6 h-6 top-0 right-0 bg-red-500 p-1 text-sm rounded-full border-black border'
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
