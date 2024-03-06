import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  name: '',
  sortof: 'all',
  type: 'all',
  period: 'all',
  filterItems: [],
  allItems: [],
  loading: false,
  filterItemsLength: 0
};

export const allMapPlacesSlice = createSlice({
  name: 'allMapPlaces',
  initialState,
  reducers: {
    filterPlaces: (state, action) => {
      const { name, sortof, type, period } = action.payload;

      state.name = name;
      state.sortof = sortof;
      state.type = type;
      state.period = period;

      if (name === '' && sortof === 'all' && type === 'all' && period === 'all') {
        state.filterItems = state.allItems;
      } else {
        state.filterItems = state.allItems.filter((item) => {
          const itemName = item.place_name ? item.place_name.toLowerCase() : '';
          const filterName = name ? name.toLowerCase() : '';

          return (
            (name === '' || itemName.includes(filterName)) &&
            (sortof === 'all' || item.sortof === sortof) &&
            (type === 'all' || item.type === type) &&
            (period === 'all' || item.period === period)
          );
        });
      }

      state.filterItemsLength = state.filterItems.length
    },
    deletePlace: (state, action) => {
      const placeId = action.payload;
      state.filterItems = state.filterItems.filter((place) => place.id !== placeId);
    },
    fetchMapPlacesStart: (state) => {
      state.loading = true;
    },
    fetchMapPlacesSuccess: (state, action) => {
      state.allItems = action.payload;
      state.filterItems = action.payload;
      state.loading = false;
    },
    fetchMapPlacesFailure: (state) => {
      state.loading = false;
    },
  },
});

export const fetchMapPlaces = () => async (dispatch) => {
  dispatch(allMapPlacesSlice.actions.fetchMapPlacesStart());

  try {
    const response = await axios.get('http://localhost:8000/memo_places/short_places/');
    dispatch(allMapPlacesSlice.actions.fetchMapPlacesSuccess(response.data));
  } catch (error) {
    dispatch(allMapPlacesSlice.actions.fetchMapPlacesFailure());
  }
};

export const { filterPlaces, deletePlace } = allMapPlacesSlice.actions;

export default allMapPlacesSlice.reducer;
