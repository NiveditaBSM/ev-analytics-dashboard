import propTypes from "prop-types";
const DataCard = ({ title, value, subtext, icon: Icon }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 pt-4 hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-gray-500 text-sm font-medium">{title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
                <p className="text-sm text-gray-500 mt-1">{subtext}</p>
            </div>
            <div className="bg-gray-200 p-5 rounded-lg flex">
                <Icon className="w-6 h-6 text-black" />
            </div>
        </div>
    </div>
);

DataCard.propTypes = {
    title: propTypes.string.isRequired,
    value: propTypes.string.isRequired,
    subtext: propTypes.string.isRequired,
    icon: propTypes.elementType.isRequired,
};

export default DataCard;