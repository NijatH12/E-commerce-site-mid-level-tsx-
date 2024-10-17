import axios, { AxiosResponse } from "axios";
import { productType } from "../types/Types";
export const BASE_URL = "https://fakestoreapi.com";
class productService {
  getAllProducts(): Promise<productType[]> {
    return new Promise((resolve: any, reject: any) => {
      axios
        .get(`${BASE_URL}/products`)
        .then((response: AxiosResponse<any, any>) => resolve(response.data))
        .catch((error: any) => reject(error));
    });
  }
  getProductById(productId: number):Promise<productType> {
    return new Promise((resolve: any, reject: any) => {
      axios
        .get(`${BASE_URL}/products/${productId}`)
        .then((response: AxiosResponse<any, any>) => resolve(response.data))
        .catch((error: any) => reject(error));
    });
  }
}

export default new productService();
