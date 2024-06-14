import {Link, useNavigate, useParams} from "react-router-dom";
import axios from '../../../plugins/axios'
import React, {useEffect, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import logo from "../../../assets/logo.png";
import moment from "moment";

const AdminManageScheduleDetail = () => {
    const params = useParams();
    const [data, setData] = useState({})
    const [result, setResult] = useState([]);
    const [dialog2, setDialog2] = useState(false);

    const getData = async () => {
        await axios.get('/hospital/admin/get-schedule-detail/' + params.id).then((response) => {
            const data = JSON.parse(atob(response.data))
            setData(data.schedule)
            axios.get('/get-result-registration-service/' + data.schedule.registration_id).then((response) => {
                const data = JSON.parse(atob(response.data))
                setResult(data.results)
            })
        })
    }

    useEffect(() => {
        getData();
    }, [])

    const handleCloseDialog2 = () => {
        setDialog2(false);
    }
    return(
        <div className="box">
            <div className="mb-3 hstack gap-3 ms-auto">
                <Link to="/admin/manage-schedule">
                    <button className="btn btn-secondary">Trở về</button>
                </Link>
            </div>
            <h5>Thông tin lịch khám:</h5>
            <div className="row">
                <div className="col-6">
                    <div className="mb-3">
                        <label className="form-label">Tên bệnh nhân</label>
                        <input
                            disabled
                            className="form-control"
                            value={data.user_name || ""}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Ngày sinh</label>
                        <input
                            disabled
                            className="form-control"
                            value={data.user_date || ""}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Nơi đăng ký khám</label>
                        <input
                            disabled
                            className="form-control"
                            value={data.name || ""}
                        />
                    </div>
                </div>
                <div className="col-6">
                    <div className="mb-3">
                        <label className="form-label">Số điện thoại</label>
                        <input
                            disabled
                            className="form-control"
                            value={data.user_phone || ""}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">GIới tính</label>
                        <input
                            disabled
                            className="form-control"
                            value={data.user_sex === 1 ? 'Nam' : 'Nữ'}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Thời gian đăng ký khám</label>
                        <input
                            disabled
                            className="form-control"
                            value={(data.time || "") + ' ' + (data.date || "")}
                        />
                    </div>
                </div>
            </div>
            <hr/>
            <button className="btn btn-success" onClick={() => {
                setDialog2(true)
            }} style={{marginRight: "10px"}}>
                Xem kết quả
            </button>

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
                    </div>
                </DialogTitle>
                <DialogContent dividers>
                    <div className="accordion">
                        {
                            result.map(item => (
                                <div className="accordion-item mt-3 mb-3" key={item.id}>
                                    <h2 className="accordion-header">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                                data-bs-target={`#panelsStayOpen-collapse${item.id}`}
                                                aria-expanded="true"
                                                aria-controls={`panelsStayOpen-collapse${item.id}`}>
                                            {item.service_name}
                                        </button>
                                    </h2>
                                    <div id={`panelsStayOpen-collapse${item.id}`}
                                         className="accordion-collapse collapse show">
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
            </Dialog>
        </div>
    )
}

export default AdminManageScheduleDetail
