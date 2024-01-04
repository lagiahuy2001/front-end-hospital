import {useNavigate} from "react-router-dom";

const Page404 = () => {
    const navigate = useNavigate();
    const gotoHome = () => {
        navigate("/")
    }
    return (
        <div>
            Page Not Found
            <button className="btn btn-success" onClick={gotoHome}>Trở về</button>
        </div>
    )
}

export default Page404;