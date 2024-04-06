import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

function PlaceVariableManagementSection() {
  const { t } = useTranslation();
  const [sortOf, setSortOf] = useState([]);
  const [type, setType] = useState([]);
  const [period, setPeriod] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editIndexName, setEditIndexName] = useState(null);
  const inputSortOfRef = useRef(null);
  const inputTypeRef = useRef(null);
  const inputPeriodRef = useRef(null);

  const fetchSortOfItems = async () => {
    try {
      const responseSort = await axios.get(`http://127.0.0.1:8000/admin_dashboard/sortofs`);
      // TO DO
      // Check if code works cause no data
      setSortOf(responseSort.data.map((obj, index) => ({ ...obj, order: index, id: index })));
    } catch (error) {
      alert(error);
    }
  };

  const fetchTypeItems = async () => {
    try {
      // TO DO
      // Check if code works cause no data
      const responseType = await axios.get(`http://127.0.0.1:8000/admin_dashboard/types`);
      setType(responseType.data.map((obj, index) => ({ ...obj, order: index, id: index })));
    } catch (error) {
      alert(error);
    }
  };

  const fetchPeriodItems = async () => {
    try {
      // TO DO
      // Check if code works cause no data
      const responsePeriod = await axios.get(`http://127.0.0.1:8000/admin_dashboard/periods`);
      setPeriod(responsePeriod.data.map((obj, index) => ({ ...obj, order: index, id: index })));
    } catch (error) {
      alert(error);
    }
  };

  const handleDeleteTypeItem = (id, selectType) => {
    let updatedItems;

    if (selectType === 'period') {
      updatedItems = period.filter((item) => item.id !== id);
      setPeriod(updatedItems);
    }
    if (selectType === 'type') {
      updatedItems = type.filter((item) => item.id !== id);
      setType(updatedItems);
    }
    if (selectType === 'sortof') {
      updatedItems = sortOf.filter((item) => item.id !== id);
      setSortOf(updatedItems);
    }

    return updatedItems;
  };

  const handleEditItem = (index, selectName) => {
    setEditIndex(index);
    setEditIndexName(selectName);
  };

  const handleSaveItem = (index, selectName) => {
    if (period.length > 0 && selectName === 'period') {
      const updatedPeriod = [...period];
      updatedPeriod[index].name = inputPeriodRef.current.value;
      setPeriod(updatedPeriod);

      inputPeriodRef.current.value = '';
    }

    if (type.length > 0 && selectName === 'type') {
      const updatedType = [...type];
      updatedType[index].name = inputTypeRef.current.value;
      setType(updatedType);

      inputTypeRef.current.value = '';
    }

    if (sortOf.length > 0 && selectName === 'sortof') {
      const updatedSortOf = [...sortOf];
      updatedSortOf[index].name = inputSortOfRef.current.value;
      setSortOf(updatedSortOf);

      inputSortOfRef.current.value = '';
    }

    setEditIndex(null);
  };

  const handleCancelEdit = (selectName) => {
    setEditIndex('');
    setEditIndexName('');
    if (selectName === 'period') {
      inputPeriodRef.current.value = '';
    }

    if (selectName === 'type') {
      inputTypeRef.current.value = '';
    }

    if (selectName === 'sortof') {
      inputSortOfRef.current.value = '';
    }
  };

  const handleAddingElement = (selectType) => {
    switch (selectType) {
      case 'period':
        setPeriod((prevItems) => [
          ...prevItems,
          { id: prevItems.length + 1, name: 'New period element', order: prevItems.length + 1 },
        ]);
        break;
      case 'type':
        setType((prevItems) => [
          ...prevItems,
          { id: prevItems.length + 1, name: 'New type element', order: prevItems.length + 1 },
        ]);
        break;
      case 'sortof':
        setSortOf((prevItems) => [
          ...prevItems,
          { id: prevItems.length + 1, name: 'New sortof element', order: prevItems.length + 1 },
        ]);
        break;
      default:
        console.log('Invalid select type');
        break;
    }
  };

  const changeOrder = (fromIndex, toIndex, selectType) => {
    let dataset;
    if (selectType === 'period') {
      dataset = [...period];
    } else if (selectType === 'type') {
      dataset = [...type];
    } else if (selectType === 'sortof') {
      dataset = [...sortOf];
    } else {
      return;
    }

    const movedItem = dataset[fromIndex];
    dataset.splice(fromIndex, 1);
    dataset.splice(toIndex, 0, movedItem);

    dataset.forEach((item, index) => {
      item.order = index;
    });

    dataset.sort((a, b) => a.order - b.order);

    if (selectType === 'period') {
      setPeriod(dataset);
    } else if (selectType === 'type') {
      setType(dataset);
    } else if (selectType === 'sortof') {
      setSortOf(dataset);
    }
  };

  const postPeriodItems = async () => {
    axios
      .post(`http://127.0.0.1:8000/admin_dashboard/periods/`, period, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(() => {
        alert(t('admin.common.info1'));
      });
  };

  const postTypeItems = async () => {
    axios
      .post(`http://127.0.0.1:8000/admin_dashboard/types/`, type, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(() => {
        alert(t('admin.common.info1'));
      });
  };

  const postSortOfItems = async () => {
    axios
      .post(`http://127.0.0.1:8000/admin_dashboard/sortofs/`, sortOf, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(() => {
        alert(t('admin.common.info1'));
      });
  };

  const saveAllChanges = () => {
    postPeriodItems();
    postTypeItems();
    postSortOfItems();
  };

  useEffect(() => {
    fetchSortOfItems();
    fetchTypeItems();
    fetchPeriodItems();
  }, []);

  return (
    <>
      <div className='flex flex-col gap-1'>
        <span className='text-3xl'>{t('admin.common.var_manage_title')}</span>
        <span className='text-md'>{t('admin.content.variable_info')}</span>
      </div>
      <div className='flex flex-col gap-8'>
        <div className='grid grid-cols-3 gap-6 w-full'>
          <div className='bg-mainBgColor p-4 flex flex-col gap-4'>
            <span className='text-2xl'>
              {t('admin.content.sortof')} <strong>({sortOf.length})</strong>
            </span>
            <hr />
            <div className='flex justify-center items-center mb-2'>
              <div className='w-1/2'>
                <label className='block pl-1 pb-1 text-base'>
                  {t('admin.content.select_preview')}
                </label>
                <select className='block rounded-l-lg w-full rounded-r-lg p-2 shadow border-2 text-black'>
                  {sortOf.length > 0 ? (
                    <>
                      {sortOf.map((item, index) => (
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
                {sortOf.length > 0 && (
                  <>
                    {sortOf.map((item, index) => (
                      <div
                        key={index}
                        className='flex justify-between shadow rounded-lg border-2 w-full h-16'
                      >
                        <div className='flex flex-col justify-center items-center shadow'>
                          <img
                            src='./assets/arrow_up_icon.svg'
                            alt='arrow_up_icon'
                            className='h-8 w-8 cursor-pointer hover:scale-125'
                            onClick={() => changeOrder(index, index - 1, 'sortof')}
                          />
                          <img
                            src='./assets/arrow_down_icon.svg'
                            alt='arrow_down_icon'
                            className='h-8 w-8 cursor-pointer hover:scale-125'
                            onClick={() => changeOrder(index, index + 1, 'sortof')}
                          />
                        </div>
                        <div className='flex justify-center items-center'>
                          {editIndex === index && editIndexName === 'sortof' ? (
                            <input
                              type='text'
                              defaultValue={item.name}
                              ref={inputSortOfRef}
                            ></input>
                          ) : (
                            <span className='text-lg'>{item.name}</span>
                          )}
                        </div>
                        <div className='flex justify-center items-center gap-1 mr-2'>
                          {editIndex === index && editIndexName === 'sortof' ? (
                            <>
                              <img
                                src='./assets/check_icon.svg'
                                alt='check_icon'
                                className='h-6 w-6 cursor-pointer hover:scale-125'
                                onClick={() => handleSaveItem(index, 'sortof')}
                              />
                              <img
                                src='./assets/cancel_icon.svg'
                                alt='cancel_icon'
                                className='h-6 w-6 cursor-pointer hover:scale-125'
                                onClick={() => handleCancelEdit('sortof')}
                              />
                            </>
                          ) : (
                            <>
                              <img
                                src='./assets/edit_icon.svg'
                                alt='edit_icon'
                                className='h-6 w-6 cursor-pointer hover:scale-125'
                                onClick={() => handleEditItem(index, 'sortof')}
                              />
                              <img
                                src='./assets/trash2_icon.svg'
                                alt='trash_icon'
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
                  onClick={() => handleAddingElement('sortof')}
                >
                  <img src='./assets/plus_icon.svg' alt='plus_icon' className='h-8 w-8 ' />
                  <span className='hover:text-contrastColor'>{t('admin.content.add_element')}</span>
                </div>
              </div>
            </div>
          </div>
          <div className='bg-mainBgColor p-4 flex flex-col gap-4'>
            <span className='text-2xl'>
              {t('admin.content.type')} <strong>({type.length})</strong>
            </span>
            <hr />
            <div className='flex justify-center items-center mb-2'>
              <div className='w-1/2'>
                <label className='block pl-1 pb-1 text-base'>
                  {t('admin.content.select_preview')}
                </label>
                <select className='block rounded-l-lg w-full rounded-r-lg p-2 shadow border-2 text-black'>
                  {type.length > 0 ? (
                    <>
                      {type.map((item, index) => (
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
              <div className='flex flex-col justify-center items-center gap-3 w-3/4'>
                {type.length > 0 && (
                  <>
                    {type.map((item, index) => (
                      <div
                        key={index}
                        className='flex justify-between shadow rounded-lg border-2 w-full h-16'
                      >
                        <div className='flex flex-col justify-center items-center shadow'>
                          <img
                            src='./assets/arrow_up_icon.svg'
                            alt='arrow_up_icon'
                            className='h-8 w-8 cursor-pointer hover:scale-125'
                            onClick={() => changeOrder(index, index - 1, 'type')}
                          />
                          <img
                            src='./assets/arrow_down_icon.svg'
                            alt='arrow_down_icon'
                            className='h-8 w-8 cursor-pointer hover:scale-125'
                            onClick={() => changeOrder(index, index + 1, 'type')}
                          />
                        </div>
                        <div className='flex justify-center items-center'>
                          {editIndex === index && editIndexName === 'type' ? (
                            <input type='text' defaultValue={item.name} ref={inputTypeRef}></input>
                          ) : (
                            <span className='text-lg'>{item.name}</span>
                          )}
                        </div>
                        <div className='flex justify-center items-center gap-1 mr-2'>
                          {editIndex === index && editIndexName === 'type' ? (
                            <>
                              <img
                                src='./assets/check_icon.svg'
                                alt='check_icon'
                                className='h-6 w-6 cursor-pointer hover:scale-125'
                                onClick={() => handleSaveItem(index, 'type')}
                              />
                              <img
                                src='./assets/cancel_icon.svg'
                                alt='cancel_icon'
                                className='h-6 w-6 cursor-pointer hover:scale-125'
                                onClick={() => handleCancelEdit('type')}
                              />
                            </>
                          ) : (
                            <>
                              <img
                                src='./assets/edit_icon.svg'
                                alt='edit_icon'
                                className='h-6 w-6 cursor-pointer hover:scale-125'
                                onClick={() => handleEditItem(index, 'type')}
                              />
                              <img
                                src='./assets/trash2_icon.svg'
                                alt='trash_icon'
                                className='h-6 w-6 cursor-pointer hover:scale-125'
                                onClick={() => handleDeleteTypeItem(item.id, 'type')}
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
                  onClick={() => handleAddingElement('type')}
                >
                  <img src='./assets/plus_icon.svg' alt='plus_icon' className='h-8 w-8 ' />
                  <span className='hover:text-contrastColor'>{t('admin.content.add_element')}</span>
                </div>
              </div>
            </div>
          </div>
          <div className='bg-mainBgColor p-4 flex flex-col gap-4'>
            <span className='text-2xl'>
              {t('admin.content.period')} <strong>({period.length})</strong>
            </span>
            <hr />
            <div className='flex justify-center items-center mb-2'>
              <div className='w-1/2'>
                <label className='block pl-1 pb-1 text-base'>
                  {t('admin.content.select_preview')}
                </label>
                <select className='block rounded-l-lg w-full rounded-r-lg p-2 shadow border-2 gap-1 text-black'>
                  {period.length > 0 ? (
                    <>
                      {period.map((item, index) => (
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
                {period.length > 0 && (
                  <>
                    {period.map((item, index) => (
                      <div
                        key={index}
                        className='flex justify-between shadow rounded-lg border-2 w-full h-16'
                      >
                        <div className='flex flex-col justify-center items-center shadow'>
                          <img
                            src='./assets/arrow_up_icon.svg'
                            alt='arrow_up_icon'
                            className='h-8 w-8 cursor-pointer hover:scale-125'
                            onClick={() => changeOrder(index, index - 1, 'period')}
                          />
                          <img
                            src='./assets/arrow_down_icon.svg'
                            alt='arrow_down_icon'
                            className='h-8 w-8 cursor-pointer hover:scale-125'
                            onClick={() => changeOrder(index, index + 1, 'period')}
                          />
                        </div>
                        <div className='flex justify-center items-center'>
                          {editIndex === index && editIndexName === 'period' ? (
                            <input
                              type='text'
                              defaultValue={item.name}
                              ref={inputPeriodRef}
                            ></input>
                          ) : (
                            <span className='text-lg'>{item.name}</span>
                          )}
                        </div>
                        <div className='flex justify-center items-center gap-1 mr-2'>
                          {editIndex === index && editIndexName === 'period' ? (
                            <>
                              <img
                                src='./assets/check_icon.svg'
                                alt='check_icon'
                                className='h-6 w-6 cursor-pointer hover:scale-125'
                                onClick={() => handleSaveItem(index, 'period')}
                              />
                              <img
                                src='./assets/cancel_icon.svg'
                                alt='cancel_icon'
                                className='h-6 w-6 cursor-pointer hover:scale-125'
                                onClick={() => handleCancelEdit('period')}
                              />
                            </>
                          ) : (
                            <>
                              <img
                                src='./assets/edit_icon.svg'
                                alt='edit_icon'
                                className='h-6 w-6 cursor-pointer hover:scale-125'
                                onClick={() => handleEditItem(index, 'period')}
                              />
                              <img
                                src='./assets/trash2_icon.svg'
                                alt='trash_icon'
                                className='h-6 w-6 cursor-pointer hover:scale-125'
                                onClick={() => handleDeleteTypeItem(item.id, 'period')}
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
                  onClick={() => handleAddingElement('period')}
                >
                  <img src='./assets/plus_icon.svg' alt='plus_icon' className='h-8 w-8 ' />
                  <span className='hover:text-contrastColor'>{t('admin.content.add_element')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-center items-center'>
        <button
          className='w-32 capitalize bg-blue-600 leading-6 p-2 shadow-lg text-white font-medium rounded-lg'
          onClick={() => saveAllChanges()}
        >
          {t('admin.content.save_changes')}
        </button>
      </div>
    </>
  );
}

export default PlaceVariableManagementSection;
