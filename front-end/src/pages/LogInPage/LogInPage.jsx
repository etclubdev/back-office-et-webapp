import React, { useState, useEffect } from "react";
import "./LogInPage.css"
import { loginUser } from "../../api/auth.service";
import { useAuth } from "../../context/useAuth";
import { useNavigate, Navigate,useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { logInSchema } from "../../schemas/logInSchema";
import { TextFieldController } from "../../components/TextFieldController";
import { PasswordController } from "../../components/PasswordController";
import { CircularLoading } from "../../components/CircularLoading";

import { noTextLogo } from '../../assets/images/logos';

export const LogInPage = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(logInSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  });

  const handleLogin = async (payload) => {
    const { username, password } = payload;
    setIsLoading(true);
    setServerError("");

    try {
      const token = await loginUser({ username, password });
      login(token);
      navigate('/');
    } catch (error) {
      console.error("Login failed:", error);
      setServerError("Đăng nhập thất bại. Vui lòng kiểm tra lại tài khoản hoặc mật khẩu.");
    } finally {
      setIsLoading(false);
    }
  };

  const username = watch("username");
  const password = watch("password");

  useEffect(() => {
    if (serverError && (username.length === 0 || password.length === 0)) {
      setServerError("");
    }
  }, [username, password, serverError]);

  const location = useLocation();

  if (user) {
    const from = location.state?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }

  return (
    <div className="log-in-page">
      <div className="top-gradient" />
      <div className="bottom-gradient" />
      <div className="log-in-form">
        <div className="log-in-form-item">
          <img className='log-in-logo' src={noTextLogo} alt="ET Club" />
          <p className="log-in-welcome">Chào mừng trở lại!</p>
          <div className="log-in-division">
            <div className="log-in-division-bar"></div>
            <div className="log-in-desc">Đăng nhập vào hệ thống quản lý website ET</div>
            <div className="log-in-division-bar"></div>
          </div>
        </div>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="form-input">
            <TextFieldController
              name="username"
              control={control}
              label="Tên tài khoản"
              errors={errors}
              required={false}
            />
            <PasswordController
              name="password"
              control={control}
              label="Mật khẩu"
              setValue={setValue}
              errors={errors}
            />
          </div>
          {serverError && <p className="log-in-error">{serverError}</p>}
          <button className="submit-button" type="submit" disabled={isSubmitting}>Đăng nhập</button>

        </form>
      </div>
      {isSubmitting && <CircularLoading />}
    </div>
  );
};

