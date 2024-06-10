import bg from "../../../assets/bgLogin.png";
import {useForm} from "react-hook-form";
import axios from '../../../plugins/axios'
import {forwardRef, useEffect, useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
    Snackbar
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import {useSelector} from "react-redux";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Register = () => {
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
        }
    });

    const isLogin = useSelector(state => state.statusLogin.token);
    useEffect(() => {
        console.log(isLogin)

        if(isLogin){
            navigate("/")
        }
    }, [])

    const onSubmit = (data) => {
        axios.post('/patient-registration', data).then((response) => {
            setDialog(true)
        }).catch(() => {
            setSnackbar(true)
        })
    };

    const [snackbar, setSnackbar] = useState(false);

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar(false);
    };
    const [dialog, setDialog] = useState(false);

    const handleCloseDialog = () => {
        setDialog(false);
        navigate("/login")
    }

    return (
        <main>
            <div className={"row"} style={{width: "100%", height: "860px"}}>
                <div className={"col-6"}>
                    <img src={bg} style={{width:"100%", height: "100%"}} alt='...'/>
                </div>
                <div className={"col-6"} style={{overflowY: "scroll", height: "100%"}}>
                    <form className="Auth-form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="Auth-form-content" >
                            <h3 className="Auth-form-title">Đăng ký</h3>
                            <div className="mb-3">
                                <label className="form-label">Số điện thoại *</label>
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
                                <label className="form-label">Họ và tên *</label>
                                <input
                                    className={errors.name ? 'form-control is-invalid' : 'form-control'}
                                    {...register("name", {required: 'Họ và tên là bắt buộc!'})}
                                />
                                <p style={{color: "red"}}>{errors.name?.message}</p>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Email *</label>
                                <input className={errors.email ? 'form-control is-invalid' : 'form-control'}
                                       {...register("email", {
                                           required: 'Email là bắt buộc!',
                                           pattern: {
                                               value: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
                                               message: "Email không hợp lệ!"
                                           },
                                       })}
                                />
                                <p style={{color: "red"}}>{errors.email?.message}</p>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Mật khẩu *</label>
                                <input type="password"
                                       className={errors.password ? 'form-control is-invalid' : 'form-control'}
                                       {...register("password", {
                                           required: 'Mật khẩu là bắt buộc!',
                                       })}
                                />
                                <p style={{color: "red"}}>{errors.password?.message}</p>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Địa chỉ *</label>
                                <input
                                    className={errors.address ? 'form-control is-invalid' : 'form-control'}
                                    {...register("address", {required: 'Địa chỉ là bắt buộc!'})}
                                />
                                <p style={{color: "red"}}>{errors.address?.message}</p>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Ngày sinh *</label>
                                <input type="date"
                                       className={errors.date ? 'form-control is-invalid' : 'form-control'}
                                       {...register("date", {required: 'Ngày sinh là bắt buộc!'})}
                                />
                                <p style={{color: "red"}}>{errors.date?.message}</p>
                            </div>
                            <div className="mb-4">
                                <p className="form-label mb-3">Giới tính *</p>
                                <input type="radio"
                                       className={errors.sex ? 'form-check-input is-invalid' : 'form-check-input'}
                                       {...register("sex", {required: 'Giới tính là bắt buộc!'})}
                                       value="1"
                                />
                                <label className="form-check-label"
                                       style={{marginLeft: "10px", marginRight: "100px"}}>Nam</label>

                                <input type="radio"
                                       className={errors.sex ? 'form-check-input is-invalid' : 'form-check-input'}
                                       {...register("sex", {required: 'Giới tính là bắt buộc!'})}
                                       value="0"
                                />
                                <label className="form-check-label" style={{marginLeft: "10px"}}>Nữ</label>
                                <p style={{color: "red"}}>{errors.sex?.message}</p>
                            </div>
                            <div className="d-grid gap-2 mt-3">
                                <button type="submit" className="btn btn-primary">
                                    Đăng ký
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Dialog
                open={dialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseDialog}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Bệnh viện "}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Bạn đã đăng ký thành công.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Xác nhận</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={snackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    Số điện thoại đã tồn tại
                </Alert>
            </Snackbar>
        </main>
    )
}

export default Register;