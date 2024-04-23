import { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import axios from 'axios';
import ArrowUpIcon from '../../../../icons/admin/ArrowUpIcon';
import ArrowDownIcon from '../../../../icons/admin/ArrowDownIcon';
import CheckIcon from '../../../../icons/CheckIcon';
import CancelIcon from '../../../../icons/CancelIcon';
import EditIcon from '../../../../icons/EditIcon';
import Trash2Icon from '../../../../icons/Trash2Icon';
import PlusIcon from '../../../../icons/PlusIcon';

const PlaceVariableItem = forwardRef(function PlaceVariableItem(
  { itemsName, items, itemsBase, error },
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

  const handleIfAnyErrorAppeared = () => {
    error(true);
  };

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
          value: '',
          order: prevItems.length + 1,
        },
      ]);
    } else {
      setData((prevItems) => [
        ...prevItems,
        {
          id: prevItems.length + 1,
          name: t('admin.common.new_element'),
          value: '',
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

    const valuePreparation = (str) => {
      if (typeof str !== 'undefined') {
        return str
          .toString()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/\s+/g, '_')
          .toLowerCase();
      }
      return '';
    };

    if (createItems.length !== 0) {
      createItems.forEach((item) => {
        axios
          .post(`http://127.0.0.1:8000/admin_dashboard/${itemsName}s/`, {
            name: item.name,
            value: valuePreparation(item.name),
            order: item.order,
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            handleIfAnyErrorAppeared();
            console.log(error);
          });
      });
    }

    if (updateItems.length !== 0) {
      updateItems.forEach((item) => {
        axios
          .put(`http://127.0.0.1:8000/admin_dashboard/${itemsName}s/${item.id}/`, {
            name: item.name,
            order: item.order,
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            handleIfAnyErrorAppeared();
            console.log(error);
          });
      });
    }

    if (dataDeleted.length !== 0) {
      dataDeleted.forEach((item) => {
        axios
          .delete(`http://127.0.0.1:8000/admin_dashboard/${itemsName}s/${item.id}`)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            handleIfAnyErrorAppeared();
            console.log(error);
          });
      });
    }
  };

  useImperativeHandle(ref, () => ({
    postItems,
  }));

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
            <select className='block rounded-l-lg w-full rounded-r-lg p-2 shadow border-2 text-black cursor-pointer'>
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
                        className='h-8 w-8 cursor-pointer hover:scale-125 transition'
                        onClick={() => changeOrder(index, index - 1, 'sortof')}
                      />
                      <ArrowDownIcon
                        className='h-8 w-8 cursor-pointer hover:scale-125 transition'
                        onClick={() => changeOrder(index, index + 1, 'sortof')}
                      />
                    </div>
                    <div className='flex justify-center items-center'>
                      {editIndex === index ? (
                        <input
                          type='text'
                          className='text-black py-2 px-3 rounded-lg'
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
                            className='h-6 w-6 cursor-pointer hover:scale-125 transition'
                            onClick={() => handleSaveItem(index, 'sortof')}
                          />
                          <CancelIcon
                            className='h-6 w-6 cursor-pointer hover:scale-125 transition'
                            onClick={() => handleCancelEdit()}
                          />
                        </>
                      ) : (
                        <>
                          <EditIcon
                            className='h-6 w-6 cursor-pointer hover:scale-125 transition'
                            onClick={() => handleEditItem(index)}
                          />
                          <Trash2Icon
                            className='h-6 w-6 cursor-pointer hover:scale-125 transition'
                            onClick={() => handleDeleteTypeItem(item.id, 'sortof')}
                          />
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </>
            )}
            <motion.div
              className='flex justify-center hover:text-contrastColor items-center shadow rounded-lg border-2 w-3/4 p-2 gap-1 cursor-pointer'
              onClick={() => handleAddingElement()}
              whileHover={{ scale: 1.05 }}
            >
              <PlusIcon className='h-8 w-8' />
              <span>{t('admin.content.add_element')}</span>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
});

export default PlaceVariableItem;
