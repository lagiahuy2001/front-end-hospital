import banner from '../../../assets/banneb.png'

const Guide = () => {
    return (
        <main>
            <div style={{width:"100%",height:"600px"}}>
                <img src={banner} alt={"..."} style={{width:"100%",height:"100%"}}/>
            </div>
            <div style={{width:"100%", backgroundColor: "white", height:"600px"}}>
                <div className={"container"} style={{padding: '100px'}}>
                    <h3>HƯỚNG DẪN KHÁCH HÀNG</h3>
                    <hr/>
                    <p>Để tạo điều kiện thuận lợi cho quý khách hàng khi tới thăm khám, an tâm trải nghiệm các dịch vụ y tế
                        – chăm sóc sức khỏe, Bệnh viện KMA trân trọng gửi tới tất cả quý khách hàng một số hướng dẫn về:</p>
                    <ul>
                        <li>Nội quy bệnh viện</li>
                        <li>Quy trình thăm khám</li>
                        <li>Thủ tục xuất – nhập viện</li>
                        <li>Tiện ích bệnh viện</li>
                        <li>Một số câu hỏi thường gặp về khám chữa bệnh</li>
                    </ul>
                    <p>Hoặc để biết thêm thông tin chi tiết về các dịch vụ của bệnh viện, quý khách hàng vui lòng liên hệ số
                        0383838798 để được hỗ trợ</p>
                </div>
            </div>
        </main>
    )
}

export default Guide;