import Slider1 from '../../../assets/slider1.jpg'
import Slider2 from '../../../assets/slider2.jpg'
import Slider3 from '../../../assets/slider3.jpg'
import Image1 from '../../../assets/goi-phat-hien-benh-ly.jpg'
import Image2 from '../../../assets/kham-benh-tai-nha.jpg'
import Image3 from '../../../assets/kham-doanh-nghiep.jpg'
import Image4 from '../../../assets/kham-suc-khoe-dinh-ky.jpg'
import Image5 from '../../../assets/noi-soi-tieu-hoa.jpg'
import Image6 from '../../../assets/tam-soat-ung-thu.jpg'
import Image7 from '../../../assets/thai-san-sinh-con-tron-goi.jpg'
import Image8 from '../../../assets/tiem-chung.jpg'
import icon1 from '../../../assets/icon-10.svg'
import icon2 from '../../../assets/icon-12.svg'
import icon3 from '../../../assets/icon-13.svg'
import icon4 from '../../../assets/icon-14.svg'
import logo from '../../../assets/logo.png'
import tintuc1 from '../../../assets/benh-co-tim-gian-2-540x300.png'
import tintuc2 from '../../../assets/cc06c84b7443ad1df452-540x300.jpg'
import tintuc3 from '../../../assets/thumb-ctkm-kham-pk-1.jpg'
import tintuc4 from '../../../assets/kham-thai-tuan-12-gom-nhung-gi-06-540x300.jpg'
import tintuc5 from '../../../assets/ksktq-1-540x300.png'
import tintuc6 from '../../../assets/goi-tiem-chung-1-540x300.jpg'
import tintuc7 from '../../../assets/benh-vien-hong-ngoc-my-dinh-tu-ben-ngoai-540x300.jpg'
import tintuc8 from '../../../assets/chung-chi-uc-540x300.jpg'
import tintuc9 from '../../../assets/pink-day-3-540x300.jpg'
import tintuc10 from '../../../assets/bao-tro-y-te-1-540x300.jpg'
import tintuc11 from '../../../assets/xay-cau-2-540x300.jpg'
import tintuc12 from '../../../assets/BV-hong-ngoc-hop-tac-VNA-1-540x300.jpg'
import tintuc13 from '../../../assets/sot-xuat-huyet-1-540x300.jpg'
import tintuc14 from '../../../assets/noi-soi-tieu-hoa-khong-dau-4-540x300.jpg'
import tintuc15 from '../../../assets/vpbank-marathon-hong-ngoc-2-540x300.jpg'



import {HorizontalRule} from '@mui/icons-material';
import Carousel from "../../../components/Carousel";
import {Box, Tab, Tabs, Typography} from "@mui/material";
import * as PropTypes from "prop-types";
import {useState} from "react";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
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

