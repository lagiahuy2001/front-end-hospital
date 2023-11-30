import TopBarDashboard from "../../components/TopBarDashboard";
import {Outlet} from "react-router-dom";
import StaffDashboard from "./StaffDashboard";

const StaffLayout = () => {
    return(
        <>
            <div className="layoutDashboard">
                <StaffDashboard/>
                <div className="mainDashboard">
                    <TopBarDashboard/>
                    <Outlet/>
                </div>
            </div>
        </>
    )
}
export default StaffLayout;