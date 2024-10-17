import { useState } from "react";
import "../css/register.css";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { FaCircleUser } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
import { Button } from "@mui/material";
import { RiEyeCloseFill } from "react-icons/ri";
import { RxEyeOpen } from "react-icons/rx";
import { useFormik } from "formik";
import { RegisterSchema } from "../schema/RegistersSchema";
import loginPageService from "../services/LoginPageService";
import "../css/login.css";
import { useDispatch } from "react-redux";
import { setCurrentUser, setLoading } from "../redux/AppSlice";
import { UserType } from "../types/Types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface checkUserType {
  result: boolean;
  CurrentUser: UserType | null;
}

function LoginPage() {
  const dispatch = useDispatch();
  const checkUser = (
    userList: UserType[],
    username: string,
    password: string
  ): checkUserType => {
    const response: checkUserType = { result: false, CurrentUser: null };
    userList.forEach((user: UserType) => {
      if (user.username == username && user.password == password) {
        response.result = true;
        response.CurrentUser = user;
      }
    });
    return response;
  };

  const navigate = useNavigate();

  const submit = async (values: any) => {
    try {
      dispatch(setLoading(true));
      const response: UserType[] = await loginPageService.login();
      if (response) {
        const checkUserResponse: checkUserType = checkUser(
          response,
          values.username,
          values.password
        );
        if (checkUserResponse.result && checkUserResponse.CurrentUser) {
          dispatch(setCurrentUser(checkUserResponse.CurrentUser));
          navigate("/");
          localStorage.setItem(
            "currentUser",
            JSON.stringify(checkUserResponse.CurrentUser)
          );
        } else {
          toast.error("Username or Password wrong");
        }
      }
    } catch (error) {
      toast.error("Error");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const [eye, setEye] = useState(false);
  const { errors, values, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: submit,
    validationSchema: RegisterSchema,
  });

  const clear = () => {
    resetForm();
  };
  return (
    <div className="login">
      <form onSubmit={handleSubmit} className="form" action="">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "20px",
            gap: "30px",
          }}
        >
          <TextField
            id="username"
            placeholder="Username"
            value={values.username}
            helperText={
              errors.username && (
                <span style={{ color: "red", fontSize: "15px" }}>
                  {errors.username}
                </span>
              )
            }
            onChange={handleChange}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <FaCircleUser />
                  </InputAdornment>
                ),
              },
            }}
            variant="standard"
          />

          <TextField
            id="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Password"
            helperText={
              errors.password && (
                <span style={{ color: "red", fontSize: "15px" }}>
                  {errors.password}
                </span>
              )
            }
            type={eye ? "text" : "password"}
            sx={{ width: "300px" }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <FaLock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="start">
                    {eye ? (
                      <RxEyeOpen className="eye" onClick={() => setEye(!eye)} />
                    ) : (
                      <RiEyeCloseFill
                        className="eye"
                        onClick={() => setEye(!eye)}
                      />
                    )}
                  </InputAdornment>
                ),
              },
            }}
            variant="standard"
          />
        </div>

        <div>
          <Button
            type="submit"
            sx={{ textTransform: "none", fontSize: "16px" }}
            color="info"
          >
            Sign in
          </Button>
          <Button
            sx={{ textTransform: "none", color: "#d9031d", fontSize: "16px" }}
            onClick={clear}
          >
            Clear
          </Button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
