import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  name: '',
  type: 0,
  period: 0,
  filterItems: [],
  allItems: [],
  loading: false,
  filterItemsLength: 0,
};

export const allMapTrailsSlice = createSlice({
  name: 'allMapTrails',
  initialState,
  reducers: {
    filterTrails: (state, action) => {
      const { name, type, period } = action.payload;

      state.name = name;
      state.type = type;
      state.period = period;

      if (name === '' && type === 0 && period === 0) {
        state.filterItems = state.allItems;
      } else {
        state.filterItems = state.allItems.filter((item) => {
          const itemName = item.path_name ? item.path_name.toLowerCase() : '';
          const filterName = name ? name.toLowerCase() : '';

          return (
            (name === '' || itemName.includes(filterName)) &&
            (type === 0 || item.type === type) &&
            (period === 0 || item.period === period)
          );
        });
      }

      state.filterItemsLength = state.filterItems.length;
    },
    addTrail: (state, action) => {
      state.filterItems = state.filterItems.concat(action.payload);
    },
    deleteTrail: (state, action) => {
      const trailId = action.payload;
      state.filterItems = state.filterItems.filter((trail) => trail.id !== trailId);
    },
    fetchMapTrailsStart: (state) => {
      state.loading = true;
    },
    fetchMapTrailsSuccess: (state, action) => {
      state.allItems = action.payload;
      state.filterItems = action.payload;
      state.loading = false;
    },
    fetchMapTrailsFailure: (state) => {
      state.loading = false;
    },
  },
});

export const fetchMapTrails = (userId) => async (dispatch) => {
  dispatch(allMapTrailsSlice.actions.fetchMapTrailsStart());
  const appPath = process.env.REACT_APP_URL_PATH;

  try {
    const response = await axios.get(`${appPath}/memo_places/short_path/`);
    const filteredTrails = response.data.filter(
      (item) => item.verified === true || item.user === userId,
    );

    dispatch(allMapTrailsSlice.actions.fetchMapTrailsSuccess(filteredTrails));
  } catch (error) {
    dispatch(allMapTrailsSlice.actions.fetchMapTrailsFailure());
  }
};

export const { filterTrails, deleteTrail, addTrail } = allMapTrailsSlice.actions;

export default allMapTrailsSlice.reducer;
