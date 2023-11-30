import React from "react";
import {Dashboard, ManageAccounts, ContentPasteGo, AdminPanelSettings} from '@mui/icons-material';
import {Link, useLocation} from "react-router-dom";

const CoordinatorDashboard = () => {
    const location = useLocation();

    return(
        <div className="dashboard">
            <div className="dashboardWrapper">
                <div className="dashboardMenu">
                    <h3 className="dashboardTitle">Dashboard</h3>
                    <hr/>
                    <ul className="dashboardList">
                        <Link to="/coordinator" className="link">
                            <li className={location.pathname == "/coordinator" ? "dashboardItem active" : "dashboardItem"}>
                                <Dashboard className="dashboardIcon"/>
                                Home
                            </li>
                        </Link>
                        <Link to="/coordinator/assignment" className="link">
                            <li className={location.pathname.endsWith("assignment") ? "dashboardItem active" : "dashboardItem"}>
                                <ContentPasteGo className="dashboardIcon"/>
                                Phân công
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default CoordinatorDashboard;