import {Link, useNavigate, useParams} from "react-router-dom";
import axios from '../../../plugins/axios'
import {forwardRef, useEffect, useState} from "react";
import {
    Box, Button, Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select, Slide, Snackbar
} from "@mui/material";
import {useForm} from "react-hook-form";
import moment from "moment";
import MuiAlert from "@mui/material/Alert";


const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const TransitionDialog = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const StaffRegisDetail = () => {
    const params = useParams();
    const [data, setData] = useState({});
    const [service, setService] = useState([]);
    const [snackbar, setSnackbar] = useState(false);
    const [price, setPrice] = useState(0)


    const getData = () => {
        axios.get('/hospital/get-detail-registration/' + params.id).then((response) => {
            let res = response.data
            res.created_at = moment(response.data.created_at).format('YYYY-MM-DD')
            setData(res)
        })
    }

    useEffect(() => {
        getData();
        axios.get('/get-all-service').then((response) => {
            setService(response.data.list_service)
        })
    }, [])

    const openDialog2 = () => {
        setDialog2(true)
    }
    const [dialog2, setDialog2] = useState(false);

    const handleCloseDialog2 = () => {
        setDialog2(false);
    }
    const {
        register: register2,
        formState: {errors: errors2},
        handleSubmit: handleSubmit2,
    } = useForm({
        mode: "onBlur",
    });

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar(false);
    };

    const regisService = (data) => {
        axios.post('/hospital/staff/create-registration-service', data).then((response) => {
            setDialog2(false)
            setDialog1(true)
        })
    };

    const [dialog1, setDialog1] = useState(false);

    const navigate = useNavigate();
    const refuseRegistration = () => {
        axios.get('/hospital/staff/refuseRegistration/' + params.id)
            .then(res => {
                setSnackbar(true)
                setTimeout(() => navigate("/staff"), 2500)
            })
    }
    const handleCloseDialog1 = () => {
        setDialog1(false);
        navigate("/staff")
    }

    return (
        <div className="box">
            <div className="mb-3 hstack gap-3">
                <button className="btn btn-primary ms-auto" onClick={openDialog2}>Đăng ký chỉ định</button>
                <button className="btn btn-danger" onClick={refuseRegistration}>Từ chối đơn đăng ký</button>
                <Link to="/staff">
                    <button className="btn btn-secondary">Trở về</button>
                </Link>
            </div>
            <h5>Thông tin bệnh nhân:</h5>
            <div className="row">
                <div className="col-6">
                    <div className="mb-3">
                        <label className="form-label">Số điện thoại</label>
                        <input type="number"
                               disabled
                               className='form-control'
                               value={data.user_phone}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email"
                               disabled
                               className='form-control'
                               value={data.user_email}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Ngày dự kiến lấy mẫu</label>
                        <input type="date"
                               disabled
                               className='form-control'
                               value={data.date_appointment}
                        />
                    </div>
                </div>
                <div className="col-6">
                    <div className="mb-3">
                        <label className="form-label">Họ và tên</label>
                        <input
                            disabled
                            className='form-control'
                            value={data.user_name}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Ngày sinh</label>
                        <input type="date"
                               disabled
                               className='form-control'
                               value={data.user_date}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Giới tính</label>
                        <input disabled
                               value={data.sex == 1 ? "Nam" : "Nữ"}
                               className="form-control"
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <div className="mb-3">
                        <label className="form-label">Địa điểm lấy mẫu xét nghiệm</label>
                        <textarea
                            disabled
                            className='form-control'
                            value={data.address_appointment}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Ngày khởi tạo</label>
                        <input type="date"
                               disabled
                               className="form-control"
                               value={data.created_at}
                        />
                    </div>
                </div>
                <div className="col-6">
                    <div className="mb-3">
                        <label className="form-label">Lưu ý tới nhân viên lấy mẫu</label>
                        <textarea
                            disabled
                            className="form-control"
                            value={data.note}
                        />
                    </div>
                </div>
            </div>
            <hr/>
            <Dialog
                fullWidth={true}
                maxWidth={"xl"}
                open={dialog2}
                onClose={handleCloseDialog2}
            >
                <DialogTitle>Đăng ký chỉ định</DialogTitle>
                <DialogContent style={{height: "500px"}}>
                    <form onSubmit={handleSubmit2(regisService)}>
                        <DialogContentText>
                            Vui lòng chọn chỉ định:
                        </DialogContentText>
                        <Box sx={{marginTop: "10px"}} className="container">
                            <table className="table table-striped table-bordered">
                                <thead>
                                <tr>
                                    <th scope="col">Tên chỉ định</th>
                                    <th scope="col">Gíá tiền</th>
                                    <th scope="col">Lựa chọn</th>
                                </tr>
                                </thead>
                                <tbody>
                                {service.map((item) => (
                                    <tr>
                                        <td>{item.service_name}</td>
                                        <td>{item.price} VND</td>
                                        <td><input className="form-check-input" type="checkbox"
                                                   value={item.id} {...register2("serviceList", {required: 'Phải chọn ít nhất 1 chỉ định'})}
                                        />
                                            <span style={{color: "red", marginLeft:"10px"}}>{errors2.serviceList?.message}</span>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <hr/>
                        </Box>
                        <p><i>Xác nhận lại với bệnh nhân trước khi gửi biểu mẫu</i></p>
                        <input type="text" hidden={true} value={data.id} {...register2("id_registration")}/>
                        <button className="btn btn-success mt-3" type="submit">Xác nhận</button>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog2}>Đóng</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={dialog1}
                keepMounted
                TransitionComponent={TransitionDialog}
                onClose={handleCloseDialog1}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Bệnh viện Hồng Ngọc thông báo"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Các chỉ định đã được thêm
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog1}>Xác nhận</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={snackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{width: '100%'}}>
                    Cập nhật thành công
                </Alert>
            </Snackbar>
        </div>
    )
}

export default StaffRegisDetail