import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type boxDrawerSliceStateType = {
  indexHovered: number | null | undefined;
};
const initialState: boxDrawerSliceStateType = {
  indexHovered: null,
};
export const boxDrawerSlice = createSlice({
  name: "boxDrawer",
  initialState,
  reducers: {
    setIndexHovered: (state, action: PayloadAction<number | null | undefined>) => {
      state.indexHovered = action.payload;
    },
  },
});

export const { setIndexHovered } = boxDrawerSlice.actions;
