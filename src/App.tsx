import { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Spinner from "./components/Spinner";
import RouterConfig from "./config/RouterConfig";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { productType, UserType } from "./types/Types";
import productService from "./services/productService";
import { useDispatch } from "react-redux";
import { setCurrentUser, setProducts } from "./redux/AppSlice";
import { setBasket } from "./redux/basketSlice";
import BasketDetail from "./pages/BasketDetail";

function App() {
  const dispatch = useDispatch();
  const getAllProducts = async () => {
    const products: productType[] = await productService.getAllProducts();
    dispatch(setProducts(products));
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    const basketString = localStorage.getItem("basket");
    if (basketString) {
      const basket: productType[] = JSON.parse(basketString) as productType[];
      dispatch(setBasket(basket));
    }
  }, []);
  useEffect(() => {
    const currentUserString: string | null =
      localStorage.getItem("currentUser");
    if (currentUserString) {
      const currentUser: UserType = JSON.parse(currentUserString) as UserType;
      dispatch(setCurrentUser(currentUser));
    }
  }, []);

  return (
    <>
      <Navbar />
      <RouterConfig />
      <ToastContainer autoClose={1500} />
      <Spinner />
      <BasketDetail />
    </>
  );
}

export default App;
