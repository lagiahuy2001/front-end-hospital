import TopBarDashboard from "../../components/TopBarDashboard";
import {Outlet} from "react-router-dom";
import CoordinatorDashboard from "./CoordinatorDashboard";

const CoordinatorLayout = () => {
    return(
        <>
            <div className="layoutDashboard">
                <CoordinatorDashboard/>
                <div className="mainDashboard">
                    <TopBarDashboard/>
                    <Outlet/>
                </div>
            </div>
        </>
    )
}
export default CoordinatorLayout;