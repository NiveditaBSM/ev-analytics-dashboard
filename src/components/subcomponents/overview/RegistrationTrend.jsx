/* eslint-disable no-unused-vars */
import { useContext } from 'react';
import { DataContext } from '../../../context/DataContext';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import { motion } from 'framer-motion';


const RegistrationTrend = () => {
    const { insights, setInsights } = useContext(DataContext);
    const stats = insights.freqBasedStats.countByYear.filter(e => e.year > 2024 - 10);
    console.log("In registration trend component: ", stats);
    return (
        <motion.div
            className='p-6 rounded-xl bg-white shadow-lg  hover:shadow-xl transition-shadow duration-300'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <h2 className='text-md font-medium mb-4 text-gray-500'> Sales overview (Past Decade)</h2>
            <div className='h-80 text-sm p-2'>
                <ResponsiveContainer width={'100%'} height={'100%'} >
                    <LineChart data={stats} margin={{ top: 10, right: 50, bottom: 10, left: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke='#9CA3AF' />
                        <XAxis dataKey={"year"} stroke='#9CA3AF' interval={0} dx={10} />
                        <YAxis stroke='#9CA3AF' />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="count" stroke="black" />
                    </LineChart>
                </ResponsiveContainer>

            </div>

        </motion.div >
    )
}

export default RegistrationTrend;