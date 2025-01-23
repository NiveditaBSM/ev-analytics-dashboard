/* eslint-disable  */
import { useContext } from 'react';
import { DataContext } from '../../../context/DataContext';
import { motion } from 'framer-motion';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const COLORS = [
    "#262626", // Graphite Gray
    "#404040", // Dark Charcoal
    "#595959", // Slate Gray
    "#808080", // Charcoal Gray
    "#A6A6A6", // Cool Gray
    "#BFBFBF", // Ash Gray
    "#D9D9D9", // Silver Gray
    "#F5F5F5", // Light Gray 
    "#000000"
]

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const { make, count } = payload[0].payload; // Access the make and count fields from the data
        return (
            <div className="bg-white p-2 rounded shadow-lg border text-sm text-gray-700">
                <p><strong>{make}</strong></p>
                <p>Vehicles registered: {count}</p>
            </div>
        );
    }
    return null;
};

const renderCustomLegend = (props) => {
    const { payload } = props; // Legend payload from PieChart
    return (
        <ul className="custom-legend flex flex-row justify-center align-middle gap-1 text-sm">
            {payload.map((entry, index) => (
                <li key={`legend-item-${index}`} className="flex items-center">
                    <span
                        className="w-4 h-4"
                        style={{ backgroundColor: entry.color }}
                    ></span>
                    <span className='px-1'>{entry.payload.make}</span>
                </li>
            ))}
        </ul>
    );
};

const ManufacturerDistCard = () => {
    const { insights, setInsights } = useContext(DataContext);
    const stats = insights.overviewInsights.distributionByMake;
    console.log("In manufacturer distribution component: ", stats);

    return (
        <motion.div
            className='p-6 rounded-xl bg-white shadow-lg  hover:shadow-xl transition-shadow duration-300'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <h2 className='text-md font-medium mb-4 text-gray-500'> Manufacturer's share</h2>
            <div className='h-80 text-sm p-2'>
                <ResponsiveContainer width={"100%"} height={"100%"}>
                    <PieChart margin={{ top: 0, right: 0, bottom: 20, left: 0 }}>
                        <Pie
                            data={stats}
                            cx={"50%"}
                            cy={"50%"}
                            labelLine={false}
                            outerRadius={80}
                            fill='gray'
                            dataKey="count"
                            label={({ make, percent }) => `${make} ${(percent * 100).toFixed(0)}%`}
                        >
                            {stats.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend content={renderCustomLegend} />
                    </PieChart>
                </ResponsiveContainer>
            </div>

        </motion.div>
    )
}

export default ManufacturerDistCard;
