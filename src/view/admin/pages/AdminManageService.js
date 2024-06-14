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
const AdminManageService = () => {
    const [data, setData] = useState([])
    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const [countUser, setCountUser] = useState(0);

    const getData = () => {
        setSearch('')
        axios.get('/get-all-service').then((response) => {
            const data = JSON.parse(atob(response.data))
            setData(data.list_service)
            setCountUser(data.list_service.length)
        })
    }
    useEffect(() => {
        getData()
    }, [])


    var list_items = [];
    if(data != null){
        list_items = data.map((item) => (
            <tr key={item.id}>
                <th th scope="row"><Link to={"/admin/manage-service/" + item.id}>
                    {item.id}
                </Link></th>
                <td>{item.service_name}</td>
                <td>{item.price}</td>
                <td>{moment(item.created_at).format('HH:mm DD-MM-YYYY')}</td>
            </tr>
        ))
    }
    const [search, setSearch] = useState('')
    const [dialog2, setDialog2] = useState(false);
    const [dialog, setDialog] = useState(false);
    const [errorsCreateUser, setErrorsCreateUser] = useState('');
    const [additionalInformation, setAdditionalInformation] = useState([{ key: '', reference_value: '', unit_value: '', value: '' }]);
    const handleAddAttribute = () => {
        setAdditionalInformation([...additionalInformation, { key: '',reference_value: '', unit_value: '', value: '' }]);
    };
    const handleRemoveAttribute = (index) => {
        const updatedInformation = [...additionalInformation];
        updatedInformation.splice(index, 1);
        setAdditionalInformation(updatedInformation);
    };
    const handleCloseDialog2 = () => {
        setDialog2(false);
    }
    const openDialog2 = () => {
        reset({address: '', date: '', email: '', name: '', password: '', phone: '', sex: '', role: ''})
        setDialog2(true)
    }
    const assignment = (data) => {
        if (additionalInformation.length === 0) {
            alert('Phải có ít nhất một thuộc tính của dịch vụ.');
            return;
        }
        const payload = {
            service_name: data.service_name,
            price: data.price,
            driver_test: data.driver_test,
            additional_information: additionalInformation
        }
        console.log(payload)
        axios.post('/hospital/admin/create-service', payload)
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
            setSearch(e.target.value)
            if(e.target.value != ''){
                axios.get('/hospital/search-service/' + e.target.value).then((response) => {
                    const data = JSON.parse(atob(response.data))
                    setData(data.service)
                    setCountUser(data.service.length)
                })
            }
        }
    }
    const handleCloseDialog = () => {
        setDialog(false);
    }

    return(
        <div className="box">
            <label className="mb-3 h3" >Tổng số lượng dịch vụ: {countUser}</label>
            <div className="mb-3 hstack gap-3 mt-3" >
                <TextField id="outlined-basic" label="Tìm kiếm" variant="outlined" className={"ms-auto"} onChange={searchUser} value={search}/>
                <button className="btn btn-primary" style={{height: "56px"}} onClick={openDialog2}>Thêm dịch vụ</button>
            </div>
            <table className="table table-striped table-hover table-bordered">
                <thead>
                <tr>
                    <th scope="col">Mã dịch vụ</th>
                    <th scope="col">Tên dịch vụ</th>
                    <th scope="col">Số giá dịch vụ</th>
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
                <DialogTitle>Thêm dịch vụ</DialogTitle>
                <DialogContent style={{height: "500px"}}>
                    <form onSubmit={handleSubmit(assignment)}>
                        <DialogContentText>
                            Thông tin:
                        </DialogContentText>
                        <Box sx={{marginTop: "10px"}}>
                            <div className="mb-3">
                                <label className="form-label">Tên dịch vụ *</label>
                                <input
                                    className={errors.service_name ? 'form-control is-invalid' : 'form-control'}
                                    {...register("service_name", {required: 'Tên dịch vụ là bắt buộc!'})}
                                />
                                <p style={{color: "red"}}>{errors.service_name?.message}</p>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Giá dịch vụ *</label>
                                <input type="number"
                                       className={errors.price ? 'form-control is-invalid' : 'form-control'}
                                       {...register("price", {
                                           required: 'Giá dịch vụ là bắt buộc!',
                                       })}
                                />
                                <p style={{color: "red"}}>{errors.price?.message}</p>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Thiết bị thực hiện *</label>
                                <input type="text"
                                       className={errors.driver_test ? 'form-control is-invalid' : 'form-control'}
                                       {...register("driver_test", {
                                           required: 'Thiết bị thực hiện là bắt buộc!',
                                       })}
                                />
                                <p style={{color: "red"}}>{errors.driver_test?.message}</p>
                            </div>
                            <div className="mb-3">
                                <div style={{display: "flex", alignItems: "center", height: "70px"}}>
                                    <DialogContentText>
                                        Thuộc tính của dịch vụ:
                                    </DialogContentText>
                                    <button className="btn btn-primary" type="button" onClick={handleAddAttribute}>
                                        Thêm thuộc tính
                                    </button>
                                </div>
                                {additionalInformation.map((info, index) => (
                                    <div key={index} style={{display: "flex", alignItems: "center", height: "70px"}}>
                                        <label style={{width: "70px"}}>Chỉ số:</label>
                                        <input
                                            style={{width: "200px", marginRight: "50px"}}
                                            className="form-control"
                                            type="text"
                                            value={info.key}
                                            onChange={(e) => {
                                                const updatedInfo = [...additionalInformation];
                                                updatedInfo[index].key = e.target.value;
                                                setAdditionalInformation(updatedInfo);
                                            }}
                                        />
                                        <label style={{width: "70px"}}>Đơn vị:</label>
                                        <input
                                            className="form-control"
                                            style={{width: "200px", marginRight: "50px"}}
                                            type="text"
                                            value={info.unit_value}
                                            onChange={(e) => {
                                                const updatedInfo = [...additionalInformation];
                                                updatedInfo[index].unit_value = e.target.value;
                                                setAdditionalInformation(updatedInfo);
                                            }}
                                        />
                                        <label style={{width: "150px"}}>Trị số tham chiếu:</label>
                                        <input
                                            type="text"
                                            style={{width: "200px", marginRight: "50px"}}
                                            className="form-control"
                                            value={info.reference_value}
                                            onChange={(e) => {
                                                const updatedInfo = [...additionalInformation];
                                                updatedInfo[index].reference_value = e.target.value;
                                                setAdditionalInformation(updatedInfo);
                                            }}
                                        />
                                        <button className="btn btn-danger" type="btn" onClick={() => handleRemoveAttribute(index)}>
                                            Xóa
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </Box>
                        <button className="btn btn-success mt-3" type="submit">Tạo mới dịch vụ</button>
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
                        Thêm dịch vụ thành công
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Xác nhận</Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}
export default AdminManageService;