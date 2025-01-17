/* eslint-disable no-unused-vars */
import DataCard from "../subcomponents/DataCard";
import MakeCard from "../subcomponents/overview/MakeCard";
import CityCard from "../subcomponents/overview/CityCard";
import RegistrationTrend from "../subcomponents/overview/RegistrationTrend";
import ManufacturerDistCard from "../subcomponents/overview/ManufacturerDistCard";
import RangeCard from "../subcomponents/overview/RangeCard";

import { Car, BatteryCharging, TrendingUp, Zap } from 'lucide-react';
import { motion } from "framer-motion";

import { DataContext } from "../../context/DataContext";
import { useContext } from "react";


const Overview = () => {
    const { insights, setInsights } = useContext(DataContext);
    const stats = insights.otherStats;

    return (
        <div className="flex-1 overflow-auto relative">
            <main className="max-w-7xl mx-auto py-6 px-3 lg:px-5">

                <motion.div
                    className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >

                    <MakeCard data={stats} />
                    <CityCard data={stats} />
                    <DataCard
                        title="Most EVs in City"
                        value={stats.topCity}
                        subtext={`City with the highest number of EVs`}
                        icon={Car}
                    />
                    <DataCard
                        title="Average EV Range"
                        value={`${stats.rangeInsights.avgRange} mi`}
                        subtext={`Maximum range: ${stats.rangeInsights.maxRange.range} mi`}
                        icon={BatteryCharging}
                    />
                </motion.div>
                <RangeCard />
                <motion.div
                    className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <RangeCard />
                    <MakeCard data={stats} />
                    <CityCard data={stats} />

                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <RegistrationTrend />
                    <ManufacturerDistCard />
                </div>


            </main >
        </div >
    )
}

export default Overview;