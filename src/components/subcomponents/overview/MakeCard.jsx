/* eslint-disable react/prop-types */
// import { ShieldCheck } from 'lucide-react';
import { Award } from 'lucide-react'

const MakeCard = ({ data }) => {

    return (
        <div className="p-6 rounded-xl bg-white shadow-lg  hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
                <div>
                    <p className=" text-sm font-medium text-gray-500 ">Top Manufacturer in Market</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{data.topMake}</p>
                    <p className="text-sm text-gray-500 mt-1">Their Top Model : {data.topMake.model}</p>
                </div>
                <div className="bg-gray-200 p-3 rounded-lg flex">
                    <Award className="w-6 h-6 text-black" />
                </div>
            </div>
        </div>
    )
}

export default MakeCard;