import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import axios from '../../../plugins/axios'
import {Link} from "react-router-dom";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import moment from "moment/moment";

const AdminManageRegistration = () => {
    const [data, setData] = useState(null)
    const [countRegis, setCountRegis] = useState(0);

    const getData = () => {
        setFill(4)
        setSearch('')
        axios.get('/hospital/get-registration').then((response) => {
            setData(response.data)
            setCountRegis(response.data.length)
        })
    }
    useEffect(() => {
        getData()
    }, [])
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
    var list_items = [];
    if(data != null){
        list_items = data.map((item) => (
            <tr key={item.id}>
                <th th scope="row"><Link to={"/admin/manage-registration/" + item.id}>
                    {item.id}
                </Link></th>
                <td>{item.patient_id != 0 ? item.patient_id : 'Không xác định'}</td>
                <td>{item.user_name}</td>
                <td>{item.user_phone}</td>
                <td>{status(item)}</td>
                <td>{moment(item.updated_at).format('HH:mm DD-MM-YYYY')}</td>
            </tr>
        ))
    }
    const [fill, setFill] = useState(0)
    const [search, setSearch] = useState('')

    const handleChangeFill = (event) => {
        setFill(event.target.value);
        setSearch('')
        if(event.target.value === 4){
            getData()
        }else {
            axios.get('/hospital/fill-regis-by-type/' + event.target.value).then((response) => {
                setData(response.data)
                setCountRegis(response.data.length)
            })
        }
    };

    const searchUser = (e) => {
        if(e.target.value == ''){
            getData()
        }else {
            setFill(4)
            setSearch(e.target.value)
            if(e.target.value != ''){
                axios.get('/hospital/search-regis/' + e.target.value).then((response) => {
                    setData(response.data)
                    setCountRegis(response.data.length)
                })
            }
        }

    }

    return(
        <div className="box">
            <label className="mb-3 h3" >Tổng số lượng đơn đăng ký: {countRegis}</label>
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
                        <MenuItem value={4}>Tất cả</MenuItem>
                        <MenuItem value={0}>Chờ xác nhận</MenuItem>
                        <MenuItem value={1}>Đợi lấy mẫu</MenuItem>
                        <MenuItem value={2}>Đợi kết quả xét nghiệm</MenuItem>
                        <MenuItem value={3}>Đã có kết quả</MenuItem>
                        <MenuItem value={5}>Bị hủy</MenuItem>
                    </Select>
                </FormControl>
                <TextField id="outlined-basic" label="Tìm kiếm" variant="outlined" className={"ms-auto"} onChange={searchUser} value={search}/>
            </div>
            <table className="table table-striped table-hover table-bordered">
                <thead>
                <tr>
                    <th scope="col">Mã đơn đăng ký</th>
                    <th scope="col">Mã bệnh nhân</th>
                    <th scope="col">Tên bệnh nhân</th>
                    <th scope="col">Số điện thoại</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col">Thời gian</th>
                </tr>
                </thead>
                <tbody>
                {list_items}
                </tbody>
            </table>
        </div>
    )
}
export default AdminManageRegistration;