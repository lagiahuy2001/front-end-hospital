import axios from '../../../plugins/axios'
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

const StaffHome = () => {
    const [data, setData] = useState(null)

    useEffect(() => {
        axios.get('/hospital/staff/get-all-regis-by-staff').then((response) => {
            const data = JSON.parse(atob(response.data))
            setData(data.registration)
        })
    }, [])


    var list_items = [];
    if(data != null){
        list_items = data.map((item) => (
            <tr>
                <th th scope="row"><Link to={"/staff/registration/" + item.id}>
                    {item.id}
                </Link></th>
                <td>{item.user_name}</td>
                <td>{item.user_sex == 1 ? 'Nam' : 'Nữ'}</td>
                <td>{item.user_date}</td>
                <td>{item.user_phone}</td>
                <td>{item.date_appointment} {item.time_appointment}</td>
                <td>{item.address_appointment}</td>
                <td>{item.note}</td>
            </tr>
        ))
    }
        return(
            <div className="box">
                <table className="table table-striped table-hover table-bordered">
                    <thead>
                    <tr>
                        <th scope="col">Mã đơn đăng ký</th>
                        <th scope="col">Tên bệnh nhân</th>
                        <th scope="col">Giới tính</th>
                        <th scope="col">Ngày sinh</th>
                        <th scope="col">Số điện thoại</th>
                        <th scope="col">Thời gian hẹn</th>
                        <th scope="col">Địa chỉ hẹn</th>
                        <th scope="col">Lưu ý</th>
                    </tr>
                    </thead>
                    <tbody>
                    {list_items}
                    </tbody>
                </table>
            </div>
        )
}
export default StaffHome;