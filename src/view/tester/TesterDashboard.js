import React from "react";
import {Dashboard} from '@mui/icons-material';
import {Link} from "react-router-dom";

const TesterDashboard = () => {

    return(
        <div className="dashboard">
            <div className="dashboardWrapper">
                <div className="dashboardMenu">
                    <h3 className="dashboardTitle">Dashboard</h3>
                    <hr/>
                    <ul className="dashboardList">
                        <Link to="/tester" className="link">
                            <li className="dashboardItem active">
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

export default TesterDashboard;