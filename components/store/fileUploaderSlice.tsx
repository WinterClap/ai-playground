import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type fileUploaderSliceStateType = {
  image: null | 0 | undefined | string;
};

const initialState: fileUploaderSliceStateType = {
  image: null,
};

export const fileUploaderSlice = createSlice({
  name: "fileUploader",
  initialState,
  reducers: {
    setImage: (state, action: PayloadAction<null | 0 | undefined | string>) => {
      state.image = action.payload;
    },
  },
});

export const { setImage } = fileUploaderSlice.actions;
