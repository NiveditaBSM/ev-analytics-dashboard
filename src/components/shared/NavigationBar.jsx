import { Link, useLocation } from "react-router-dom";
import { NAVBAR_LINKS } from "../../lib/const/navigation";
import { useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { Menu, X } from "lucide-react"; // Icons for the toggle menu

const NavigationBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="p-5">
            {/* Hamburger Icon */}
            <div className="flex justify-between items-center lg:hidden">
                {/* <h1 className="text-xl font-bold"></h1> */}
                <button
                    className="text-gray-700 hover:text-black focus:outline-none"
                    onClick={toggleMenu}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Links Container */}
            <div
                className={classNames(
                    "flex-col gap-3 lg:flex lg:flex-row lg:justify-start lg:items-center lg:static",
                    {
                        "flex": isOpen,
                        "hidden": !isOpen,
                    }
                )}
            >
                {NAVBAR_LINKS.map((item) => (
                    <NavbarLink className="flex" key={item.name} item={item} />
                ))}
            </div>
        </div>
    );
};

export default NavigationBar;

const linkClasses = "flex items-center gap-2 p-4 rounded-md font-medium ";

const NavbarLink = ({ item }) => {
    const { pathname } = useLocation();
    return (
        <Link to={item.url} >
            <div className={classNames(linkClasses, pathname === item.url ? `bg-black text-white hover:bg-black hover:shadow-xl transition-shadow duration-300` : 'bg-slate-50 text-gray-700 hover:shadow-xl hover:bg-slate-50 transition-shadow duration-300')}>
                <span className="text-base"> <item.iconName /> </span>
                {item.name}
            </div>
        </Link>
    )
}

NavbarLink.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        iconName: PropTypes.elementType.isRequired,
    }).isRequired,
};
