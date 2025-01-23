import { Outlet } from "react-router";
import NavigationBar from "./NavigationBar";

const Layout = () => {
    return (
        <div className='flex flex-col h-screen w-full z-10 overflow-x-hidden'>
            <div className="flex-shrink-0 flex flex-row">
                <NavigationBar />
            </div>

            <div className='flex-grow sm:overflow-y-auto mx-5 mb-3 rounded-lg bg-slate-50'>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout;