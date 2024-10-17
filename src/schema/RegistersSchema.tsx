import * as yup from "yup";

export const RegisterSchema = yup.object().shape({
  username: yup.string().required("Write username"),
  password: yup.string().required("Write password"),
});
