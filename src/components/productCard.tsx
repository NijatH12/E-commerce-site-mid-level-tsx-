import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { productType } from "../types/Types";
import "../css/home.css";
import { useNavigate } from "react-router-dom";
export interface Productcardprops {
  product: productType;
}

function productCard(props: Productcardprops) {
  const { id, title, price, description, category, image, rating } =
    props.product;
  const navigate = useNavigate();
  return (
    <Card className="card">
      <img src={image} width={230} height={230} alt="" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title.substring(0, 18)}
        </Typography>
        <Typography
          className="typ"
          height={70}
          variant="body2"
          sx={{ color: "text.secondary" }}
        >
          {description.substring(0, 100)}
        </Typography>
        <Typography style={{ marginTop: 20, fontSize: 20, color: "brown" }}>
          ${price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => navigate("product-detail/" + id)}
          size="small"
          variant="outlined"
          color="info"
        >
          About
        </Button>
      </CardActions>
    </Card>
  );
}

export default productCard;
