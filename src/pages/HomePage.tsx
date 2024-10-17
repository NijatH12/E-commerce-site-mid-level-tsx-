import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productType, UserType } from "../types/Types";
import { setCurrentUser, setLoading, setProducts } from "../redux/AppSlice";
import { toast } from "react-toastify";
import productService from "../services/productService";
import { RootState } from "../redux/store";
import ProductCard from "../components/productCard";
import "../css/home.css";
import Category from "../components/Category";

function HomePage() {
  const dispatch = useDispatch();
  const { products } = useSelector((state: RootState) => state.app);
 
  const getAllProducts = async () => {
    try {
      dispatch(setLoading(true));
      const response: productType[] = await productService.getAllProducts();
      if (response) {
        dispatch(setProducts(response));
      }
    } catch (error: any) {
      toast.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    const result = localStorage.getItem("currentUser");
    if (result) {
      const currentUser: UserType = JSON.parse(result) as UserType;
      dispatch(setCurrentUser(currentUser));
    }
  }, []);
  return (
    <div style={{ display: "flex", alignItems: "start" }}>
      <Category />
      <div className="cards">
        {products &&
          products.map((product: productType, index: number) => (
            <ProductCard key={index} product={product} />
          ))}
      </div>
    </div>
  );
}

export default HomePage;
