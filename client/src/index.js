import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import authReducer from "./state";
import { configureStore } from "@reduxjs/toolkit";   //takes in a single object and and returned fully configured redux store
import { Provider } from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig";

const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, authReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const msalInstance = new PublicClientApplication(msalConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  <MsalProvider instance={msalInstance}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
    </MsalProvider>
  </React.StrictMode>
);








// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import authReducer from "./state";
// import {configureStore} from "@reduxjs/toolkit";  //takes in a single object and and returned fully configured redux store
// import {Provider} from "react-redux"; //lets every component the access to redux store
// import {
//   persistStore,  //create persistent version of redux store
//   persistReducer,   //create a new reducer
//   FLUSH,          //all queued actions should be flushed immediately
//   REHYDRATE,     //persisted state is loaded back into the store
//   PAUSE,         //persistence process should be paused
//   PERSIST,         //persistence process should start
//   PURGE,           //persistence process should be deleted
//   REGISTER         //persistence process should be registered
// } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import { PersistGate } from "redux-persist/integration/react";
//
// const persistConfig = { key: "root", storage, version: 1 };
// const persistedReducer = persistReducer(persistConfig, authReducer);
// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//    getDefaultMiddleware({
//      serializableCheck: {
//        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//      },
//    }),
// });
//
//
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//    <Provider store={store}>
//      <PersistGate loading={null} persistor={persistStore(store)}>
//           <App />
//      </PersistGate>
//    </Provider>
//
//   </React.StrictMode>
// );
