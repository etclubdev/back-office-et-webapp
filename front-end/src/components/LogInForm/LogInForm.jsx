import React from 'react';
import './LogInForm.css';

import { noTextLogo } from '../../assets/images/logos';
import { faEye, faEyeSlash, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { LogInSchema } from '../../schemas/LogInSchema';


export const LogInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(LogInSchema)
  })

  const { register, handleSubmit, formState: { errors } } = form

  const onSubmit = (data) => {
    try {
      console.log(data);
      //Using Axios
      //Token storage
      //Navigation
    } catch (error) {
      setErrorMessage("Thông tin đăng nhập không chính xác");
    }
  }

  return (
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
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="log-in-form-control">
          <label htmlFor="username">Tên đăng nhập</label>
          <input type="text" id="username" {...register("username")} />
          {errors.username?.message && <p className="log-in-error">{errors.username.message}</p>}
        </div>
        <div className="log-in-form-control">
          <label htmlFor="password">Mật khẩu</label>
          <div className="password-input">
            <input type={showPassword ? "text" : "password"} id="password" {...register("password")} />
            <FontAwesomeIcon onClick={() => setShowPassword((prevState) => !prevState)} className='password-eye' icon={showPassword ? faEye : faEyeSlash} />
          </div>
          {errors.password?.message && <p className='log-in-error'>{errors.password?.message}</p>}
          {errorMessage !== "" && <p className='log-in-error'><FontAwesomeIcon icon={faCircleExclamation}/>{" " + errorMessage}</p>}
        </div>
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  )
}
