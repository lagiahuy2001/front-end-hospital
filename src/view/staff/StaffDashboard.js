import React from "react";
import {Dashboard, LocalHospital} from '@mui/icons-material';
import {Link, useLocation} from "react-router-dom";

const StaffDashboard = () => {
    const location = useLocation();

    return(
        <div className="dashboard">
            <div className="dashboardWrapper">
                <div className="dashboardMenu">
                    <h3 className="dashboardTitle">Dashboard</h3>
                    <hr/>
                    <ul className="dashboardList">
                        <Link to="/staff" className="link">
                            <li className={location.pathname === "/staff" ? "dashboardItem active" : "dashboardItem"}>
                                <Dashboard className="dashboardIcon"/>
                                Home
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default StaffDashboard;