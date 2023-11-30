import TopBarDashboard from "../../components/TopBarDashboard";
import {Outlet} from "react-router-dom";
import TesterDashboard from "./TesterDashboard";

const TesterLayout = () => {
    return(
        <>
            <div className="layoutDashboard">
                <TesterDashboard/>
                <div className="mainDashboard">
                    <TopBarDashboard/>
                    <Outlet/>
                </div>
            </div>
        </>
    )
}
export default TesterLayout;