const HomePage = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <main>
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="true" style={{height:"600px"}}>
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                            className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                            aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                            aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active" style={{height : "600px"}}>
                       <img src={Slider2} style={{width:'100%' , height: '100%'}}/>
                    </div>
                    <div className="carousel-item" style={{height : "600px"}}>
                        <img src={Slider1} style={{width:'100%' , height: '100%'}}/>
                    </div>
                    <div className="carousel-item" style={{height : "600px"}}>
                        <img src={Slider3} style={{width:'100%' , height: '100%'}}/>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            <div style={{width:"100%", backgroundColor: "white", height:"700px"}}>
                <div className={"container"} style={{padding: '100px'}}>
                    <div className={"row"}>
                        <div className={"col-3"}>
                            <h3>DỊCH VỤ BỆNH VIỆN</h3>
                            <p style={{ textAlign: "justify"}}>Thăm khám và điều trị tại Bệnh viện Đa khoa KMA, khách hàng sẽ được trải nghiệm các dịch vụ chăm sóc sức khỏe chất lương cao đạt tiêu chuẩn quốc tế.</p>
                        </div>
                        <div className={"col-9"}>
                            <Carousel
                                show={3}
                            >
                                <div>
                                    <div style={{padding: 8}}>
                                        <img src={Image1} alt="placeholder" style={{width: '100%'}} />
                                        <p style={{marginTop: '20px'}}><HorizontalRule style={{color:'#00BB6D'}}/>Gói khám phát hiện bệnh lý</p>
                                    </div>
                                </div>
                                <div>
                                    <div style={{padding: 8}}>
                                        <img src={Image2} alt="placeholder" style={{width: '100%'}} />
                                        <p style={{marginTop: '20px'}}><HorizontalRule style={{color:'#00BB6D'}}/>Khám bệnh tại nhà</p>
                                    </div>
                                </div>
                                <div>
                                    <div style={{padding: 8}}>
                                        <img src={Image3} alt="placeholder" style={{width: '100%'}} />
                                        <p style={{marginTop: '20px'}}><HorizontalRule style={{color:'#00BB6D'}}/>Khám sức khỏe định kỳ</p>
                                    </div>
                                </div>
                                <div>
                                    <div style={{padding: 8}}>
                                        <img src={Image4} alt="placeholder" style={{width: '100%'}} />
                                        <p style={{marginTop: '20px'}}><HorizontalRule style={{color:'#00BB6D'}}/>Khám sức khỏe doanh nghiệp</p>
                                    </div>
                                </div>
                                <div>
                                    <div style={{padding: 8}}>
                                        <img src={Image5} alt="placeholder" style={{width: '100%'}} />
                                        <p style={{marginTop: '20px'}}><HorizontalRule style={{color:'#00BB6D'}}/>Nội soi tiêu hóa</p>
                                    </div>
                                </div>
                                <div>
                                    <div style={{padding: 8}}>
                                        <img src={Image6} alt="placeholder" style={{width: '100%'}} />
                                        <p style={{marginTop: '20px'}}><HorizontalRule style={{color:'#00BB6D'}}/>Tầm soát ung thư</p>
                                    </div>
                                </div>
                                <div>
                                    <div style={{padding: 8}}>
                                        <img src={Image7} alt="placeholder" style={{width: '100%'}} />
                                        <p style={{marginTop: '20px'}}><HorizontalRule style={{color:'#00BB6D'}}/>Thai sản và sinh con trọn gói</p>
                                    </div>
                                </div>
                                <div>
                                    <div style={{padding: 8}}>
                                        <img src={Image8} alt="placeholder" style={{width: '100%'}} />
                                        <p style={{marginTop: '20px'}}><HorizontalRule style={{color:'#00BB6D'}}/>Tiêm chủng</p>
                                    </div>
                                </div>
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"solieu"} style={{width:"100%", height:"700px"}}>
                <div className={"container"} style={{padding: '100px'}}>
                    <div className={"row"}>
                        <div className={"col-6"}>
                            <h3>SỐ LIỆU NỔI BẬT</h3>
                            <div className={"row"} style={{marginTop:"50px"}}>
                                <div className={"row"}>
                                    <div className={"col-6"}>
                                        <div className="card">
                                            <div className="card-body row">
                                                <div className={"col-3"} style={{margin:"auto"}}>
                                                    <img src={icon1}/>
                                                </div>
                                                <div className={"col-9"} >
                                                    <div className="card-body" >
                                                        <h3 className="card-title">19</h3>
                                                        <p className="card-text">Năm thành lập</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"col-6"}>
                                        <div className="card">
                                            <div className="card-body row">
                                                <div className={"col-3"} style={{margin:"auto"}}>
                                                    <img src={icon2}/>
                                                </div>
                                                <div className={"col-9"} >
                                                    <div className="card-body" >
                                                        <h3 className="card-title">206</h3>
                                                        <p className="card-text">Chuyên gia</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={"row"} style={{marginTop:"50px"}}>
                                    <div className={"col-6"}>
                                        <div className="card">
                                            <div className="card-body row">
                                                <div className={"col-3"} style={{margin:"auto"}}>
                                                    <img src={icon3}/>
                                                </div>
                                                <div className={"col-9"} >
                                                    <div className="card-body" >
                                                        <h3 className="card-title">821.000</h3>
                                                        <p className="card-text">Bệnh nhân</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"col-6"}>
                                        <div className="card">
                                            <div className="card-body row">
                                                <div className={"col-3"} style={{margin:"auto"}}>
                                                    <img src={icon4}/>
                                                </div>
                                                <div className={"col-9"} >
                                                    <div className="card-body" >
                                                        <h3 className="card-title">7</h3>
                                                        <p className="card-text">Cơ sở</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"col-6"}>
                            <div className="card" style={{height:"397px"}}>
                                <div className="card-body" >
                                    <h4 className="card-title" style={{ textAlign: "justify"}}>Từ những ngày đầu đi vào hoạt động, bệnh viện đã từng bước tạo dựng uy tín và danh tiếng – khách sạn tiên phong ở Hà Nội cũng như toàn khu vực miền Bắc.</h4>
                                    <div className={"row"}>
                                        <div className={"col-6"}>
                                            <img src={logo} style={{ width: "100%"}}/>
                                        </div>
                                        <div className={"col-6"} style={{ textAlign: "justify"}}>
                                            Với đội ngũ bác sĩ giỏi chuyên môn, liên tục cập nhật những phương pháp điều trị hiện đại, Bệnh viện KMA luôn không ngừng phấn đấu để khẳng định sứ mệnh lớn lao mà mình theo đuổi bằng việc trở thành hệ thống y tế tư nhân hàng đầu Việt Nam.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{width:"100%", backgroundColor: "white", height:"1200px"}}>
                <div className={"container"} style={{padding: '100px'}}>
                    <h3>TIN TỨC HOẠT ĐỘNG</h3>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" indicatorColor="primary" textColor="primary">
                            <Tab label="Tin tức" {...a11yProps(0)} />
                            <Tab label="Hoạt động" {...a11yProps(1)} />
                            <Tab label="Ưu đãi" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <div className={"row"}>
                            <div className={"col-4"}>
                                <div className="card" style={{border:"none"}}>
                                    <img src={tintuc1} className="card-img-top" />
                                        <div className="card-body">
                                            <h4 className={"card-title"} style={{ textAlign: "justify"}}>Từ mệt mỏi, khó thở hóa bệnh lý tim mạch di truyền</h4>
                                            <p className="card-text" style={{ textAlign: "justify"}}>Bệnh nhân V.T.A 34 tuổi được phát hiện lần đầu đi khám bệnh với chẩn đoán: Bệnh cơ tim giãn mức độ nặng, nguyên nhân do di truyền từ mẹ. </p>
                                        </div>
                                </div>
                            </div>
                            <div className={"col-4"}>
                                <div className="card" style={{border:"none"}}>
                                    <img src={tintuc2} className="card-img-top" />
                                    <div className="card-body">
                                        <h4 className={"card-title"} style={{ textAlign: "justify"}}>BV KMA tiếp nhận nhiều bệnh nhân trung niên lần đầu siêu âm phát hiện mắc bệnh lý cấu trúc tim</h4>
                                        <p className="card-text" style={{ textAlign: "justify"}}>Trong thời gian qua, các bác sĩ chuyên khoa Tim mạch BVĐK KMA đã thăm khám, siêu âm tim và phát hiện nhiều vấn đề về cấu trúc tim...</p>
                                    </div>
                                </div>
                            </div>
                            <div className={"col-4"}>
                                <div className="card" style={{border:"none"}}>
                                    <img src={tintuc3} className="card-img-top" />
                                    <div className="card-body">
                                        <h4 className={"card-title"} style={{ textAlign: "justify"}}>Combo khám và siêu âm phụ khoa chỉ từ 300.000 VNĐ</h4>
                                        <p className="card-text" style={{ textAlign: "justify"}}>Từ 01/12 - 31/12/2022, BV KMA dành tặng ưu đãi khám phụ khoa hấp dẫn tới các chị em: miễn phí siêu âm sản/phụ khoa khi đăng ký khám...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"row"} style={{marginTop:"50px"}}>
                            <div className={"col-4"}>
                                <div className="card" style={{border:"none"}}>
                                    <img src={tintuc4} className="card-img-top" />
                                    <div className="card-body">
                                        <h4 className={"card-title"} style={{ textAlign: "justify"}}>Ưu đãi lớn nhất năm dành tặng mẹ và bé</h4>
                                        <p className="card-text" style={{ textAlign: "justify"}}>Lựa chọn thai sản và sinh con tại KMA, mẹ không chỉ được trải nghiệm hành trình sinh con nhẹ nhàng như đi nghỉ dưỡng mà còn được “rinh”...</p>
                                    </div>
                                </div>
                            </div>
                            <div className={"col-4"}>
                                <div className="card" style={{border:"none"}}>
                                    <img src={tintuc5} className="card-img-top" />
                                    <div className="card-body">
                                        <h4 className={"card-title"} style={{ textAlign: "justify"}}>[Tháng 12] Ưu đãi Tiêm chủng trọn gói lên tới 2,5 triệu đồng dành cho mọi lứa tuổi</h4>
                                        <p className="card-text" style={{ textAlign: "justify"}}>Từ 01/12 - 31/12/2022, quý khách hàng sẽ được nhận ưu đãi lên tới 2,5 triệu đồng khi đăng ký các gói tiêm chủng tại KMA. Các gói tiêm giúp...</p>
                                    </div>
                                </div>
                            </div>
                            <div className={"col-4"}>
                                <div className="card" style={{border:"none"}}>
                                    <img src={tintuc6} className="card-img-top" />
                                    <div className="card-body">
                                        <h4 className={"card-title"} style={{ textAlign: "justify"}}>Ưu đãi lớn cuối năm: Giảm 25% tất cả các gói Khám sức khỏe tổng quát tại 2 cơ sở Yên Ninh và Savico</h4>
                                        <p className="card-text" style={{ textAlign: "justify"}}>Từ 10/11/2022 - 25/12/2022 Bệnh viện Đa khoa KMA triển khai chương trình ưu đãi khám sức khỏe cực kỳ hấp dẫn dành tặng quý khách hàng tại 2...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <div className={"row"}>
                            <div className={"col-4"}>
                                <div className="card" style={{border:"none"}}>
                                    <img src={tintuc7} className="card-img-top" />
                                    <div className="card-body">
                                        <h4 className={"card-title"} style={{ textAlign: "justify"}}>Bệnh viện Đa khoa KMA – Phúc Trường Minh: Bệnh viện xanh – thông minh – tiêu chuẩn Anh Quốc giữa lòng Hà Nội</h4>
                                        <p className="card-text" style={{ textAlign: "justify"}}>Bệnh viện Đa khoa KMA - Phúc Trường Minh sẽ là bệnh viện thông minh với tỷ lệ phủ xanh lên đến 45%. Đây là bệnh viện đầu tiên...</p>
                                    </div>
                                </div>
                            </div>
                            <div className={"col-4"}>
                                <div className="card" style={{border:"none"}}>
                                    <img src={tintuc8} className="card-img-top" />
                                    <div className="card-body">
                                        <h4 className={"card-title"} style={{ textAlign: "justify"}}>Khoa Sản phụ khoa BVĐK KMA – Đơn vị đầu tiên tại Việt Nam nhận chứng chỉ chăm sóc sức khỏe từ ACHSI (Úc)</h4>
                                        <p className="card-text" style={{ textAlign: "justify"}}>Vượt qua các tiêu chuẩn kiểm định quốc tế nghiêm ngặt của Hội đồng Úc về Chăm sóc sức khỏe (ACHSI), Khoa Sản Phụ khoa BVĐK KMA Phúc Trường...</p>
                                    </div>
                                </div>
                            </div>
                            <div className={"col-4"}>
                                <div className="card" style={{border:"none"}}>
                                    <img src={tintuc9} className="card-img-top" />
                                    <div className="card-body">
                                        <h4 className={"card-title"} style={{ textAlign: "justify"}}>20/10 ngày hội áo hồng – Khi cộng đồng cùng chung tay đẩy lùi ung thư vú</h4>
                                        <p className="card-text" style={{ textAlign: "justify"}}>“Ngày hội áo hồng - Pinkday” là một sự kiện đặc biệt diễn ra tại bệnh viện Đa Khoa KMA đúng vào 20/10. Đây là dịp để lan tỏa...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"row"} style={{marginTop:"50px"}}>
                            <div className={"col-4"}>
                                <div className="card" style={{border:"none"}}>
                                    <img src={tintuc10} className="card-img-top" />
                                    <div className="card-body">
                                        <h4 className={"card-title"} style={{ textAlign: "justify"}}>BV KMA bảo trợ y tế cho giải chạy VMM 2022 dưới những cung đường vô cùng khắc nghiệt</h4>
                                        <p className="card-text" style={{ textAlign: "justify"}}>Từ ngày 09 - 11/09/2022, tại vùng đất Sapa xinh đẹp nhưng đầy khắc nghiệt, giải chạy VMM – cuộc chạy bộ khó nhất tại Việt Nam đã diễn ra...</p>
                                    </div>
                                </div>
                            </div>
                            <div className={"col-4"}>
                                <div className="card" style={{border:"none"}}>
                                    <img src={tintuc11} className="card-img-top" />
                                    <div className="card-body">
                                        <h4 className={"card-title"} style={{ textAlign: "justify"}}>Khánh thành thêm 5 cây cầu dân sinh tại tỉnh Bắc Kạn do BV KMA tài trợ</h4>
                                        <p className="card-text" style={{ textAlign: "justify"}}>Trong hai ngày 30-31/7 vừa qua, thêm 5 cây cầu được Bệnh viện KMA tài trợ xây dựng tại các huyện miền núi tỉnh Bắc Kạn đã được khánh...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <div className={"row"}>
                            <div className={"col-4"}>
                                <div className="card" style={{border:"none"}}>
                                    <img src={tintuc12} className="card-img-top" />
                                    <div className="card-body">
                                        <h4 className={"card-title"} style={{ textAlign: "justify"}}>BV KMA và Vietnam Airlines ký kết hợp tác chương trình chăm sóc sức khỏe cho Hội viên Bông Sen Vàng</h4>
                                        <p className="card-text" style={{ textAlign: "justify"}}>Ngày 25/7/2022, Bệnh viện đa khoa KMA chính thức ký kết với Tổng Công ty Hàng không Việt Nam, triển khai hợp tác chương trình chăm sóc sức khỏe...</p>
                                    </div>
                                </div>
                            </div>
                            <div className={"col-4"}>
                                <div className="card" style={{border:"none"}}>
                                    <img src={tintuc13} className="card-img-top" />
                                    <div className="card-body">
                                        <h4 className={"card-title"} style={{ textAlign: "justify"}}>Bệnh viện KMA bảo trợ y tế cho giải chạy Cúc Phương Jungle Paths 2022</h4>
                                        <p className="card-text" style={{ textAlign: "justify"}}>Ngày 3/4 vừa qua, giải chạy Cúc Phương Jungle Paths 2022 đã diễn ra thành công tốt đẹp sau nhiều lần bị trì hoãn do dịch COVID-19. Đóng góp cho...</p>
                                    </div>
                                </div>
                            </div>
                            <div className={"col-4"}>
                                <div className="card" style={{border:"none"}}>
                                    <img src={tintuc14} className="card-img-top" alt='...'/>
                                    <div className="card-body">
                                        <h4 className={"card-title"} style={{ textAlign: "justify"}}>BV KMA cùng Tổ chức Newborns Vietnam trao tặng trang thiết bị y tế cho BVĐK Hoài Đức </h4>
                                        <p className="card-text" style={{ textAlign: "justify"}}>Ngày 29/3/2022, Bệnh viện KMA phối hợp với Tổ chức Newborns Vietnam trao tặng trang thiết bị y tế trị giá 60 triệu đồng cho khoa Nhi và khoa...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"row"} style={{marginTop:"50px"}}>
                            <div className={"col-4"}>
                                <div className="card" style={{border:"none"}}>
                                    <img src={tintuc15} className="card-img-top" />
                                    <div className="card-body">
                                        <h4 className={"card-title"} style={{ textAlign: "justify"}}>CẢNH GIÁC với dịch sốt xuất huyết thời điểm giao mùa</h4>
                                        <p className="card-text" style={{ textAlign: "justify"}}>Sốt xuất huyết nằm trong danh sách những bệnh truyền nhiễm phổ biến, xảy ra theo mùa và gây ra biến chứng nguy hiểm đến tính mạng người bệnh nếu...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                </div>
            </div>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14899.780020153135!2d105.7885517395508!3d20.994841500000014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad71823522ff%3A0xd2860c841ad219d0!2zUGjDsm5nIGtow6FtIMSRYSBraG9hIEjhu5NuZyBOZ-G7jWMgTmd1eeG7hW4gdHXDom4!5e0!3m2!1svi!2s!4v1671004103391!5m2!1svi!2s" allowFullScreen="" loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{width:"100%", height:"500px", border:"0"}}>
            </iframe>
        </main>
    )
}

export default HomePage;