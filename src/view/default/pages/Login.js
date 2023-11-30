import bg from "../../../assets/bgLogin.png";
import {forwardRef, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {statusLoginActions} from '../../../store/statusLoginSlice'
import {useForm} from "react-hook-form";
import MuiAlert from '@mui/material/Alert';
import axios from '../../../plugins/axios'
import jwt from "../../../plugins/jwt";
import {Snackbar} from "@mui/material";



const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [snackbar, setSnackbar] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbar(false);
    };

    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
        }
    });
    const onSubmit = (data) => {
        axios.post('/login', data).then((response) => {
            dispatch(statusLoginActions.login(response.data.user))
            for (var i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);

                if (key !== 'token' &&  key !== 'expire_time') {
                    localStorage.removeItem(key);
                }
            }
            jwt.saveToken(response.data.access_token, response.data.expires_in)

            if(response.data.user.role.role_name === "ADMIN"){
                navigate("/admin/manage-user")
            } else if(response.data.user.role.role_name === "COORDINATOR"){
                navigate("/coordinator")
            } else if(response.data.user.role.role_name === "TESTER"){
                navigate("/tester")
            } else if(response.data.user.role.role_name === "STAFF"){
                navigate("/staff")
            } else {
                navigate("/")
            }
        }).catch((e) => {
            setSnackbar(true);
        })
    };

    return (
        <main>
            <div className={"row"} style={{width: "100%", height: "860px"}}>
                <div className={"col-6"}>
                    <img src={bg} style={{width: "100%", height: "100%"}} alt='...'/>
                </div>
                <div className={"col-6"}>
                    <form className="Auth-form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="Auth-form-content" >
                            <h3 className="Auth-form-title">Đăng nhập</h3>
                            <div className="mb-3">
                                <label className="form-label">Số điện thoại </label>
                                <input type="number"
                                       className={errors.phone ? 'form-control is-invalid' : 'form-control'}
                                       {...register("phone", {
                                           required: 'Số điện thoại là bắt buộc!',
                                           minLength: {value: 10, message: "Số điện thoại gồm 10 chữ số"},
                                           maxLength: {value: 11, message: "Số điện thoại gồm 10-11 chữ số!"}
                                       })}
                                />
                                <p style={{color: "red"}}>{errors.phone?.message}</p>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Mật khẩu </label>
                                <input type="password"
                                       className={errors.password ? 'form-control is-invalid' : 'form-control'}
                                       {...register("password", {
                                           required: 'Mật khẩu là bắt buộc!',
                                       })}
                                />
                                <p style={{color: "red"}}>{errors.password?.message}</p>
                            </div>

                            <div className="d-grid gap-2 mt-3">
                                <button type="submit" className="btn btn-primary">
                                    Đăng nhập
                                </button>
                            </div>

                            <p className="mt-3">Chưa có tài khoản, <Link to={"/register"}>đăng ký ngay</Link></p>

                        </div>
                    </form>
                </div>
            </div>
            <Snackbar open={snackbar} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Thông tin đăng nhập không chính xác
                </Alert>
            </Snackbar>
        </main>
    )
}

export default Login;