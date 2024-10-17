import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import logo from "../images/logo.webp";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  filterProducts,
  setCurrentUser,
  setDrawer,
  setProducts,
} from "../redux/AppSlice";
import { toast } from "react-toastify";
import productService from "../services/productService";
import { productType } from "../types/Types";
import { CiShoppingBasket } from "react-icons/ci";
import Badge from "@mui/material/Badge";
import { RootState } from "../redux/store";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = () => {
    localStorage.removeItem("currentUser");
    dispatch(setCurrentUser(null));
    navigate("/login");
    toast.success("Exited");
  };
  const handleFilter = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.value) {
        dispatch(filterProducts(e.target.value));
      } else {
        const products: productType[] = await productService.getAllProducts();
        dispatch(setProducts(products));
      }
    } catch (error) {
      toast.error("Wrong");
    }
  };
  const { currentUser } = useSelector((state: RootState) => state.app);
  const { basket } = useSelector((state: RootState) => state.basket);
  const openDrawer = () => {
    dispatch(setDrawer(true));
  };

  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: "#8CD0DB", marginBottom: "40px" }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => navigate("/")}
          >
            <img src={logo} alt="" width={40} height={40} />
          </IconButton>
          <Typography
            onClick={() => navigate("/")}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
          >
            E-commerce
          </Typography>
        </div>
        {currentUser ? (
          <p style={{ fontFamily: "arial", fontSize: "22px" }}>
            Your balance: $ {currentUser?.balance.toFixed(2)}
          </p>
        ) : undefined}
        {currentUser ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              maxHeight: "20px",
            }}
          >
            <TextField
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleFilter(e)
              }
              inputProps={{
                style: {
                  height: "25px",
                },
              }}
              id="outlined-basic"
              label="Search"
              variant="standard"
              InputLabelProps={{
                style: { color: "#fff" },
              }}
            />
            <Badge
              onClick={openDrawer}
              badgeContent={basket.length}
              color="warning"
            >
              <CiShoppingBasket
                className="same"
                style={{ cursor: "pointer" }}
              />
            </Badge>

            <Button onClick={logout} color="inherit">
              Exit
            </Button>
          </div>
        ) : undefined}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
