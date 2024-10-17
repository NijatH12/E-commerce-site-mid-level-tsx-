import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { productType } from "../types/Types";

export interface basketSliceType {
  basket: productType[];
  totalAmount:number
}
const initialState: basketSliceType = {
  basket: [],
  totalAmount:0
};
export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasket: (
      state: basketSliceType,
      action: PayloadAction<productType[]>
    ) => {
      state.basket = [...action.payload];
    },
   
    addProductToBasket: (
      state: basketSliceType,
      action: PayloadAction<productType>
    ) => {
      if (state.basket.length == 0) {
        state.basket = [action.payload];
      } else {
        const findProduct = state.basket.find(
          (product: productType) => product.id == action.payload.id
        );
        if (findProduct) {
          findProduct.count = findProduct.count + action.payload.count;
          state.basket = [
            ...state.basket.map((product: productType) =>
              findProduct.id == product.id ? findProduct : product
            ),
          ];
        } else {
          state.basket = [...state.basket, action.payload];
        }
      }

      localStorage.setItem("basket", JSON.stringify(state.basket));
  
    },
    calculateBAsket:(state:basketSliceType)=>{
      let totalAmount:number=0
      state.basket&&state.basket.map((product:productType)=>(
        totalAmount+=product.price*product.count
      ))
      state.totalAmount=totalAmount
    },
    removeProductFromBasket:(state:basketSliceType,action:PayloadAction<number>)=>{
state.basket=[...state.basket.filter((product:productType)=>product.id!=action.payload)]
localStorage.setItem("basket",JSON.stringify(state.basket))
    }
  },
});

export const { setBasket, addProductToBasket,calculateBAsket,removeProductFromBasket } = basketSlice.actions;

export default basketSlice.reducer;
