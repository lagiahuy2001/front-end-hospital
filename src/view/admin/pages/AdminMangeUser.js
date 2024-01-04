import axios from '../../../plugins/axios'
import {forwardRef, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {
    Box, Button, Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select, Slide, Snackbar,
    TextField
} from "@mui/material";
import {useForm} from "react-hook-form";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const AdminMangeUser = () => {
    const [data, setData] = useState([])
    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const [countUser, setCountUser] = useState(0);
    const [listRoles, setListRoles] = useState([]);

    const getData = () => {
        setFill(0)
        setSearch('')
        axios.get('/hospital/admin/get-list-user').then((response) => {
            const data = JSON.parse(atob(response.data))
            setData(data.list_user)
            setCountUser(data.list_user.length)
        })
        axios.get('/hospital/admin/get-all-role').then((response) => {
            const data = JSON.parse(atob(response.data))
            setListRoles(data.list_role)
        })
    }
    useEffect(() => {
        getData()
    }, [])

    const getNameRoleVN = (name) => {
        if(name === 'COORDINATOR'){
            return "Điều phối viên"
        } else if (name === 'TESTER'){
            return "Người xét nghiệm"
        } else if (name === 'STAFF'){
            return "Nhân viên lấy mẫu"
        } else if (name === 'PATIENT'){
            return "Bệnh nhân"
        }
    }

    var list_items = [];
    if(data != null){
        list_items = data.map((item) => (
            <tr key={item.id}>
                <th th scope="row"><Link to={"/admin/manage-user/" + item.id}>
                    {item.id}
                </Link></th>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{getNameRoleVN(item.role.role_name)}</td>
            </tr>
        ))
    }
    const [fill, setFill] = useState(0)
    const [search, setSearch] = useState('')
    const [dialog2, setDialog2] = useState(false);
    const [dialog, setDialog] = useState(false);
    const [errorsCreateUser, setErrorsCreateUser] = useState('');
    const handleChangeFill = (event) => {
        setFill(event.target.value);
        setSearch('')
        if(event.target.value === 0){
            getData()
        }else {
            axios.get('/hospital/admin/fill-user-by-type/' + event.target.value).then((response) => {
                const data = JSON.parse(atob(response.data))
                setData(data.listUser)
                setCountUser(data.listUser.length)
            })
        }
    };
    const handleCloseDialog2 = () => {
        setDialog2(false);
    }
    const openDialog2 = () => {
        reset({address: '', date: '', email: '', name: '', password: '', phone: '', sex: '', role: ''})
        setDialog2(true)
    }
    const assignment = (data) => {
        axios.post('/hospital/admin/create-user', data)
            .then((response) => {
                setDialog(true)
                handleCloseDialog2()
                getData()
        })
            .catch(response => {
                setErrorsCreateUser(response.response.data.error.message)
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
    const searchUser = (e) => {
        if(e.target.value == ''){
            getData()
        } else {
            setFill(0)
            setSearch(e.target.value)
            if(e.target.value != ''){
                axios.get('/hospital/admin/search-user/' + e.target.value).then((response) => {
                    const data = JSON.parse(atob(response.data))
                    setData(data.listUser)
                    setCountUser(data.listUser.length)
                })
            }
        }
    }
    const handleCloseDialog = () => {
        setDialog(false);
    }

    return(
        <div className="box">
            <label className="mb-3 h3" >Tổng số lượng người dùng: {countUser}</label>
            <div className="mb-3 hstack gap-3 mt-3" >
                <FormControl style={{width: "200px"}}>
                    <InputLabel id="demo-simple-select-label">Phân loại</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={fill}
                        label="Phân loại"
                        onChange={handleChangeFill}
                    >
                        <MenuItem value={0}>Tất cả</MenuItem>
                        {
                            listRoles.map(item => (
                                <MenuItem value={item.id} key={item.id}>{getNameRoleVN(item.role_name)}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <TextField id="outlined-basic" label="Tìm kiếm" variant="outlined" className={"ms-auto"} onChange={searchUser} value={search}/>
                <button className="btn btn-primary" style={{height: "56px"}} onClick={openDialog2}>Thêm người dùng</button>
            </div>
            <table className="table table-striped table-hover table-bordered">
                <thead>
                <tr>
                    <th scope="col">Mã người dùng</th>
                    <th scope="col">Tên người dùng</th>
                    <th scope="col">Số điện thoại</th>
                    <th scope="col">Phân loại</th>
                </tr>
                </thead>
                <tbody>
                {list_items}
                </tbody>
            </table>

            <Dialog
                fullWidth={true}
                maxWidth={"xl"}
                open={dialog2}
                onClose={handleCloseDialog2}
                TransitionComponent={Transition}
            >
                <DialogTitle>Thêm người dùng</DialogTitle>
                <DialogContent style={{height: "500px"}}>
                    <form onSubmit={handleSubmit(assignment)}>
                        <DialogContentText>
                            Thông tin:
                        </DialogContentText>
                        <Box sx={{marginTop: "10px"}}>
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
                            <div className="mb-3">
                                <label className="form-label">Phân loại *</label>
                                <select className={errors.role ? 'form-select is-invalid' : 'form-select'}
                                        {...register("role", {required: 'Phân loại là bắt buộc!'})}
                                >
                                    {
                                        listRoles.map(item => (
                                            <option value={item.id} key={item.id}>{getNameRoleVN(item.role_name)}</option>
                                        ))
                                    }
                                </select>
                                <p style={{color: "red"}}>{errors.role?.message}</p>
                            </div>
                        </Box>
                        <button className="btn btn-success mt-3" type="submit">Thêm mới</button>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog2}>Đóng</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={snackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    {errorsCreateUser}
                </Alert>
            </Snackbar>
            <Dialog
            open={dialog}
            keepMounted
            onClose={handleCloseDialog}
            aria-describedby="alert-dialog-slide-description"
            TransitionComponent={Transition}
        >
            <DialogTitle>{"Bệnh viện Hồng Ngọc"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Thêm người dùng thành công
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog}>Xác nhận</Button>
            </DialogActions>
        </Dialog>

        </div>
    )
}
export default AdminMangeUser;