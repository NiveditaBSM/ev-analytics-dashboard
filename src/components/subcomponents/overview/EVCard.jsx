/* eslint-disable react/prop-types */
const EVCard = ({ title, data, icon: Icon }) => {
    return (
        <div className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
                <div>
                    {title.map((line, idx) => (
                        <p
                            key={idx}
                            className={`${idx % 2 === 0 ? 'text-sm font-medium text-gray-500' : 'text-2xl font-bold text-gray-900 mt-1'
                                }`}
                        >
                            {line}
                        </p>
                    ))}
                </div>
                <div className="bg-gray-200 p-3 rounded-lg flex items-center justify-center w-12 h-12">
                    <Icon className="w-6 h-6 text-black" />
                </div>
            </div>
        </div>
    );
};

export default EVCard;
