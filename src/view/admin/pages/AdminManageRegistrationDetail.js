import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import axios from '../../../plugins/axios'
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, MenuItem, Select} from "@mui/material";
import logo from "../../../assets/logo.png";
import moment from "moment/moment";

const AdminManageRegistrationDetail = () => {
    const params = useParams();
    const [data, setData] = useState({});
    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const [result, setResult] = useState([]);
    const [listFill, setListFill] = useState([]);
    const [fillService, setFillService] = useState(0)

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

    const handleCloseDialog2 = () => {
        setDialog2(false);
        setFillService(0)
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



    return (
        <div className={"box"}>
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
                        <label className="form-label">Ngày dự kiến lấy mẫu</label>
                        <input type="date"
                               disabled
                               className='form-control'
                               {...register("date_appointment")}
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
                    <div className="mb-3">
                        <label className="form-label">Giới tính</label>
                        <input disabled
                               value={data.user_sex == 1 ? "Nam" : "Nữ"}
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
            </div>
            <hr/>
            {data.status == 3 ? <button className="btn btn-success" onClick={() => {
                setDialog2(true)
            }} style={{marginRight: "10px"}}>
                Xem kết quả
            </button> : ''}
            <Link to="/admin/manage-registration">
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
                                                        <tr>
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
        </div>
    )
}

export default AdminManageRegistrationDetail