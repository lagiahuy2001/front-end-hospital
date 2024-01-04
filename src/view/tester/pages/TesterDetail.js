import {Link, useNavigate, useParams} from "react-router-dom";
import {forwardRef, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import axios from '../../../plugins/axios'
import {Snackbar} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const TesterDetail = () => {
    const params = useParams();
    const [data, setData] = useState({});
    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const [additionalInformation, setAdditionalInformation] = useState([{ key: '', option: '', value: '' }]);

    useEffect(() => {
        axios.get('/hospital/tester/get-detail-regis-service/' + params.id).then((response) => {
            const data = JSON.parse(atob(response.data))
            setData(data.registration)
            setAdditionalInformation(JSON.parse(data.registration.additional_information ?? []))
        })
    }, [])

    useEffect(() => {
        reset(data);
    }, [data]);

    const onSubmit = (data) => {
        const payload = {
            additional_information: additionalInformation,
            advise: data.advise,
            id_registration_service: data.id
        }
        axios.post('/hospital/tester/update-result-registration-service', payload).then((response) => {
            setSnackbar(true)
        }).then(() => {
            setTimeout(() => navigate("/tester"), 2500)
        })
    };
    const navigate = useNavigate();
    const [snackbar, setSnackbar] = useState(false);

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar(false);
    };

    return (<div className="box">
            <div className="mb-3 hstack gap-3">
                <Link to="/tester" className="ms-auto">
                    <button className="btn btn-secondary">Trở về</button>
                </Link>
            </div>
            <h4>Thông tin chi tiết:</h4>
            <form onSubmit={handleSubmit(onSubmit)} style={{width: "95%"}}>
                <div className="mb-3">
                    <label className="form-label">Mã mẫu:</label>
                    <input disabled
                           className="form-control"
                           {...register("uuid")}
                    />
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="mb-3">
                            <label className="form-label">Mã đơn đăng ký:</label>
                            <input disabled
                                   className="form-control"
                                   {...register("registration_id")}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Ngày sinh bệnh nhân:</label>
                            <input disabled
                                   type="date"
                                   className="form-control"
                                   {...register("patient_date")}
                            />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="mb-3">
                            <label className="form-label">Tên chỉ định:</label>
                            <input disabled
                                   className="form-control"
                                   {...register("service_name")}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Giới tính:</label>
                            <input disabled
                                   value={data.patient_sex == 1 ? "Nam" : "Nữ"}
                                   className="form-control"
                            />
                        </div>
                    </div>
                </div>
                <hr/>
                <h4 style={{margin : "20px 0"}}>Biểu mẫu kết quả:</h4>
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th scope="col">Chỉ số</th>
                        <th scope="col">Kết quả</th>
                        <th scope="col">Đơn vị</th>
                        <th scope="col">Trị số tham chiếu</th>
                        <th scope="col">Thiết bị</th>
                    </tr>
                    </thead>
                    <tbody className="table-group-divider">
                    {additionalInformation.map((info, index) => (
                        <tr key={index}>
                            <td>{info.key}</td>
                            <input
                                type="text"
                                value={info.value}
                                onChange={(e) => {
                                    const updatedInfo = [...additionalInformation];
                                    updatedInfo[index].value = e.target.value;
                                    setAdditionalInformation(updatedInfo);
                                }}
                            />
                            <td>{info.unit_value}</td>
                            <td>{info.reference_value}</td>
                            {index === 0 && (
                                <td rowSpan={additionalInformation.length}>{data.driver_test}</td>
                            )}
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className="mb-3">
                    <label className="form-label">Tư vấn:</label>
                    <input
                           className={errors.advise ? 'form-control is-invalid' : 'form-control'}
                           {...register("advise", {required: "Thông tin này là bắt buộc!"})}
                    />
                    <p style={{color: "red"}}>{errors.advise?.message}</p>
                </div>
                <button className="btn btn-success mt-3" type="submit">Cập nhật</button>
            </form>
        <Snackbar open={snackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity="success" sx={{width: '100%'}}>
                Cập nhật thành công
            </Alert>
        </Snackbar>
        </div>)
}

export default TesterDetail;