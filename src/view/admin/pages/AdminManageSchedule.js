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
const AdminManageSchedule = () => {
    const [data, setData] = useState([])
    const [countUser, setCountUser] = useState(0);

    const getData = () => {
        axios.get('/hospital/admin/get-list-schedule').then((response) => {
            const data = JSON.parse(atob(response.data))
            setData(data.list_schedule)
            console.log(data.list_schedule)
            setCountUser(data.list_schedule.length)
        })
    }
    useEffect(() => {
        getData()
    }, [])


    var list_items = [];
    if(data != null){
        list_items = data.map((item) => (
            <tr key={item.id}>
                <th th scope="row"><Link to={"/admin/manage-schedule/" + item.id}>
                    {item.id}
                </Link></th>
                <td>{item.registration_id}</td>
                <td>{item.name}</td>
                <td>{item.time} {item.date}</td>
                <td>{moment(item.created_at).format('HH:mm DD-MM-YYYY')}</td>
            </tr>
        ))
    }

    return (
        <div className="box">
            <label className="mb-3 h3" >Tổng số lượng lịch khám: {countUser}</label>
            <div className="mb-3 hstack gap-3 mt-3" >
            </div>
            <table className="table table-striped table-hover table-bordered">
                <thead>
                <tr>
                    <th scope="col">Mã lịch khám</th>
                    <th scope="col">Mã đơn đăng ký xét nghiệm</th>
                    <th scope="col">Tên chi nhánh</th>
                    <th scope="col">Thời gian đăng ký khám</th>
                    <th scope="col">Ngày tạo</th>
                </tr>
                </thead>
                <tbody>
                {list_items}
                </tbody>
            </table>

        </div>
    )
}
export default AdminManageSchedule;