/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import DataCard from "../subcomponents/overview/DataCard";
import RegistrationTrend from "../subcomponents/overview/RegistrationTrend";
import ManufacturerDistCard from "../subcomponents/overview/ManufacturerDistCard";
import EVRangeCard from "../subcomponents/overview/EVRangeCard";
import BEVShare from "../subcomponents/overview/BEVShare";
import LoadingState from "../subcomponents/utils/LoadingState";

import { Trophy, MapPinHouse, MapPin, Wallet, ShieldPlus } from 'lucide-react';
import { motion } from "framer-motion";


const Overview = ({ data }) => {

    const stats = data.insights.overviewInsights;

    if (!data.isLoading) {
        console.log("Overview Data inside Overview component:", stats);
    } else {
        return (
            <LoadingState />
        )
    }

    const overviewData = [
        {
            title: 'Top Brand in Market',
            value: stats.topBrand.name,
            subtext: `Most popular model: ${stats.topBrand.model}`,
            icon: Trophy
        },
        {
            title: 'City with Most EVs',
            value: stats.topCity.name,
            subtext: `Housing ${stats.topCity.share}% of the total EVs in Washington`,
            icon: MapPinHouse
        },
        {
            title: 'County with Most EVs',
            value: stats.topCounty.name,
            subtext: `Housing ${stats.topCounty.share}% of the total EVs in Washington`,
            icon: MapPin
        },
        {
            title: 'Average Base MSRP',
            value: `$${stats.msrpInsights.avgMSRP}`,
            subtext: `Base MSRV ranges from $${stats.msrpInsights.minMSRP.msrp} to $${stats.msrpInsights.maxMSRP.msrp}`,
            icon: Wallet
        },
        {
            title: 'CAFV Eligibility',
            value: `${stats.cafvEligiblePercent} %`,
            subtext: `EVs eligible for availing CAFV incentives`,
            icon: ShieldPlus
        },
    ]
    return (
        <div className="flex-1 overflow-auto relative">
            <main className="max-w-7xl mx-auto py-6 px-3 lg:px-5">
                <div className="grid lg:grid-cols-12">
                    <motion.div
                        className="lg:col-span-9 grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8 w-full mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >

                        {overviewData.map((item) => (
                            <DataCard
                                key={item.title}
                                title={item.title}
                                value={item.value}
                                subtext={item.subtext}
                                icon={item.icon}
                            />
                        ))}
                        <BEVShare bev={stats.bevShare} phev={stats.phevShare} />
                    </motion.div>

                    <div className="lg:col-span-3 xl:block bg-gray-100 rounded-md shadow-lg p-5 mx-auto mb-7 lg:ml-5">
                        <EVRangeCard rangeData={stats.rangeInsights} />
                    </div>
                </div>


                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <ManufacturerDistCard />
                    <RegistrationTrend />

                </div>


            </main >
        </div >
    )
}

export default Overview;