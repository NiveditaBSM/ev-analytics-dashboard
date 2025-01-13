import { Outlet } from "react-router";
import NavigationBar from "./NavigationBar";

const Layout = () => {
    return (
        <section className='main flex flex-col h-screen w-screen overflow-hidden bg-white'>
            <div className="flex flex-row">
                <NavigationBar />
            </div>

            <div className='p-3 mx-5 mb-3 rounded-md bg-slate-100 h-full'>
                <Outlet />
            </div>
        </section>
    )
}

export default Layout;