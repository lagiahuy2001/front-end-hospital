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
import moment from "moment/moment";

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const AdminManageClinic = () => {
    const [data, setData] = useState([])
    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const [countUser, setCountUser] = useState(0);

    const getData = () => {
        setSearch('')
        axios.get('/get-all-clinic').then((response) => {
            const data = JSON.parse(atob(response.data))
            setData(data.list_clinic)
            setCountUser(data.list_clinic.length)
        })
    }
    useEffect(() => {
        getData()
    }, [])


    var list_items = [];
    if(data != null){
        list_items = data.map((item) => (
            <tr key={item.id}>
                <th th scope="row"><Link to={"/admin/manage-clinic/" + item.id}>
                    {item.id}
                </Link></th>
                <td>{item.name}</td>
                <td>{moment(item.created_at).format('HH:mm DD-MM-YYYY')}</td>
            </tr>
        ))
    }
    const [search, setSearch] = useState('')
    const [dialog2, setDialog2] = useState(false);
    const [dialog, setDialog] = useState(false);
    const [errorsCreateUser, setErrorsCreateUser] = useState('');

    const handleCloseDialog2 = () => {
        setDialog2(false);
    }
    const openDialog2 = () => {
        reset({address: '', date: '', email: '', name: '', password: '', phone: '', sex: '', role: ''})
        setDialog2(true)
    }
    const assignment = (data) => {
        const payload = {
            name: data.name,
            address: data.address,
            phone: data.phone,
        }
        axios.post('/hospital/admin/create-clinic', payload)
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
    const handleCloseDialog = () => {
        setDialog(false);
    }

    return(
        <div className="box">
            <label className="mb-3 h3" >Tổng số lượng chi nhánh: {countUser}</label>
            <div className="mb-3 hstack gap-3 mt-3" >
                <button className="btn btn-primary" style={{height: "56px"}} onClick={openDialog2}>Thêm chi nhánh</button>
            </div>
            <table className="table table-striped table-hover table-bordered">
                <thead>
                <tr>
                    <th scope="col">Mã chi nhánh</th>
                    <th scope="col">Tên chi nhánh</th>
                    <th scope="col">Ngày tạo</th>
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
                <DialogTitle>Thêm chi nhánh</DialogTitle>
                <DialogContent style={{height: "500px"}}>
                    <form onSubmit={handleSubmit(assignment)}>
                        <DialogContentText>
                            Thông tin:
                        </DialogContentText>
                        <Box sx={{marginTop: "10px"}}>
                            <div className="mb-3">
                                <label className="form-label">Tên chi nhánh *</label>
                                <input
                                    className={errors.name ? 'form-control is-invalid' : 'form-control'}
                                    {...register("name", {required: 'Tên chi nhánh là bắt buộc!'})}
                                />
                                <p style={{color: "red"}}>{errors.name?.message}</p>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Địa chỉ chi nhánh *</label>
                                <input type="text"
                                       className={errors.address ? 'form-control is-invalid' : 'form-control'}
                                       {...register("address", {
                                           required: 'Địa chỉ chi nhánh là bắt buộc!',
                                       })}
                                />
                                <p style={{color: "red"}}>{errors.address?.message}</p>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Số điện thoại chi nhánh *</label>
                                <input type="text"
                                       className={errors.phone ? 'form-control is-invalid' : 'form-control'}
                                       {...register("phone", {
                                           required: 'Số điện thoại chi nhánh là bắt buộc!',
                                       })}
                                />
                                <p style={{color: "red"}}>{errors.phone?.message}</p>
                            </div>
                        </Box>
                        <button className="btn btn-success mt-3" type="submit">Tạo mới chi nhánh</button>
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
                <DialogTitle>{"Bệnh viện "}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Thêm chi nhánh thành công
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Xác nhận</Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}
export default AdminManageClinic;