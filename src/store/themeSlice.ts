import type { Theme } from "@/lib/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialValue = {
  initialTheme: (localStorage.getItem("theme") as Theme) || "light",
  itemCount: 0 as number,
};

const themeSlice = createSlice({
  name: "theme",
  initialState: initialValue,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.initialTheme = action.payload;
      localStorage.setItem("theme", action.payload as Theme);
    },
    incrementItemCount: (state) => {
      if (state.itemCount < 20) {
        state.itemCount += 1;
      }
    },
    decrementItemCount: (state) => {
      if (state.itemCount > 0) state.itemCount -= 1;
    },
    setItemCount: (state, action: PayloadAction<number>) => {
      state.itemCount = Math.min(action.payload, 20); // ensure it never exceeds 99
    },
  },
});

export const {
  setTheme,
  setItemCount,
  incrementItemCount,
  decrementItemCount,
} = themeSlice.actions;
export default themeSlice.reducer;
