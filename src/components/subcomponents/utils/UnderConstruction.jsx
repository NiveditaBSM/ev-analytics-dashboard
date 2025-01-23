/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import { Construction } from 'lucide-react'; // Optional icons for the page

const UnderConstruction = ({ message }) => {
    return (
        <div className="flex items-center justify-center">
            <div className="p-8 mt-20 rounded-lg w-full text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="text-2xl mb-4 mt-20 text-gray-500">
                        <Construction className="inline-block" />
                        <p>Under Construction</p>
                    </div>
                    <p className="text-xl text-gray-700 mb-4">
                        This page is currently under construction. We're working hard to get it ready!
                    </p>
                    <p className="text-sm text-gray-500">
                        {message}
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default UnderConstruction;
