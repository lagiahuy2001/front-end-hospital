import logo from '../../assets/logo.png'
import {LocationOn, LocalPhone, VerifiedUser, WorkspacePremium, Facebook, Instagram, Twitter, LinkedIn} from '@mui/icons-material';
const Footer = () => {

    return (
        <footer style={{borderBlockStart: "solid 1px #008000"}}>
            <div style={{padding: '100px'}}>
                <div className="row container-fluid">
                    <div className="col-4">
                        <div className="text-center">
                            <img src={logo}/>
                        </div>
                        <h4>CÔNG TY TNHH BỆNH VIỆN HỒNG NGỌC</h4>
                        <p><VerifiedUser/> MST/ĐKKD/QĐTL: 0106699074 - Sở Kế hoạch và Đầu tư thành phố Hà Nội cấp ngày 05/06/2003</p>
                        <p><WorkspacePremium/> Giấy phép hoạt động cơ sở khám chữa bệnh số 002960/HNO - CCHN. Ngày cấp: 27/11/2012</p>
                        <p><LocationOn/> Địa chỉ trụ sở: Số 55 Phố Yên Ninh Phường Trúc Bạch quận Ba Đình TP Hà Nội</p>
                    </div>
                    <div className="col-4">
                        <h5>BỆNH VIỆN ĐA KHOA HỒNG NGỌC</h5>
                        <p><LocationOn/> Số 55 Yên Ninh, phường Trúc Bạch, quận Ba Đình, Hà Nội</p>
                        <p><LocalPhone/> 024 3927 5568 ext 0</p>
                        <h5>PHÒNG KHÁM ĐA KHOA HỒNG NGỌC NGUYỄN TUÂN</h5>
                        <p><LocationOn/> Tầng 1-NO2-TTTM TNL Plaza GoldSeason, 47 Nguyễn Tuân, Thanh Xuân, Hà Nội</p>
                        <p><LocalPhone/> 024 3927 5568 ext 9</p>
                        <h5>PHÒNG KHÁM ĐA KHOA HỒNG NGỌC KEANGNAM</h5>
                        <p><LocationOn/> Tầng 10, Keangnam Landmark 72, Phạm Hùng, Hà Nội</p>
                        <p><LocalPhone/> 024 3927 5568 ext 8</p>
                    </div>
                    <div className="col-4">
                        <h5>PHÒNG KHÁM ĐA KHOA HỒNG NGỌC SAVICO</h5>
                        <p><LocationOn/> Tầng 3, tòa B, Savico Megamall, 07- 09 Nguyễn Văn Linh, Long Biên, Hà Nội</p>
                        <p><LocalPhone/> 024 3927 5568 ext 5</p>
                        <h5>PHÒNG KHÁM ĐA KHOA HỒNG NGỌC TỐ HỮU</h5>
                        <p><LocationOn/> Tầng 1 - HPC Landmark 105, Tố Hữu, La Khê, Hà Đông, Hà Nội</p>
                        <p><LocalPhone/> 024 3927 5568 ext 6</p>
                        <h5>PHÒNG KHÁM ĐA KHOA HỒNG NGỌC TÂY HỒ</h5>
                        <p><LocationOn/> Tầng 1, 2 & 3 - Kosmo Tây Hồ, 161 Xuân La, Bắc Từ Liêm, Hà Nội</p>
                        <p><LocalPhone/> 024 3927 5568 ext 3</p>
                    </div>
                </div>
                <div className="text-center">
                    <Facebook style={{fontSize: "2.5rem"}}/>
                    <Instagram style={{fontSize: "2.5rem"}}/>
                    <Twitter style={{fontSize: "2.5rem"}}/>
                    <LinkedIn style={{fontSize: "2.5rem"}}/>
                </div>
            </div>
            <div className="bottomFooter"></div>
        </footer>
    )
}
export default Footer;
