import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import counterReducer from './features/counterSlice';
import activeAdminReducer from './features/adminSlices';
import spinnerReducer from './features/spinnerSlice';
import notificationReducer from './features/notificationSlice';


const rootReducer = combineReducers({
  counter: counterReducer,
  activeAdmin: activeAdminReducer,
  spinner: spinnerReducer,
  notifications: notificationReducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['counter', 'activeAdmin'] // only counter will be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store); 