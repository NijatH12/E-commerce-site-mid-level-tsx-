import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useEffect, useState } from "react";
import categoryService from "../services/CategoryService";
import { useDispatch } from "react-redux";
import { setLoading, setProducts } from "../redux/AppSlice";
import { toast } from "react-toastify";
import { productType } from "../types/Types";
import productService from "../services/productService";


function Category() {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState<string[]>();
  const getAllCategories = async () => {
    try {
      dispatch(setLoading(true));
      const categories: string[] = await categoryService.getAllcategories();
      setCategories(categories);
    } catch (error) {
      toast.error("Couldn't find categories" + error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  const [selected, setSelected] = useState<string | null>(null);

  const handleCategory = async (
    e: React.ChangeEvent<HTMLInputElement>,
    categoryName: string
  ) => {
    try {
      dispatch(setLoading(false));
      if (e.target.checked) {
        setSelected(categoryName);
        const products: productType[] =
          await categoryService.getProductByCategoriesName(categoryName);
        dispatch(setProducts(products));
      } else {
        setSelected(null);
        const products: productType[] = await productService.getAllProducts();
        dispatch(setProducts(products));
      }
    } catch (error) {
      toast.error("Something is a wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);
  <FormControlLabel control={<Checkbox />} label="Label" />;
  return (
    <FormGroup
      sx={{
        margin: "0 30px",
        boxShadow: "1px 3px 4px lightgrey",
        padding: "10px 20px",
      }}
    >
      {categories &&
        categories.map((category: string, index: number) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={selected === category}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleCategory(e, category)
                }
              />
            }
            label={category}
          />
        ))}
    </FormGroup>
  );
}

export default Category;
