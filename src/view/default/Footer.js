import logo from '../../assets/logo.png'
import {LocationOn, LocalPhone, VerifiedUser, WorkspacePremium, Facebook, Instagram, Twitter, LinkedIn} from '@mui/icons-material';
import axios from "../../plugins/axios";
import {useState} from "react";
const Footer = () => {
    const [clinic, setClinic] = useState([]);

    axios.get('/get-all-clinic').then((response) => {
        const data = JSON.parse(atob(response.data))
        setClinic(data.list_clinic)
    })
    return (
        <footer style={{borderBlockStart: "solid 1px #008000"}}>
            <div style={{padding: '100px'}}>
                <div className="row container-fluid">
                    <div className="col-4">
                        <div className="text-center mb-3">
                            <img src={logo} style={{height: "90px", width: "104px"}}/>
                        </div>
                        <h4>CÔNG TY TNHH BỆNH VIỆN </h4>
                        <p><VerifiedUser/> MST/ĐKKD/QĐTL: 0106699074 - Sở Kế hoạch và Đầu tư thành phố Hà Nội cấp ngày 05/06/2003</p>
                        <p><WorkspacePremium/> Giấy phép hoạt động cơ sở khám chữa bệnh số 002960/HNO - CCHN. Ngày cấp: 27/11/2012</p>
                        <p><LocationOn/> Địa chỉ trụ sở: Số 55 Phố Yên Ninh Phường Trúc Bạch quận Ba Đình TP Hà Nội</p>
                    </div>
                    <div className="col-8">
                        <div className="row">
                            {clinic.map((item, index) => <div key={index} className="col-6">
                                <h5>{item.name}</h5>
                                <p><LocationOn/> {item.address}</p>
                                <p><LocalPhone/> {item.phone}</p>
                            </div>)}
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottomFooter"></div>
        </footer>
    )
}
export default Footer;
