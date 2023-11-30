import TopBarDashboard from "../../components/TopBarDashboard";
import {Outlet} from "react-router-dom";
import AdminDashboard from "./AdminDashboard";

const AdminLayout = () => {
    return(
        <>
            <div className="layoutDashboard">
                <AdminDashboard/>
                <div className="mainDashboard">
                    <TopBarDashboard/>
                    <Outlet/>
                </div>
            </div>
        </>
    )
}
export default AdminLayout;