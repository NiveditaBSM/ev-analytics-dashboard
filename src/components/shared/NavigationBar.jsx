import { Link, useLocation } from "react-router-dom";
import { NAVBAR_LINKS } from "../../lib/const/navigation";
import classNames from "classnames";
import PropTypes from "prop-types"

const NavigationBar = () => {
    return (
        <div className="p-5 flex flex-row justify-start gap-3">
            {NAVBAR_LINKS.map(item => (
                <NavbarLink className="flex" key={item.name} item={item} />
            ))}
        </div>
    )
}

export default NavigationBar;

const linkClasses = "flex items-center gap-2 p-4 rounded-md font-medium ";

const NavbarLink = ({ item }) => {
    const { pathname } = useLocation();
    // console.log("pathname: ", pathname)
    // console.log("item.url: ", item.url)
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
