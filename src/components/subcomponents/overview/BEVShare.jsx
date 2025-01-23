/* eslint-disable react/prop-types */
const BEVShare = ({ bev, phev }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 pt-4 hover:shadow-xl transition-shadow duration-300">
            <div className="text-gray-500 text-sm font-medium"> Share by Vehicle type</div>
            <div className="flex flex-row items-center justify-around">
                <div className="mt-3 text-center">
                    <p className="text-2xl font-bold text-gray-900 ">{bev}%</p>
                    <p className="text-sm text-gray-500 mt-1">Battery Electric Vehicles</p>
                </div>

                <div className="h-12 w-px bg-gray-300 mx-6"></div>

                <div className="mt-3 text-center ">
                    <p className="text-2xl font-bold text-gray-900 ">{phev}%</p>
                    <p className="text-sm  text-gray-500 mt-1">Plug-in Hybrid EVs</p>
                </div>
            </div>
        </div >
    )
};

export default BEVShare;