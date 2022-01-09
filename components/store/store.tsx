import { configureStore } from "@reduxjs/toolkit";

import { boxDrawerSlice } from "./boxDrawerSlice";
import { counterSlice } from "./counterSlice";
import { fileUploaderSlice } from "./fileUploaderSlice";
export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    fileUploader: fileUploaderSlice.reducer,
    boxDrawer: boxDrawerSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["fileUploader/setImage"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
