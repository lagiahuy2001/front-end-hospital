import {useSelector} from "react-redux";
import axios from '../../../plugins/axios'
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

const TesterHome = () => {
    const [data, setData] = useState(null)

    useEffect(() => {
        axios.get('/hospital/tester/list-registration-service').then((response) => {
            setData(response.data)
        })
    }, [])


    var list_items = [];
    if(data != null){
        list_items = data.map((item) => (
            <tr>
                <th th scope="row"><Link to={"/tester/detail/" + item.id}>
                    {item.uuid}
                </Link></th>
                <td>{item.registration_id}</td>
                <td>{item.service_id}</td>
                <td>{item.patient_sex == 1 ? 'Nam' : 'Nữ'}</td>
                <td>{item.patient_date}</td>
            </tr>
        ))
    }
    return(
        <div className="box">
            <table className="table table-striped table-hover table-bordered">
                <thead>
                <tr>
                    <th scope="col">Mã mẫu</th>
                    <th scope="col">Mã đơn đăng ký</th>
                    <th scope="col">Mã chỉ định</th>
                    <th scope="col">Giới tính bệnh nhân</th>
                    <th scope="col">Ngày sinh bệnh nhân</th>
                </tr>
                </thead>
                <tbody>
                {list_items}
                </tbody>
            </table>
        </div>
    )
}
export default TesterHome;