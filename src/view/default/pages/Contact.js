import banner from "../../../assets/banner1.png";

const Contact = () => {
    return (
        <main>
            <div style={{width:"100%",height:"600px"}}>
                <img src={banner} alt={"..."} style={{width:"100%",height:"100%"}}/>
            </div>
            <div style={{width:"100%", backgroundColor: "white", height:"600px"}}>
                <div className={"container"} style={{padding: '100px'}}>
                    <h3>LIÊN HỆ HỢP TÁC</h3>
                    <hr/>
                    <p style={{color:"#008000"}}>1. Liên hệ hợp tác quốc tế</p>
                    <p>Ms. Vũ Phương Mai</p>
                    <p>Email: Maivp1@hongngochospital.vn</p>
                    <p>Tel: 024 3927 5568 ext *2263</p>
                    <p style={{color:"#008000"}}>2. Liên hệ hợp tác quốc tế</p>
                    <p>Mr. Trần Đức Duy</p>
                    <p>Email: duytd@hongngochospital.vn</p>
                    <p>Tel: 024 3927 5568 ext*2248</p>
                </div>
            </div>
        </main>
    )
}

export default Contact;