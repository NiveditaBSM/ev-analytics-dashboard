const EVRangeCard = ({ min, max, avg }) => {
    const getPosition = (value) => `${((value - min) / (max - min)) * 100}%`;

    return (
        <div className="p-6 rounded-xl bg-gray-900 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-sm font-medium text-gray-400">EV Range (in miles)</h3>
            <div className="mt-4">
                {/* Bar Container */}
                <div className="relative bg-gray-700 h-4 rounded-full w-full">
                    {/* Min Marker */}
                    <div
                        className="absolute bg-gray-300 w-4 h-4 rounded-full -top-1.5 flex items-center justify-center cursor-pointer"
                        style={{ left: getPosition(min) }}
                        title={`Min: ${min} miles`}
                    >
                        <span className="hidden">●</span>
                    </div>
                    {/* Avg Marker */}
                    <div
                        className="absolute bg-gray-400 w-4 h-4 rounded-full -top-1.5 flex items-center justify-center cursor-pointer"
                        style={{ left: getPosition(avg) }}
                        title={`Avg: ${avg} miles`}
                    >
                        <span className="hidden">●</span>
                    </div>
                    {/* Max Marker */}
                    <div
                        className="absolute bg-gray-500 w-4 h-4 rounded-full -top-1.5 flex items-center justify-center cursor-pointer"
                        style={{ left: getPosition(max) }}
                        title={`Max: ${max} miles`}
                    >
                        <span className="hidden">●</span>
                    </div>
                </div>
                {/* Labels */}
                <div className="flex justify-between mt-2 text-sm text-gray-400">
                    <p>Min: {min} miles</p>
                    <p>Avg: {avg} miles</p>
                    <p>Max: {max} miles</p>
                </div>
            </div>
        </div>
    );
};

export default EVRangeCard;
