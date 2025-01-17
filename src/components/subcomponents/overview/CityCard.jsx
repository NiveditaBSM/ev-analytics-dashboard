import { MapPinCheck } from 'lucide-react'

const CityCard = ({ data }) => {

    return (
        <div className="p-6 rounded-xl bg-white shadow-lg  hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
                <div>
                    <p className=" text-sm font-medium text-gray-500 ">City with Most EVs</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{data.topCity}</p>
                    <p className=" text-sm font-medium text-gray-500 mt-1">County with Most EVs</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{data.topCounty}</p>
                </div>
                <div className="bg-gray-200 p-3 rounded-lg flex items-center justify-center w-12 h-12">
                    <MapPinCheck className="w-6 h-6 text-black" />
                </div>
            </div>
        </div>
    )
}

export default CityCard;