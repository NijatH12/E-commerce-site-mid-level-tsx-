import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "./productService";
import { productType } from "../types/Types";

class CategoryService {
  getAllcategories(): Promise<string[]> {
    return new Promise((resolve: any, reject: any) => {
      axios
        .get(`${BASE_URL}/products/categories`)
        .then((response: AxiosResponse<any, any>) => {
          resolve(response.data);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
  getProductByCategoriesName(categoryName:string):Promise <productType[]>{
    return new Promise((resolve: any, reject: any) => {
      axios
        .get(`${BASE_URL}/products/category/${categoryName}`)
        .then((response: AxiosResponse<any, any>) => {
          resolve(response.data);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
}
export default new CategoryService();
