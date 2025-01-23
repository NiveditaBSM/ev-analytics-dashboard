/* eslint-disable react/prop-types */
import { LoaderCircle } from 'lucide-react';

const LoadingState = ({ message = "Loading Data..." }) => {
    return (
        <div className="flex justify-center items-center h-screen bg-slate-700">
            <div className="text-center">
                <LoaderCircle className="animate-spin h-12 w-12 text-gray-500 mx-auto mb-4" />
                <p className="text-lg font-medium text-slate-400">{message}</p>
            </div>
        </div>
    );
};

export default LoadingState;
