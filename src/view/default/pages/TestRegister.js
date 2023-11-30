import {
    HealthAndSafety,
    LocalConvenienceStore,
    PriceCheck,
    Speed,
    ExpandMore,
    LooksOne,
    LooksTwo,
    Looks3,
    Looks4
} from '@mui/icons-material';
import {Accordion, AccordionDetails, AccordionSummary, Button, Typography} from "@mui/material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";


const TestRegister = () => {
    const navigate = useNavigate();

    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <main>
            <div style={{width: "100%", backgroundColor: "white"}}>
                <div className={"container"} style={{padding: '100px'}}>
                    <h3>LẤY MẪU TẠI NHÀ</h3>
                    <hr/>
                    <p style={{textAlign: "justify"}}>Thấu hiểu về nhu cầu và mong muốn của khách hàng, Bệnh viện đa
                        khoa KMA cung cấp dịch vụ lấy mẫu xét nghiệm tại nhà, trả kết quả tận nơi và tư vấn trực tuyến
                        một cách nhanh nhất. Dịch vụ lấy mẫu xét nghiệm tại nhà xóa đi những e ngại của người đi xét
                        nghiệm khi phải chờ đợi, chen lấn, căng thẳng và đối mặt với các vấn đề tế nhị như: HIV, Lậu,
                        Giang mai... đặc biệt là những người già, trẻ nhỏ hay những người bận rộn. Hệ thống xét nghiệm
                        hiện đại, đạt tiêu chuẩn quốc tế ISO 15189:2012 và đội ngũ chuyên gia y tế hàng đầu trong lĩnh
                        vực xét nghiệm, chúng tôi cam kết khách hàng sẽ tuyệt đối hài lòng về chất lượng và thái độ phục
                        vụ của đội ngũ nhân viên.</p>
                    <p style={{color: "#008000"}}>1. Lợi ích của dịch vụ lấy mẫu xét nghiệm tại nhà</p>
                    <div className={"container"} style={{padding: '10px 50px 0 50px', marginBottom: "20px"}}>
                        <div className={"row"}>
                            <div className={"col-3"} style={{
                                backgroundColor: "#00BB6D",
                                color: "white",
                                paddingTop: "20px",
                                paddingBottom: "20px"
                            }}>
                                <div style={{width: "100%", textAlign: "center"}}>
                                    <HealthAndSafety style={{fontSize: "100px"}}/>
                                    <h3 style={{paddingBottom: "20px", paddingTop: "20px"}}>Bảo vệ sức khỏe</h3>
                                    <p style={{textAlign: "justify", padding: "0 10px"}}>Lấy máu xét nghiệm tại nhà giúp
                                        khách hàng chủ động tầm soát bệnh lý định kỳ, sớm phát hiện các bệnh lý bất
                                        thường để từ đó có hướng điều trị phù hợp. Bên cạnh đó, dịch vụ còn giúp người
                                        bệnh theo dõi tiến triển của một số bệnh lý chuyển hóa như: đường máu, mỡ máu,
                                        men gan, gout,… từ đó bệnh nhân có hướng điều chỉnh chế độ ăn uống và sinh hoạt
                                        hợp lý, nâng cao chất lượng sức khỏe.</p>
                                </div>
                            </div>
                            <div className={"col-3"} style={{
                                backgroundColor: "#14ae14",
                                color: "white",
                                paddingTop: "20px",
                                paddingBottom: "20px"
                            }}>
                                <div style={{width: "100%", textAlign: "center"}}>
                                    <LocalConvenienceStore style={{fontSize: "100px"}}/>
                                    <h3 style={{paddingBottom: "20px", paddingTop: "20px"}}>Tính tiện lợi</h3>
                                    <p style={{textAlign: "justify", padding: "0 10px"}}>Lấy mẫu xét nghiệm tại nhà giúp
                                        giảm thời gian đi lại, chờ đợi. Kết quả xét nghiệm sẽ được trả ngay tại nhà hoặc
                                        tra cứu kết quả trên website. Ngoài ra, lấy máu xét nghiệm tại nhà còn giúp giảm
                                        khả năng lây nhiễm chéo trong bệnh viện, người bệnh sau khi có kết quả xét
                                        nghiệm sẽ được bác sĩ gọi điện tư vấn bệnh lý và điều chỉnh chế độ ăn uống sinh
                                        hoạt (nếu có).</p>
                                </div>
                            </div>
                            <div className={"col-3"} style={{
                                backgroundColor: "#00BB6D",
                                color: "white",
                                paddingTop: "20px",
                                paddingBottom: "20px"
                            }}>
                                <div style={{width: "100%", textAlign: "center"}}>
                                    <PriceCheck style={{fontSize: "100px"}}/>
                                    <h3 style={{paddingBottom: "20px", paddingTop: "20px"}}>Chi phí hợp lý</h3>
                                    <p style={{textAlign: "justify", padding: "0 10px"}}>Giá dịch vụ xét nghiệm tại nhà
                                        được niêm yết theo đúng bảng giá khách hàng sử dụng dịch vụ tại bệnh viện và chỉ
                                        chỉ mất thêm phụ phí đi lại là 10.000đ/ lần lấy mẫu.</p>
                                </div>
                            </div>
                            <div className={"col-3"} style={{
                                backgroundColor: "#14ae14",
                                color: "white",
                                paddingTop: "20px",
                                paddingBottom: "20px"
                            }}>
                                <div style={{width: "100%", textAlign: "center"}}>
                                    <Speed style={{fontSize: "100px"}}/>
                                    <h3 style={{paddingBottom: "20px", paddingTop: "20px"}}>Nhanh chóng</h3>
                                    <p style={{textAlign: "justify", padding: "0 10px"}}>Sau khi nhận được lịch đặt của
                                        khách hàng, nhân viên lấy mẫu sẽ gọi điện xác nhận thời gian và địa chỉ lấy mẫu
                                        xét nghiệm, đồng thời đến đúng theo lịch. Ngoài ra, tùy từng xét nghiệm sẽ có
                                        thời gian trả kết quả khác nhau, với hệ thông trang thiết bị, máy móc xét nghiệm
                                        được đầu tư hiện đại khách hàng sẽ nhận được kết quả chỉ từ 2 giờ.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p style={{color: "#008000"}}>2. Vì sao nên chọn dịch vụ xét nghiệm tại nhà của KMA</p>
                    <div style={{padding: "0 37px", marginBottom: "20px"}}>
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <AccordionSummary
                                expandIcon={<ExpandMore/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                style={{backgroundColor: "#0000000d"}}
                            >
                                <Typography>- Kinh nghiệm</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Phát triển dịch vụ từ năm 1996, KMA là đơn vị tiên phong trong dịch vụ lấy mẫu xét
                                    nghiệm tận nơi. Với 25 năm kinh nghiệm và phục vụ hơn 2 triệu lượt khách hàng/năm,
                                    KMA là thương hiệu được hàng triệu người Việt tin dùng
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                            <AccordionSummary
                                expandIcon={<ExpandMore/>}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                                style={{backgroundColor: "#0000000d"}}
                            >
                                <Typography>- Quy mô</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Mạng lưới Trung tâm xét nghiệm đạt tiêu chuẩn quốc tế trải dài từ Bắc vào Nam, hiện
                                    đã có mặt tại 48 tỉnh thành trên cả nước.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                            <AccordionSummary
                                expandIcon={<ExpandMore/>}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                                style={{backgroundColor: "#0000000d"}}
                            >
                                <Typography>- Nhân lực</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    KMA quy tụ đội ngũ chuyên gia, bác sĩ đầu ngành trên cả nước phục vụ đọc và tư vấn
                                    kết quả xét nghiệm. Ngoài ra còn có hơn 300 nhân viên lấy mẫu chuyên nghiệp, có
                                    chứng chỉ hành nghề phục vụ lấy mẫu xét nghiệm tận nơi.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                            <AccordionSummary
                                expandIcon={<ExpandMore/>}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                                style={{backgroundColor: "#0000000d"}}
                            >
                                <Typography>- Đối tượng</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    KMA đáp ứng hơn 1000 loại xét nghiệm từ cơ bản đến chuyên sâu bao gồm: xét nghiệm
                                    sinh hó a cơ bản, sinh học phân tử, giải mã gen, vi sinh, di truyền, tế bào giải
                                    phẫu bệnh,... </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                            <AccordionSummary
                                expandIcon={<ExpandMore/>}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                                style={{backgroundColor: "#0000000d"}}
                            >
                                <Typography>- Chi phí</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Giá xét nghiệm niêm yết, thực hiện tại nhà hay tại bệnh viện giá đều không đổi, chỉ
                                    mất thêm chi phí đi lại 10.000 đồng/lần lấy mẫu. </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                            <AccordionSummary
                                expandIcon={<ExpandMore/>}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                                style={{backgroundColor: "#0000000d"}}
                            >
                                <Typography>- Giờ giấc phục vụ</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Phục vụ tất cả các ngày trong tuần, kể cả ngày Lễ, Tết từ 6:00-22:00 hàng
                                    ngày. </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
                            <AccordionSummary
                                expandIcon={<ExpandMore/>}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                                style={{backgroundColor: "#0000000d"}}
                            >
                                <Typography>- Trả kết quả</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Kết quả xét nghiệm được trả tận nơi theo yêu cầu của khách hàng hoặc tra cứu trên
                                    website. </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
                            <AccordionSummary
                                expandIcon={<ExpandMore/>}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                                style={{backgroundColor: "#0000000d"}}
                            >
                                <Typography>- Lưu trữ hồ sơ</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Hồ sơ khám chữa bệnh của khách hàng được lưu trữ trực tuyến trên trang thông tin
                                    điện tử của bệnh viện giúp thể tra cứu mọi lúc, mọi nơi. Thông tin được bảo mật
                                    tuyệt đối. </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel9'} onChange={handleChange('panel9')}>
                            <AccordionSummary
                                expandIcon={<ExpandMore/>}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                                style={{backgroundColor: "#0000000d"}}
                            >
                                <Typography>- Tư vấn kết quả</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Bác sĩ sẽ gọi điện tư vấn cho khách hàng ngay sau khi có kết quả, nếu có bất thường
                                    sẽ đưa ra lời khuyên phù hợp cho bệnh nhân. </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                    <p style={{color: "#008000"}}>3. Các bước thực hiện lấy mẫu xét nghiệm tại nhà</p>
                    <div className={"container"} style={{padding: '10px 50px 0 50px', marginBottom: "20px"}}>
                        <div className={"row"}>
                            <div className={"col-6"} style={{paddingTop: "20px", paddingBottom: "20px"}}>
                                <div className={"row"} style={{width: "100%"}}>
                                    <div className={"col-3"} style={{margin: "auto"}}>
                                        <LooksOne style={{fontSize: "100px"}}/>
                                    </div>
                                    <div className={"col-9"}>
                                        <h3 style={{paddingBottom: "20px", paddingTop: "20px"}}>Đăng ký lịch hẹn</h3>
                                        <p>- Qua tổng đài</p>
                                        <p>- Qua website</p>
                                    </div>
                                </div>
                            </div>
                            <div className={"col-6"} style={{paddingTop: "20px", paddingBottom: "20px"}}>
                                <div className={"row"} style={{width: "100%"}}>
                                    <div className={"col-3"} style={{margin: "auto"}}>
                                        <LooksTwo style={{fontSize: "100px"}}/>
                                    </div>
                                    <div className={"col-9"}>
                                        <h3 style={{paddingBottom: "20px", paddingTop: "20px"}}>Cán bộ đến lấy mẫu</h3>
                                        <p>(Theo yêu cầu của khách hàng)</p>
                                    </div>
                                </div>
                            </div>
                            <div className={"col-6"} style={{paddingTop: "20px", paddingBottom: "20px"}}>
                                <div className={"row"} style={{width: "100%"}}>
                                    <div className={"col-3"} style={{margin: "auto"}}>
                                        <Looks3 style={{fontSize: "100px"}}/>
                                    </div>
                                    <div className={"col-9"}>
                                        <h3 style={{paddingBottom: "20px", paddingTop: "20px"}}>Trả kết quả</h3>
                                        <p>- Trả kết quả qua email</p>
                                        <p>- Tra cứu trên website</p>
                                        <p>- Trả tận nơi</p>
                                    </div>
                                </div>
                            </div>
                            <div className={"col-6"} style={{paddingTop: "20px", paddingBottom: "20px"}}>
                                <div className={"row"} style={{width: "100%"}}>
                                    <div className={"col-3"} style={{margin: "auto"}}>
                                        <Looks4 style={{fontSize: "100px"}}/>
                                    </div>
                                    <div className={"col-9"}>
                                        <h3 style={{paddingBottom: "20px", paddingTop: "20px"}}>Tư vấn kết quả</h3>
                                        <p style={{textAlign: "justify"}}>Ngay khi có đầy đủ kết quả, khách hàng sẽ được
                                            các Giáo sư, Thạc sỹ giàu kinh nghiệm tư vấn về kết quả và đưa ra chế độ
                                            dinh dưỡng hợp lý</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{width: "100%", height: "150px", textAlign: "center"}}>
                    <Button variant="contained" color="success" onClick={() => navigate('/login')} style={{
                        width: "40%",
                        height: "100px",
                        fontSize: "30px"}}>
                        Hãy đăng nhập để sử dụng dịch vụ
                    </Button>
                </div>
            </div>
        </main>
    )
}

export default TestRegister;