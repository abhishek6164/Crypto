import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  assets: [],
};

const cryptoReducer = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updatePrices: (state, action) => {
      const updatedAssets = state.assets.map((coin) =>
        coin.id === action.payload.id ? { ...coin, ...action.payload } : coin
      );

      if (!updatedAssets.find((coin) => coin.id === action.payload.id)) {
        updatedAssets.push(action.payload);
      }

      state.assets = updatedAssets;
    },
  },
});

export const { updatePrices } = cryptoReducer.actions;
export default cryptoReducer.reducer;
