import React from 'react';
import './UnauthorizedPage.css';
import { Link } from 'react-router-dom';
import { error403 } from '../../assets/images/errors';
import { Button } from '@mui/material';

export const UnauthorizedPage = () => {
  return (
    <div className="unauthorized-page">
        <img src={error403} alt="401 Error" />
        <div className="content">
            <p className="error">LỖI 401 - KHÔNG CÓ QUYỀN TRUY CẬP</p>
            <p className="error-desc">Bạn đã đăng nhập, nhưng không có quyền truy cập vào nội dung này. Nếu bạn cho rằng đây là lỗi, vui lòng liên hệ bộ phận hỗ trợ.</p>
        </div>
        <Button className="button" variant='outlined' color="#252F40">
            <Link to="/" style={{textDecoration: "none", color: "#000"}}>Quay về trang chủ </Link>
        </Button>
    </div>
  )
}
