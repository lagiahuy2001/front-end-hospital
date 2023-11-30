import React from "react";
import {Dashboard, ManageAccounts, Timeline} from '@mui/icons-material';
import {Link, useLocation} from "react-router-dom";

const AdminDashboard = () => {
    const location = useLocation();

    return(
        <div className="dashboard">
            <div className="dashboardWrapper">
                <div className="dashboardMenu">
                    <h3 className="dashboardTitle">Dashboard</h3>
                    <hr/>
                    <ul className="dashboardList">
                        <Link to="/admin" className="link">
                            <li className={location.pathname == "/admin" ? "dashboardItem active" : "dashboardItem"}>
                                <Dashboard className="dashboardIcon"/>
                                Home
                            </li>
                        </Link>
                        <Link to="/admin/manage-user" className="link">
                            <li className={location.pathname.endsWith("manage-user") ? "dashboardItem active" : "dashboardItem"}>
                                <ManageAccounts className="dashboardIcon"/>
                                Quản lý người dùng
                            </li>
                        </Link>
                        <Link to="/admin/manage-registration" className="link">
                            <li className={location.pathname.endsWith("manage-registration") ? "dashboardItem active" : "dashboardItem"}>
                                <Timeline className="dashboardIcon"/>
                                Quản lý đơn đăng ký
                            </li>
                        </Link>
                        <Link to="/admin/manage-service" className="link">
                            <li className={location.pathname.endsWith("manage-service") ? "dashboardItem active" : "dashboardItem"}>
                                <Timeline className="dashboardIcon"/>
                                Quản lý dịch vụ
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard;