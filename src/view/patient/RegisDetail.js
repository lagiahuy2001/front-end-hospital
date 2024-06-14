import {Link, useParams} from "react-router-dom";
import React, {forwardRef, useEffect, useRef, useState} from "react";
import axios from "../../plugins/axios";
import {useForm} from "react-hook-form";
import {
    Accordion, AccordionDetails,
    AccordionSummary,
    Box, Button, Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select, Slide, Typography
} from "@mui/material";

import logo from '../../assets/logo.png'
import html2canvas from "html2canvas";
import {jsPDF} from "jspdf";
import moment from 'moment';
const FormTwo = ({clinic, reload, registration_id}) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [dialog, setDialog] = useState(false);

    const handleClose = () => {
        setDialog(false);
        reload()
    }

    const onSubmit = (data) => {
        const payload = {...data, registration_id: registration_id}
        axios.post('/app/create-schedule', payload).then((response) => {
            setDialog(true)
        })
        reset();
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContentText>
                    Thông tin:
                </DialogContentText>
                <Box sx={{marginTop: "10px"}}>
                    <div className="mb-3">
                        <label className="form-label">Chi nhánh *</label>
                        <select
                            className={errors.clinic_id ? 'form-select is-invalid mb-3' : 'form-select mb-3'}
                            {...register("clinic_id", {required: 'Chi nhánh là bắt buộc!'})}
                        >
                            <option selected value="">Vui lòng chọn chi nhánh</option>
                            {
                                clinic.map(item => <option
                                    key={item.id}
                                    value={item.id}>{item.name} - {item.address}</option>)
                            }
                        </select>
                        <p style={{color: "red"}}>{errors.clinic_id?.message}</p>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Ngày dự kiến *</label>
                        <input type="date"
                               className={errors.date ? 'form-control is-invalid' : 'form-control'}
                               {...register("date", {required: 'Ngày dự kiến là bắt buộc!'})}
                        />
                        <p style={{color: "red"}}>{errors.date?.message}</p>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Thời gian dự kiến *</label>
                        <input type="time"
                               className={errors.time ? 'form-control is-invalid' : 'form-control'}
                               {...register("time", {required: 'Thời gian dự kiến là bắt buộc!'})}
                        />
                        <p style={{color: "red"}}>{errors.time?.message}</p>
                    </div>
                </Box>
                <button className="btn btn-success mt-3" type="submit">Đăng ký lịch khám</button>
            </form>
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
                        Đơn đăng ký lấy mẫu xét nghiệm tại nhà của bạn đã được bệnh viện ghi nhận. Bệnh viện sẽ liên hệ
                        cho bạn để xác nhận lại các thông tin.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Xác nhận</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ExpandMoreIcon() {
    return null;
}

const RegisDetail = () => {
    const params = useParams();
    const [data, setData] = useState({});
    const [schedule, setSchedule] = useState(null);
    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const [result, setResult] = useState([]);
    const [listFill, setListFill] = useState([]);
    const [fillService, setFillService] = useState(0)
    const [clinic, setClinic] = useState([]);

    const getData = () => {
        axios.get('/app/get-detail-registration/' + params.id).then((response) => {
            const data = JSON.parse(atob(response.data))
            let res = data.registration
            res.created_at = moment(data.registration.created_at).format('YYYY-MM-DD')
            setData(res)
            if(data.schedule){
                setSchedule(data.schedule)
            }
        })
        axios.get('/get-all-clinic').then((response) => {
            const data = JSON.parse(atob(response.data))
            setClinic(data.list_clinic)
        })
        setDialog3(false)
    }
    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        reset(data);
        if (data.status == 3) {
            axios.get('/get-result-registration-service/' + params.id).then((response) => {
                const data = JSON.parse(atob(response.data))
                setResult(data.results)
                setListFill(data.listFill)
            })
        }
    }, [data]);

    const status = (props) => {
        if (props.status == 0) {
            if (props.refuse)
                return "Không liên lạc được lần 1"
            return "Đang chờ xác nhận"
        } else if (props.status == 1) {
            return "Đợi lấy mẫu"
        } else if (props.status == 2) {
            return "Đợi kết quả xét nghiệm"
        } else if (props.status == 3) {
            return "Đã có kết quả xét nghiệm"
        } else if (props.status == 5) {
            return "Đơn đang ký đã bị hủy"
        } else {
            return "Không xác định"
        }
    }
    const [dialog2, setDialog2] = useState(false);
    const [dialog3, setDialog3] = useState(false);

    const handleCloseDialog2 = () => {
        setDialog2(false);
        setFillService(0)
    }
    const handleCloseDialog3 = () => {
        setDialog3(false);
    }

    const handleChange = (event) => {
        const payload = {
            registration_id: params.id,
            id: event.target.value
        }
        setFillService(event.target.value)
        axios.post('/filter-listResult-regis-service', payload).then((response) => {
            const data = JSON.parse(atob(response.data))
            setResult(data.results)
            setListFill(data.listFill)
        })
    };

    const downloadPDF = async () => {
        const pdf = new jsPDF("p", "pt", "a4");
        const images = [];

        for (const item of result) {
            const input = document.getElementById(`fileResult${item.id}`);
            document.getElementById(`panelsStayOpen-collapse${item.id}`).classList.add('show')

            const canvas = await html2canvas(input, {
                onclone: function (document) {
                    document.getElementById(`fileResult${item.id}`).style.fontSize = "11px";
                    document.getElementById(`fileResult${item.id}`).style.width = "21cm";
                    document.getElementById(`fileResult${item.id}`).style.height = "29.7cm";
                    document.getElementById(`fileResult${item.id}`).style.padding = "10mm 20mm 20mm 30mm";
                    document.getElementById(`advise_${item.id}`).style.display = "none";
                },
            });

            const imgData = canvas.toDataURL("image/png");
            images.push(imgData);
        }

        images.forEach((imgData, index) => {
            if (index > 0) {
                pdf.addPage();
            }
            pdf.addImage(imgData, "JPEG", 0, 0);
        });

        pdf.save("Kết quả xét nghiệm");
    };

    return (
        <main style={{padding: "100px"}}>
            <div className="text-center mb-5">
                <h1>Thông tin đơn đăng ký</h1>
            </div>
            <div className="row">
                <div className="col-6">
                    <div className="mb-3">
                        <label className="form-label">Số điện thoại</label>
                        <input type="number"
                               disabled
                               className='form-control'
                               {...register("user_phone")}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email"
                               disabled
                               className='form-control'
                               {...register("user_email")}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Giới tính</label>
                        <input disabled
                               value={data.user_sex == 1 ? "Nam" : "Nữ"}
                               className="form-control"
                        />
                    </div>
                </div>
                <div className="col-6">
                    <div className="mb-3">
                        <label className="form-label">Họ và tên</label>
                        <input
                            disabled
                            className='form-control'
                            {...register("user_name")}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Ngày sinh</label>
                        <input type="date"
                               disabled
                               className='form-control'
                               {...register("user_date")}
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <div className="mb-3">
                        <label className="form-label">Ngày dự kiến lấy mẫu</label>
                        <input type="date"
                               disabled
                               className='form-control'
                               {...register("date_appointment")}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Địa điểm lấy mẫu xét nghiệm</label>
                        <textarea
                            disabled
                            className='form-control'
                            {...register("address_appointment")}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Ngày khởi tạo</label>
                        <input type="date"
                               disabled
                               className="form-control"
                               {...register("created_at")}
                        />
                    </div>
                </div>
                <div className="col-6">
                    <div className="mb-3">
                        <label className="form-label">Thời gian dự kiến lấy mẫu</label>
                        <input type="time"
                               disabled
                               className='form-control'
                               {...register("time_appointment")}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Lưu ý tới nhân viên lấy mẫu</label>
                        <textarea
                            disabled
                            className="form-control"
                            {...register("note")}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Trạng thái</label>
                        <input disabled
                               className="form-control"
                               value={status(data)}
                        />
                    </div>
                </div>
                {data.status == 3 && schedule && <div className="col-12">
                    <label className="form-label">Đã đăng ký lịch khám
                        tại {schedule.name} vào {schedule.time} ngày {schedule.date}</label>
                </div>}
            </div>
            <hr/>
            {data.status == 3 ? <button className="btn btn-success" onClick={() => {
                setDialog2(true)
            }} style={{marginRight: "10px"}}>
                Xem kết quả
            </button> : ''}
            {data.status == 3 && !schedule ? <button className="btn btn-primary" onClick={() => {
                setDialog3(true)
            }} style={{marginRight: "10px"}}>
                Đăng ký lịch khám bệnh
            </button> : ''}
            <Link to="/patient/profile">
                <button className="btn btn-secondary">Trở về</button>
            </Link>

            {data.status == 3 ?
                <Dialog
                    fullWidth={true}
                    maxWidth={"lg"}
                    open={dialog2}
                    scroll={"paper"}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                    onClose={handleCloseDialog2}
                >
                    <DialogTitle>
                        <div className="row">
                            <div className="col-3">
                                <span>Kết quả két nghiệm</span>
                            </div>
                            <div className="col-3 ms-auto">
                                <span style={{marginRight: "10px"}}>Loại xét nghiệm</span>
                                <FormControl style={{width: "100px"}}>
                                    <Select value={fillService} onChange={handleChange}>
                                        <MenuItem value={0}>Tất cả</MenuItem>
                                        {listFill.map((item) => (
                                            <MenuItem value={item.id}>{item.service_name}</MenuItem>))}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="col-2">
                                <button className={"btn btn-primary"} onClick={downloadPDF}>Tải file kết quả</button>
                            </div>
                        </div>
                    </DialogTitle>
                    <DialogContent dividers>
                        <div className="accordion">
                    {
                        result.map(item => (
                            <div className="accordion-item mt-3 mb-3" key={item.id}>
                                <h2 className="accordion-header">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#panelsStayOpen-collapse${item.id}`} aria-expanded="true" aria-controls={`panelsStayOpen-collapse${item.id}`}>
                                        {item.service_name}
                                    </button>
                                </h2>
                                <div id={`panelsStayOpen-collapse${item.id}`} className="accordion-collapse collapse show">
                                    <div className="accordion-body" id={`fileResult${item.id}`}>
                                        <div className="row">
                                            <div className="col-3 text-center">
                                                <img src={logo} style={{height: "70px", width: "100px"}}/>
                                            </div>
                                            <div className="col-8 text-center">
                                                <h4 className="mt-3">Phiếu kết quả xét nghiệm</h4>
                                                <span>Ngày: {moment(item.updated_at).format('DD-MM-YYYY')}</span>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="row">
                                            <div className="col-5 card" style={{marginLeft: "10px"}}>
                                                <div className="card-body">
                                                    <p><b>Họ và tên: </b>{item.patient_name}</p>
                                                    <p><b>Năm sinh: </b>{moment(item.patient_date).format('DD-MM-YYYY')}</p>
                                                    <p><b>Giới tính: </b>{item.patient_sex == 1 ? "Nam" : "Nữ"}</p>
                                                </div>

                                            </div>
                                            <div className="col-6 card ms-auto" style={{marginRight: "10px"}}>
                                                <div className="card-body">
                                                    <p><b>Mã lần khám: </b>{item.uuid}</p>
                                                    <p><b>Khoa/phòng chỉ định: Khoa xét nghiệm</b></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <table className="table table-bordered" style={{border: " #00000045"}}>
                                                <thead>
                                                <tr>
                                                    <th scope="col">Tên xét nghiệm</th>
                                                    <th scope="col" style={{width: "80px"}}>Kết quả</th>
                                                    <th scope="col">Đơn vị</th>
                                                    <th scope="col">Trị số tham chiếu</th>
                                                    <th scope="col">Thiết bị</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    Array.isArray(JSON.parse(item.additional_information))
                                                    && JSON.parse(item.additional_information).map((additional, index) => (
                                                        <tr key={index}>
                                                            <td>{additional.key}</td>
                                                            <td>{additional.value}</td>
                                                            <td>{additional.unit_value}</td>
                                                            <td>{additional.reference_value}</td>
                                                            {index === 0 && (
                                                                <td rowSpan={JSON.parse(item.additional_information).length}>{item.driver_test}</td>
                                                            )}
                                                        </tr>
                                                    ))
                                                }
                                                <tr id={`advise_${item.id}`}>
                                                    <td><b>Tư vấn</b></td>
                                                    <td colSpan={4}>{item.advise}</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                            <div className="row mt-3 mb-3">
                                                <div className="col-6 text-center">
                                                    <h3>Người xét nghiệm</h3>
                                                    <span><i>(Ký ghi rõ họ tên)</i></span>
                                                </div>
                                                <div className="col-6 text-center">
                                                    <h3>Bệnh viện </h3>
                                                    <h4>Đại diện</h4>
                                                    <span><i>(Ký ghi rõ họ tên)</i></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }</div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog2}>Đóng</Button>
                    </DialogActions>
                </Dialog> : ''}

            {data.status == 3 && !schedule ?
                <Dialog
                    fullWidth={true}
                    maxWidth={"xl"}
                    open={dialog3}
                    onClose={handleCloseDialog3}
                    TransitionComponent={Transition}
                >
                    <DialogTitle>Đăng ký lịch khám bệnh</DialogTitle>
                    <DialogContent style={{height: "500px"}}>
                        <FormTwo clinic={clinic} reload={getData} registration_id={data.id}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog3}>Đóng</Button>
                    </DialogActions>
                </Dialog> : ''}
        </main>
    )
}

export default RegisDetail