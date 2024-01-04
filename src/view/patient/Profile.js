import {Box, Tab, Tabs, Typography} from "@mui/material";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import axios from "../../plugins/axios";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import moment from 'moment';



function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Profile = () => {
    const [value, setValue] = useState(0);
    const [data, setData] = useState({});
    const id_user = useSelector(state => state.statusLogin.id_user);
    const [listRegis, setListRegis] = useState([]);

    const {register, handleSubmit, formState: {errors}, reset} = useForm();

    const getData = () => {
        axios.get('/get-user').then((response) => {
            const data = JSON.parse(atob(response.data))
            setData(data.user)
        }).then(() => {
            axios.get('/app/get-list-registration' ).then((response) => {
                const data = JSON.parse(atob(response.data))
                setListRegis(data.registration)
            })
        })
    }

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        reset(data);
    }, [data]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

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
    return (
        <main style={{padding: "100px"}}>
            <div className="text-center">
                <h1>Thông tin tài khoản</h1>
            </div>
            <div className="container" style={{marginTop: "50px"}}>
                <Box sx={{width: '100%'}}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Thông tin cá nhân" {...a11yProps(0)} />
                            <Tab label="Lịch sử xét nghiệm" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <div className="row">
                            <div className="col-6">
                                <div className="mb-3">
                                    <label className="form-label">Số điện thoại</label>
                                    <input type="number"
                                           disabled
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
                                    <label className="form-label">Email</label>
                                    <input type="email"
                                           disabled
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
                                    <label className="form-label">Địa chỉ</label>
                                    <input
                                        disabled
                                        className={errors.address ? 'form-control is-invalid' : 'form-control'}
                                        {...register("address", {required: 'Họ và tên là bắt buộc!'})}
                                    />
                                    <p style={{color: "red"}}>{errors.address?.message}</p>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="mb-3">
                                    <label className="form-label">Họ và tên</label>
                                    <input
                                        disabled
                                        className={errors.name ? 'form-control is-invalid' : 'form-control'}
                                        {...register("name", {required: 'Họ và tên là bắt buộc!'})}
                                    />
                                    <p style={{color: "red"}}>{errors.name?.message}</p>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Ngày sinh</label>
                                    <input type="date"
                                           disabled
                                           className={errors.date ? 'form-control is-invalid' : 'form-control'}
                                           {...register("date", {required: 'Ngày sinh là bắt buộc!'})}
                                    />
                                    <p style={{color: "red"}}>{errors.date?.message}</p>
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
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <table className="table table-bordered table-striped">
                            <thead>
                            <tr>
                                <th scope="col">Mã đơn đăng ký</th>
                                <th scope="col">Tên người đăng ký</th>
                                <th scope="col">Ngày khởi tạo</th>
                                <th scope="col">Trạng thái</th>
                                <th scope="col">Thời gian cập nhật</th>
                            </tr>
                            </thead>
                            <tbody className="table-group-divider">
                            {listRegis.map((item) => (
                                <tr>
                                    <th>
                                        <Link to={"/patient/regis-detail/" + item.id}>
                                            {item.id}
                                        </Link>
                                    </th>
                                    <td>{item.user_name}</td>
                                    <td>{moment(item.created_at).format('HH:mm DD-MM-YYYY')}</td>
                                    <td>{status(item)}</td>
                                    <td>{moment(item.updated_at).format('HH:mm DD-MM-YYYY')}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </TabPanel>
                </Box>
            </div>
        </main>
    )
}

export default Profile;