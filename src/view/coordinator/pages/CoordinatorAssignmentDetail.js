import {Link, useNavigate, useParams} from "react-router-dom";
import {forwardRef, useEffect, useState} from "react";
import axios from '../../../plugins/axios'
import {useForm} from "react-hook-form";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, FormControl, InputLabel, MenuItem, Select,
    Slide,
    Snackbar
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import moment from "moment/moment";

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const TransitionDialog = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const CoordinatorAssignmentDetail = () => {
    const params = useParams();
    const [data, setData] = useState({});
    const [isUpdate, setIsUpdate] = useState(false);
    const [snackbar, setSnackbar] = useState(false);
    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const [listStaff, setListStaff] = useState([])

    const {
        register: register2,
        formState: {errors: errors2},
        handleSubmit: handleSubmit2,
        reset: reset2
    } = useForm({
        mode: "onBlur",
    });

    const navigate = useNavigate();

    const getData = () => {
        axios.get('/hospital/get-detail-registration/' + params.id).then((response) => {
            const data = JSON.parse(atob(response.data))
            let res = data.registration
            res.created_at = moment(data.registration.created_at).format('YYYY-MM-DD')
            setData(res)
        })
    }

    useEffect(() => {
        getData();
        axios.get('/hospital/coordinator/get-all-staff').then((response) => {
            const data = JSON.parse(atob(response.data))
            setListStaff(data.staff)
        })
    }, [])

    useEffect(() => {
        reset(data);
        reset2(data)
    }, [data]);


    let sexValue = isUpdate ? <>
        <input type="radio"
               className={errors.user_sex ? 'form-check-input is-invalid' : 'form-check-input'}
               {...register("user_sex", {required: 'Giới tính là bắt buộc!'})}
               value="1"
        />
        <label className="form-check-label"
               style={{marginLeft: "10px", marginRight: "100px"}}>Nam</label>

        <input type="radio"
               className={errors.user_sex ? 'form-check-input is-invalid' : 'form-check-input'}
               {...register("user_sex", {required: 'Giới tính là bắt buộc!'})}
               value="0"
        />
        <label className="form-check-label" style={{marginLeft: "10px"}}>Nữ</label>
        <p style={{color: "red"}}>{errors.user_sex?.message}</p>
    </> : (data.user_sex == 1 ? <label className="form-check-label"
                                  style={{marginLeft: "10px", marginRight: "100px"}}>Nam</label> :
        <label className="form-check-label"
               style={{marginLeft: "10px", marginRight: "100px"}}>Nữ</label>)

    const openDialog2 = () => {
        setDialog2(true)
    }
    const assignment = (data) => {
        const payload = {
            id: data.id,
            staff_id: data.staff_id
        }
        axios.post('/hospital/coordinator/assignment-registration', payload).then((response) => {
            setSnackbar(true)
        }).then(() => {
            setTimeout(() => navigate("/coordinator/assignment"), 2500)
        })
    };
    const onSubmit = (data) => {
        const payload = {
            user_phone: data.user_phone,
            user_name: data.user_name,
            user_email: data.user_email,
            user_date: data.user_date,
            date_appointment: data.date_appointment,
            user_sex: data.user_sex,
            address_appointment: data.address_appointment,
            note: data.note,
            id: data.id,
        }
        axios.post('/hospital/coordinator/update-registration', payload).then((response) => {
            const data = JSON.parse(atob(response.data))
            let res = data.registration
            res.created_at = moment(data.registration.created_at).format('YYYY-MM-DD')
            setData(res)
            setIsUpdate(false)
            setSnackbar(true)
        })
    };

    const refuse = () => {
        axios.get('/hospital/coordinator/refuse-registration/' + data.id).then((response) => {
            const data = JSON.parse(atob(response.data))
            let res = data.registration
            res.created_at = moment(data.registration.created_at).format('YYYY-MM-DD')
            setData(res)
        })
    }

    const cancel = () => {
        axios.get('/hospital/cancel-registration/' + data.id).then((response) => {
            setDialog1(true);
        })
    }
    const [dialog1, setDialog1] = useState(false);

    const [dialog2, setDialog2] = useState(false);

    const handleCloseDialog2 = () => {
        setDialog2(false);
    }

    const handleCloseDialog1 = () => {
        setDialog1(false);
        navigate("/coordinator/assignment")
    }
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar(false);
    };
    return (
        <div className="box">
            {!isUpdate && <div className="mb-3 hstack gap-3">
                <button className="btn btn-primary ms-auto" onClick={openDialog2}>Phân công</button>
                <button className="btn btn-success" onClick={() => {
                    setIsUpdate(true)
                }}>Chỉnh sửa thông tin
                </button>
                {data.refuse ? "" :
                    <button className="btn btn-warning" type={"button"} onClick={refuse}>Đánh dấu không liên lạc
                        được</button>
                }
                <button className="btn btn-danger" type={"button"} onClick={cancel}>Hủy đơn đăng ký</button>
                <Link to="/coordinator/assignment">
                    <button className="btn btn-secondary">Trở về</button>
                </Link>
            </div>}
            <h5>Thông tin bệnh nhân:</h5>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-6">
                        <div className="mb-3">
                            <label className="form-label">Số điện thoại</label>
                            <input type="number"
                                   disabled={!isUpdate}
                                   className={errors.user_phone ? 'form-control is-invalid' : 'form-control'}
                                   {...register("user_phone", {
                                       required: 'Số điện thoại là bắt buộc!',
                                       minLength: {value: 10, message: "Số điện thoại gồm 10 chữ số"},
                                       maxLength: {value: 11, message: "Số điện thoại gồm 10-11 chữ số!"}
                                   })}
                            />
                            <p style={{color: "red"}}>{errors.user_phone?.message}</p>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email"
                                   disabled={!isUpdate}
                                   className={errors.user_email ? 'form-control is-invalid' : 'form-control'}
                                   {...register("user_email", {
                                       required: 'Email là bắt buộc!',
                                       pattern: {
                                           value: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
                                           message: "Email không hợp lệ!"
                                       },
                                   })}
                            />
                            <p style={{color: "red"}}>{errors.user_email?.message}</p>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Ngày dự kiến lấy mẫu</label>
                            <input type="date"
                                   disabled={!isUpdate}
                                   className={errors.date_appointment ? 'form-control is-invalid' : 'form-control'}
                                   {...register("date_appointment", {required: 'Ngày dự kiến là bắt buộc!'})}
                            />
                            <p style={{color: "red"}}>{errors.date_appointment?.message}</p>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="mb-3">
                            <label className="form-label">Họ và tên</label>
                            <input
                                disabled={!isUpdate}
                                className={errors.user_name ? 'form-control is-invalid' : 'form-control'}
                                {...register("user_name", {required: 'Họ và tên là bắt buộc!'})}
                            />
                            <p style={{color: "red"}}>{errors.user_name?.message}</p>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Ngày sinh</label>
                            <input type="date"
                                   disabled={!isUpdate}
                                   className={errors.user_date ? 'form-control is-invalid' : 'form-control'}
                                   {...register("user_date", {required: 'Ngày sinh là bắt buộc!'})}
                            />
                            <p style={{color: "red"}}>{errors.user_date?.message}</p>
                        </div>
                        <div className="mb-4">
                            <p className="form-label mb-3">Giới tính</p>
                            {sexValue}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="mb-3">
                            <label className="form-label">Địa điểm lấy mẫu xét nghiệm</label>
                            <textarea
                                disabled={!isUpdate}
                                className={errors.address_appointment ? 'form-control is-invalid' : 'form-control'}
                                {...register("address_appointment", {required: 'Địa điểm lấy mẫu là bắt buộc!'})}
                            />
                            <p style={{color: "red"}}>{errors.address_appointment?.message}</p>
                        </div>
                        {!isUpdate && <div className="mb-3">
                            <label className="form-label">Ngày khởi tạo</label>
                            <input type="date"
                                   disabled={true}
                                   {...register("created_at")}
                                   className="form-control"
                            />
                        </div>}
                    </div>
                    <div className="col-6">
                        <div className="mb-3">
                            <label className="form-label">Lưu ý tới nhân viên lấy mẫu</label>
                            <textarea
                                disabled={!isUpdate}
                                className="form-control"
                                {...register("note")}
                            />
                        </div>
                        {!isUpdate && <div className="mb-3">
                            <label className="form-label">Số lần liên lạc</label>
                            <input value={data.refuse ? '1' : 0}
                                   disabled={true}
                                   className="form-control"
                            />
                        </div>}
                    </div>
                </div>
                <hr/>
                {isUpdate && <>
                    <button className="btn btn-success" type="submit">Cập nhật</button>
                    <button className="btn btn-secondary ms-3" type="button" onClick={() => {
                        setIsUpdate(false)
                        getData()
                    }}>Hủy
                    </button>
                </>
                }
            </form>
            <Snackbar open={snackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{width: '100%'}}>
                    Cập nhật thành công
                </Alert>
            </Snackbar>

            <Dialog
                open={dialog1}
                TransitionComponent={TransitionDialog}
                keepMounted
                onClose={handleCloseDialog1}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Bệnh viện Hồng Ngọc"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Đơn đăng ký đã được hủy
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog1}>Xác nhận</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                fullWidth={true}
                maxWidth={"xl"}
                open={dialog2}
                onClose={handleCloseDialog2}
            >
                <DialogTitle>Phân công nhân viên</DialogTitle>
                <DialogContent style={{height: "500px"}}>
                    <form onSubmit={handleSubmit2(assignment)}>
                        <DialogContentText>
                            Đơn đăng ký:
                        </DialogContentText>
                        <Box sx={{marginTop: "10px"}}>
                            <div className="row">
                                <div className="col-3">
                                    <div className="mb-3">
                                        <label className="form-label">Mã đơn đăng ký:</label>
                                        <input
                                            disabled
                                            className="form-control"
                                            {...register2("id")}
                                        />
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="mb-3">
                                        <label className="form-label">Họ tên bệnh nhân:</label>
                                        <input
                                            disabled
                                            className="form-control"
                                            {...register2("user_name")}
                                        />
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="mb-3">
                                        <label className="form-label">Số điện thoại:</label>
                                        <input
                                            disabled
                                            className="form-control"
                                            {...register2("user_phone")}
                                        />
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="mb-3">
                                        <label className="form-label">Email:</label>
                                        <input
                                            disabled
                                            className="form-control"
                                            {...register2("user_email")}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Box>
                        <DialogContentText>
                            Vui lòng chọn nhân viên:
                        </DialogContentText>
                        <Box sx={{marginTop: "10px"}}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Danh sách nhân viên</InputLabel>
                                <Select label="Danh sách nhân viên"
                                        labelId="demo-simple-select-label" {...register2("staff_id", {required: "Hãy lựa chọn 1 nhân viên!"})}>
                                    {listStaff.map((i) => (
                                        <MenuItem value={i.id}>{i.id} - {i.name}</MenuItem>))}
                                </Select>
                            </FormControl>
                            <p style={{color: "red", marginTop:"10px"}}>{errors2.staff_id?.message}</p>
                        </Box>
                        <button className="btn btn-success mt-3" type="submit">Phân công</button>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog2}>Đóng</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CoordinatorAssignmentDetail;