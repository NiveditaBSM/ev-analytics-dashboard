import { RiDashboard3Line } from "react-icons/ri";
import { GrMapLocation } from "react-icons/gr";
import { BsEvFront } from "react-icons/bs";
import { CiGrid2V } from "react-icons/ci";

export const NAVBAR_LINKS = [
    {
        iconName: RiDashboard3Line,
        name: "Overview",
        url: '/dashboard/overview'
    },
    {
        iconName: BsEvFront,
        name: "Distribution by Manufacturer",
        url: '/dashboard/makewise'
    },
    {
        iconName: GrMapLocation,
        name: "Distribution by Region",
        url: '/dashboard/regionwise'
    },
    {
        iconName: CiGrid2V,
        name: "Compare",
        url: '/dashboard/compare'
    },

]