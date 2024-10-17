import { AxiosResponse } from "axios";
import instance from "../config/AxiosConfig";
import { UserType } from "../types/Types";

class LoginPageService {
  login():Promise<UserType[]> {
    return new Promise((resolve: any, reject: any) => {
      instance
        .get("/users")
        .then((response: AxiosResponse<any, any>) => resolve(response.data))
        .catch((error: any) => reject(error));
    });
  }
}

export default new LoginPageService();
