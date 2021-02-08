import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import countriesSliceReducer from './countries/countries';


export default configureStore({
  reducer: {
    countries: countriesSliceReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false
  })
});
