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

const linkClasses = "sidebarLink flex items-center gap-3 px-4 py-4 rounded-md";

const NavbarLink = ({ item }) => {
    const { pathname } = useLocation();
    console.log("pathname: ", pathname)
    console.log("item.url: ", item.url)
    return (
        <Link to={item.url} className={classNames(linkClasses, pathname === item.url ? 'activeNavLink' : '')}>
            <span className="text-xl"> <item.iconName /> </span>
            {item.name}
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
