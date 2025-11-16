import Menubar from "./Menubar";
import Sidebar from "./Sidebar";

const Dashboard = ({children}) => {
    return (
        <div>
            <Menubar />
            
            <div className="flex">
                    <div className="max-[1080px]:hidden">
                        <Sidebar />
                    </div>

                    <div className="grow mx-5">{children}</div>
                </div>
        </div>
    )
}

export default Dashboard;