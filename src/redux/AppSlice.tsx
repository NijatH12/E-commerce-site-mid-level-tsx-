import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { productType, UserType } from "../types/Types";

export interface AppSliceType {
  currentUser: UserType | null;
  loading: boolean;
  drawer: boolean;
  products: productType[];
}

const initialState: AppSliceType = {
  currentUser: null,
  loading: false,
  drawer: false,
  products: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoading: (state: AppSliceType, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    balance: (state: AppSliceType, action: PayloadAction<number>) => {
      if (state.currentUser?.balance) {
        state.currentUser.balance = state.currentUser.balance - action.payload;
        localStorage.setItem("currentUser",JSON.stringify(state.currentUser))
      }
    },
    setDrawer: (state: AppSliceType, action: PayloadAction<boolean>) => {
      state.drawer = action.payload;
    },
    setCurrentUser: (
      state: AppSliceType,
      action: PayloadAction<UserType | null>
    ) => {
      state.currentUser = action.payload;
    },
    setProducts: (
      state: AppSliceType,
      action: PayloadAction<productType[]>
    ) => {
      state.products = action.payload;
    },
    filterProducts: (state: AppSliceType, action: PayloadAction<string>) => {
      const templist: productType[] = [];
      state.products.map((product: productType) => {
        if (
          product.title.toLowerCase().includes(action.payload.toLowerCase())
        ) {
          templist.push(product);
        }
      });
      state.products = [...templist];
    },
  },
});

export const {
  setLoading,
  setCurrentUser,
  setProducts,
  filterProducts,
  setDrawer,
  balance,
} = appSlice.actions;

export default appSlice.reducer;
