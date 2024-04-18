import { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import ArrowUpIcon from '../../../../icons/admin/ArrowUpIcon';
import ArrowDownIcon from '../../../../icons/admin/ArrowDownIcon';
import CheckIcon from '../../../../icons/CheckIcon';
import CancelIcon from '../../../../icons/CancelIcon';
import EditIcon from '../../../../icons/EditIcon';
import Trash2Icon from '../../../../icons/Trash2Icon';
import PlusIcon from '../../../../icons/PlusIcon';

const PlaceVariableItem = forwardRef(function PlaceVariableItem(
  { itemsName, items, itemsBase },
  ref,
) {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [dataDeleted, setDataDeleted] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const inputRef = useRef(null);
  const baseData = itemsBase;

  useEffect(() => {
    setData(items);
  }, [items]);

  const handleDeleteTypeItem = (id) => {
    let updatedItems;

    const deletedElement = data.find((element) => element.id === id);
    updatedItems = data.filter((item) => item.id !== id);
    setData(updatedItems);
    setDataDeleted((prevDeleted) => [...prevDeleted, deletedElement]);

    return updatedItems;
  };

  const handleEditItem = (index) => {
    setEditIndex(index);
  };

  const handleSaveItem = (index) => {
    setData((prevData) => {
      const updatedData = [...prevData];
      updatedData[index].name = inputRef.current.value;
      return updatedData;
    });

    inputRef.current.value = '';
    setEditIndex(null);
  };

  const handleCancelEdit = () => {
    setEditIndex('');
    inputRef.current.value = '';
  };

  const handleAddingElement = () => {
    if (data.length !== 0) {
      setData((prevItems) => [
        ...prevItems,
        {
          id: prevItems[prevItems.length - 1].id + 1,
          name: t('admin.common.new_element'),
          order: prevItems.length + 1,
        },
      ]);
    } else {
      setData((prevItems) => [
        ...prevItems,
        {
          id: prevItems.length + 1,
          name: t('admin.common.new_element'),
          order: prevItems.length + 1,
        },
      ]);
    }
  };

  const changeOrder = (fromIndex, toIndex) => {
    let dataset = [...data];

    const movedItem = dataset[fromIndex];
    dataset.splice(fromIndex, 1);
    dataset.splice(toIndex, 0, movedItem);

    dataset.forEach((item, index) => {
      item.order = index;
    });

    dataset.sort((a, b) => a.order - b.order);
    setData(dataset);
  };

  const postItems = async () => {
    let createItems = [];
    let updateItems = [];

    console.log('data');
    console.log(data);
    console.log('baseData');
    console.log(baseData);

    if (baseData.length === 0) {
      createItems = data;
    } else {
      const dataDifference = data.reduce(
        (result, element) => {
          const indexInBase = baseData.findIndex((item) => item.id === element.id);
          if (indexInBase === -1) {
            result.createItems.push(element);
          } else {
            const itemInBase = baseData[indexInBase];
            const hasChanged = Object.keys(element).some(
              (key) => key !== 'id' && itemInBase[key] !== element[key],
            );
            if (hasChanged) {
              result.updateItems.push(element);
            }
          }
          return result;
        },
        { createItems: [], updateItems: [] },
      );

      createItems = dataDifference.createItems;
      updateItems = dataDifference.updateItems;
    }

    if (createItems.length !== 0) {
      createItems.forEach((item) => {
        axios
          .post(`http://127.0.0.1:8000/admin_dashboard/${itemsName}s/`, {
            name: item.name,
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }

    if (updateItems.length !== 0) {
      updateItems.forEach((item) => {
        console.log(item);
        axios
          .put(`http://127.0.0.1:8000/admin_dashboard/${itemsName}s/${item.id}/`, {
            name: item.name,
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }

    if (dataDeleted.length !== 0) {
      dataDeleted.forEach((item) => {
        console.log(item);
        axios
          .delete(`http://127.0.0.1:8000/admin_dashboard/${itemsName}s/${item.id}`)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
  };

  useImperativeHandle(ref, () => ({
    postItems,
  }));

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <div className='bg-mainBgColor p-4 flex flex-col gap-4'>
        <span className='text-2xl'>
          {t(`admin.content.${itemsName}`)} <strong>({data.length})</strong>
        </span>
        <hr />
        <div className='flex justify-center items-center mb-2'>
          <div className='w-1/2'>
            <label className='block pl-1 pb-1 text-base'>{t('admin.content.select_preview')}</label>
            <select className='block rounded-l-lg w-full rounded-r-lg p-2 shadow border-2 text-black'>
              {data.length > 0 ? (
                <>
                  {data.map((item, index) => (
                    <option key={index} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </>
              ) : (
                <option disabled>{t('admin.content.no_options')}</option>
              )}
            </select>
          </div>
        </div>
        <hr />
        <div className='flex justify-center items-center p-4'>
          <div className='flex flex-col justify-center items-center gap-1 w-3/4'>
            {data.length > 0 && (
              <>
                {data.map((item, index) => (
                  <div
                    key={index}
                    className='flex justify-between shadow rounded-lg border-2 w-full h-16'
                  >
                    <div className='flex flex-col justify-center items-center shadow'>
                      <ArrowUpIcon
                        className='h-8 w-8 cursor-pointer hover:scale-125'
                        onClick={() => changeOrder(index, index - 1, 'sortof')}
                      />
                      <ArrowDownIcon
                        className='h-8 w-8 cursor-pointer hover:scale-125'
                        onClick={() => changeOrder(index, index + 1, 'sortof')}
                      />
                    </div>
                    <div className='flex justify-center items-center'>
                      {editIndex === index ? (
                        <input
                          type='text'
                          className='text-black'
                          defaultValue={item.name}
                          ref={inputRef}
                        ></input>
                      ) : (
                        <span className='text-lg'>{item.name}</span>
                      )}
                    </div>
                    <div className='flex justify-center items-center gap-1 mr-2'>
                      {editIndex === index ? (
                        <>
                          <CheckIcon
                            className='h-6 w-6 cursor-pointer hover:scale-125'
                            onClick={() => handleSaveItem(index, 'sortof')}
                          />
                          <CancelIcon
                            className='h-6 w-6 cursor-pointer hover:scale-125'
                            onClick={() => handleCancelEdit()}
                          />
                        </>
                      ) : (
                        <>
                          <EditIcon
                            className='h-6 w-6 cursor-pointer hover:scale-125'
                            onClick={() => handleEditItem(index)}
                          />
                          <Trash2Icon
                            className='h-6 w-6 cursor-pointer hover:scale-125'
                            onClick={() => handleDeleteTypeItem(item.id, 'sortof')}
                          />
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </>
            )}
            <div
              className='flex justify-center items-center shadow rounded-lg border-2 w-3/4 p-2 gap-1 cursor-pointer'
              onClick={() => handleAddingElement()}
            >
              <PlusIcon className='h-8 w-8' />
              <span className='hover:text-contrastColor'>{t('admin.content.add_element')}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default PlaceVariableItem;