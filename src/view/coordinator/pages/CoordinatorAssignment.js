import {useEffect, useState} from "react";
import axios from '../../../plugins/axios'
import {statusLoginActions} from "../../../store/statusLoginSlice";
import {Link} from "react-router-dom";
import moment from "moment";

const CoordinatorAssignment = () => {
    const [data, setData] = useState(null)

    useEffect(() => {
        axios.get('/hospital/coordinator/all-regis-new').then((response) => {
            setData(response.data)
        })
    }, [])


    var list_items = [];
    if(data != null){
        list_items = data.map((item) => (
            <tr>
                <th th scope="row"><Link to={"" + item.id}>
                    {item.id}
                </Link></th>
                <td>{item.patient_id}</td>
                <td>{item.user_name}</td>
                <td>{item.user_phone}</td>
                <td>{item.refuse ? '1' : "0"}</td>
                <td>{moment(item.updated_at).format('HH:mm DD-MM-YYYY')}</td>
            </tr>
        ))
    }


    return(
        <div className="box">
            <table className="table table-striped table-hover table-bordered">
                <thead>
                <tr>
                    <th scope="col">Mã đơn đăng ký</th>
                    <th scope="col">Mã bệnh nhân</th>
                    <th scope="col">Tên bệnh nhân</th>
                    <th scope="col">Số điện thoại</th>
                    <th scope="col">Đã liên lạc</th>
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
export default CoordinatorAssignment;