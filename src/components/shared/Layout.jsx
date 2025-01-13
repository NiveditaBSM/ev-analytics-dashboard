import { Outlet } from "react-router";

const Layout = () => {
    return (
        <section className='main flex h-screen w-screen overflow-hidden'>
            <NavigationBar className='navbar' />
            <div className='dashboardContentWrapper'>
                <Outlet />
            </div>
        </section>
    )
}

export default Layout;