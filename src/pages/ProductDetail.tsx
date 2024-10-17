import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setLoading } from "../redux/AppSlice";
import { toast } from "react-toastify";
import Container from "@mui/material/Container";
import productService from "../services/productService";
import { productType } from "../types/Types";
import { Button } from "@mui/material";
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { addProductToBasket } from "../redux/basketSlice";
function ProductDetail() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState<productType | null>(null);
  const [count, setCount] = useState(1);
  const getProductById = async (productId: number) => {
    try {
      dispatch(setLoading(true));
      const product: productType = await productService.getProductById(
        productId
      );

      setProduct(product);
    } catch (error) {
      toast.error("Wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getProductById(Number(productId));
  }, []);

  const addBasket = () => {
    if (product) {
      const payload: productType = {
        ...product,
        count: count,
      };
      dispatch(addProductToBasket(payload));
      toast.success("Product added to basket");
      setCount(1);
    }
  };

  return (
    <Container>
      <div
        style={{
          display: "flex",
          gap: "50px",
          alignItems: "center",
          marginTop: "60px",
          boxShadow: "1px 3px 4px lightgrey",
          padding: "30px",
        }}
      >
        <div>
          <img
            width={400}
            height={400}
            style={{ display: "block" }}
            src={product?.image}
            alt=""
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            marginTop: "20px",
          }}
        >
          <h2 style={{ fontSize: "25px" }}>{product?.title}</h2>
          <p style={{ fontSize: "20px" }}>{product?.description}</p>
          <p style={{ fontFamily: "arial", fontSize: "25px", color: "brown" }}>
            ${product?.price}
          </p>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <span className="same">
                <CiCircleMinus onClick={() => setCount(count - 1)} />
              </span>
              <span className="same">{count >= 1 ? count : 1}</span>
              <span>
                <CiCirclePlus
                  className="same"
                  onClick={() => setCount(count + 1)}
                />
              </span>
            </div>
            <div>
              <Button
                onClick={addBasket}
                sx={{ textTransform: "capitalize" }}
                color="info"
                variant="contained"
              >
                Add Basket
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ProductDetail;
