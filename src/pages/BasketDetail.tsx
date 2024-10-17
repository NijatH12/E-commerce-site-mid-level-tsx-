import Drawer from "@mui/material/Drawer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { balance, setDrawer } from "../redux/AppSlice";
import { productType } from "../types/Types";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import {
  calculateBAsket,
  removeProductFromBasket,
  setBasket,
} from "../redux/basketSlice";
import { toast } from "react-toastify";

function BasketDetail() {
  const { drawer, currentUser } = useSelector((state: RootState) => state.app);
  const { basket, totalAmount } = useSelector(
    (state: RootState) => state.basket
  );
  const dispatch = useDispatch();
  const closeDrawer = () => {
    dispatch(setDrawer(false));
  };

  useEffect(() => {
    dispatch(calculateBAsket());
  }, [basket]);
  const removeProduct = (productId: number) => {
    dispatch(removeProductFromBasket(productId));
  };
  const buyProduct = () => {
    if (currentUser?.balance && currentUser.balance < totalAmount) {
      toast.warn("You don't have enough money. Check your balance");
      return;
    }
    dispatch(setBasket([]));
    localStorage.removeItem("basket");
    toast.success("You bought.Thank you for a shopping");
    dispatch(balance(totalAmount))
  };
  return (
    <>
      <Drawer anchor="right" onClose={closeDrawer} open={drawer}>
        {basket &&
          basket.map((product: productType) => (
            <div key={product.id} style={{ padding: "20px" }}>
              <div
                style={{
                  padding: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "25px",
                  boxShadow: "1px 3px 4px lightgrey",
                }}
              >
                <div>
                  {
                    <img
                      style={{ width: "60px", height: "60px" }}
                      src={product.image}
                      alt=""
                    />
                  }
                </div>
                <div style={{ width: "200px" }}>
                  <h3>{product.title.substring(0, 20)}..</h3>
                </div>
                <div style={{ width: "10px" }}>
                  <p>{product.count}</p>
                </div>
                <div style={{ fontFamily: "arial", maxWidth: "40px" }}>
                  ${product.price}
                </div>
                <Button
                  sx={{ width: "50px", marginLeft: "10px" }}
                  onClick={() => removeProduct(product.id)}
                  size="small"
                  variant="outlined"
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        <h3
          style={{
            display: "flex",
            justifyContent: "end",
            paddingRight: "20px",
            fontFamily: "arial",
          }}
        >
          Amount: ${totalAmount.toFixed(2)}
        </h3>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          {basket.length ? (
            <Button
              onClick={buyProduct}
              size="small"
              sx={{ width: "100px" }}
              variant="contained"
            >
              Buy
            </Button>
          ) : undefined}
        </div>
      </Drawer>
    </>
  );
}

export default BasketDetail;
