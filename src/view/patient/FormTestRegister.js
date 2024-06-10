import banner from '../../assets/dvxn1.jpg'
import banggia from '../../assets/banggia.png'
import {useForm} from "react-hook-form";
import axios from "../../plugins/axios";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide} from "@mui/material";
import {forwardRef, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const FormTestRegister = () => {
    const [dialog, setDialog] = useState(false);
    const navigate = useNavigate();
    const [data, setData] = useState({})
    const [listService, setListService] = useState([])

    const {register, handleSubmit, formState: {errors}, reset} = useForm({});

    const getData = async () => {
        await axios.get('/get-user').then((response) => {
            const data = JSON.parse(atob(response.data))
            setData(data.user)
        })
        await axios.get('/get-all-service').then((response) => {
            const data = JSON.parse(atob(response.data))
            setListService(data.list_service)
        })
    }

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        reset(data);
    }, [data]);

    const onSubmit = (data) => {
        const payload = {
            address_appointment: data.address_appointment,
            date_appointment: data.date_appointment,
            note: data.note,
            user_date: data.date,
            user_email: data.email,
            user_phone: data.phone,
            user_name: data.name,
            user_sex: data.sex,
        }
        axios.post('/app/create-registration', payload).then((response) => {
            setDialog(true)
        })
    };

    const handleClose = () => {
        setDialog(false);
        navigate("/")
    }

    return (
        <main style={{backgroundColor: "white"}}>
            <img src={banner} />
            <div className="text-center" style={{marginTop: "100px"}}>
                <h3>ĐĂNG KÝ XÉT NGHIỆM MÁU TẠI NHÀ</h3>
            </div>
            <div className="container" style={{paddingBottom: "100px"}}>
                <h5 style={{marginTop: "50px"}}>Bảng giá dịch vụ:</h5>
                <div className="text-center">
                    <table className="center-table">
                        <tr>
                            <th>Tên dịch vụ</th>
                            <th>Mức phí</th>
                        </tr>
                        {listService && listService.map(service => (
                            <tr key={service.id}>
                                <td>{service.service_name}</td>
                                <td>{service.price}</td>
                            </tr>
                        ))}
                    </table>
                </div>
                <h5>Thông tin cá nhân:</h5>
                <p><i>(Vui lòng cung cấp thông tin chính xác để nhận kết quả xét nghiệm và giảm thiểu thời gian làm thủ
                    tục tại nơi lấy mẫu)</i></p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="col-6">
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
                                <label className="form-label">Email *</label>
                                <input type="email"
                                       className={errors.email ? 'form-control is-invalid' : 'form-control'}
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
                                <label className="form-label">Ngày dự kiến lấy mẫu *</label>
                                <input type="date"
                                       className={errors.date_appointment ? 'form-control is-invalid' : 'form-control'}
                                       {...register("date_appointment", {required: 'Ngày dự kiến là bắt buộc!'})}
                                />
                                <p style={{color: "red"}}>{errors.date_appointment?.message}</p>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="mb-3">
                                <label className="form-label">Họ và tên *</label>
                                <input
                                    className={errors.name ? 'form-control is-invalid' : 'form-control'}
                                    {...register("name", {required: 'Họ và tên là bắt buộc!'})}
                                />
                                <p style={{color: "red"}}>{errors.name?.message}</p>
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
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className="mb-3">
                                <label className="form-label">Địa điểm lấy mẫu xét nghiệm *</label>
                                <textarea
                                    className={errors.address_appointment ? 'form-control is-invalid' : 'form-control'}
                                    {...register("address_appointment", {required: 'Địa điểm lấy mẫu là bắt buộc!'})}
                                />
                                <p style={{color: "red"}}>{errors.address_appointment?.message}</p>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="mb-3">
                                <label className="form-label">Lưu ý tới nhân viên lấy mẫu</label>
                                <textarea className="form-control"
                                          {...register("note")}
                                />
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className="text-center">
                        <p><i>Các thông tin mà khách hàng cung cấp sẽ được bệnh viện bảo mật tuyệt đối! Khánh hàng có thể tìm hiểu thêm về chính sách bảo mật của bệnh viện <a style={{color :"blue", cursor: "pointer"}} data-bs-toggle="modal" data-bs-target="#exampleModal">tại đây</a></i></p>
                    </div>
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                         aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Chính sách bảo mật</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    ...
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-success" type="submit">Đăng ký</button>
                </form>
            </div>
            <Dialog
                open={dialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Bệnh viện "}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Đơn đăng ký lấy mẫu xét nghiệm tại nhà của bạn đã được bệnh viện ghi nhận. Bệnh viện sẽ liên hệ cho bạn để xác nhận lại các thông tin.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Xác nhận</Button>
                </DialogActions>
            </Dialog>
        </main>
    )
}

export default FormTestRegister;