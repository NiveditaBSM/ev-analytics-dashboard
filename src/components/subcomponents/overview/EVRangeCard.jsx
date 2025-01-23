/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { PlugZap } from 'lucide-react';
const EVRangeCard = ({ rangeData }) => {


    return (
        <div>
            <div className='flex flex-row align-middle gap-2'><h2 className="text-md font-bold mb-2">Range Stats</h2> <PlugZap className='h-6 w-6 ' /></div>
            <p className="text-gray-500 text-sm font-medium">Maximum Range:</p>
            <p className="text-2xl font-bold text-gray-900 my-1">{rangeData.maxRange.range} mi </p>
            {/* <p className="text-gray-500 text-sm font-medium">Provided by {rangeData.maxRange.make} {rangeData.maxRange.model}</p> */}
            <p className="text-sm text-gray-500">
                Enough to travel from New York City, New York to Richmond, Virginia</p>

            <div className="border-t border-gray-300 my-4"></div>

            <p className="text-gray-500 text-sm font-medium mt-1">Average Range:</p>
            <p className="text-2xl font-bold text-gray-900 my-1">{rangeData.avgRange} mi </p>
            <p className="text-sm text-gray-500 mt-1">
                Enough to travel from Los Angeles, California to San Diego, California</p>
        </div>
    );
};

export default EVRangeCard;
