import {useNavigate} from "react-router-dom";

const Page404 = () => {
    const navigate = useNavigate();
    const gotoHome = () => {
        navigate("/")
    }
    return (
        <main>
            Page Not Found
            <button className="btn btn-success" onClick={gotoHome}>Trở về</button>
        </main>
    )
}

export default Page404;