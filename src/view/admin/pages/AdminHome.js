import {
    ResponsiveContainer,
    AreaChart,
    XAxis,
    YAxis,
    Area,
    Tooltip,
    CartesianGrid,
} from "recharts";
import {useEffect, useState} from "react";
import axios from '../../../plugins/axios'

const AdminHome = () => {
    const [data, setData] = useState([])
    const getData = () => {
        axios.get('/hospital/admin/statistics-now-year').then((response) => {
            setData(response.data)
        })
    }

    useEffect(() => {
        getData();
    }, [])

    const total = () => {
        let price = 0;
        data.map((item) => {
            price += item.value
        })
        return new Intl.NumberFormat().format(price ?? 0)
    }
    return(
        <div className="box">
            <h3 className={"mb-3"}>Tình hình tài chính năm {new Date().getFullYear()}</h3>
            <ResponsiveContainer width="100%" height={500}>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
                            <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
                        </linearGradient>
                    </defs>
                    <Area dataKey="value" stroke="#2451B7" fill="url(#color)" />
                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(str) => {
                            if (str % 3 === 0 ) {
                                return "Tháng " + str;
                            }
                            return "";
                        }}
                    />
                    <YAxis
                        datakey="value"
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(number) => {if(number != 0){
                            // return `${new Intl.NumberFormat().format(number)}`
                            return `${new Intl.NumberFormat().format(number ?? 0)}`
                        } else{return ''}
                        }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <CartesianGrid opacity={0.5} vertical={false}/>
                </AreaChart>
            </ResponsiveContainer>
            <h5 className={"mb-3"}>Tổng đơn đăng ký: </h5>
            <h5 className={"mb-3"}>Tổng doanh thu: {total()} VND</h5>
        </div>
    )
}
export default AdminHome;

const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
        return (
            <div style={{borderRadius: "0.25rem",
                background: "#26313c",
                color: "#fff",
                padding: "1rem",
                boxShadow: "15px 30px 40px 5px rgba(0, 0, 0, 0.5)",
                textAlign: "center"}}>
                <h4>Tháng {label}</h4>
                <p>{new Intl.NumberFormat().format(payload[0].value ?? 0)} VND</p>
            </div>
        );
    }
    return null;
}