import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const BaseMSRPCard = ({ min, avg, max }) => {
    const data = {
        labels: ['Base MSRP'],
        datasets: [
            {
                label: 'Range',
                data: [max - min],
                backgroundColor: '#4b5563',
            },
            {
                label: 'Min',
                data: [min],
                backgroundColor: '#10b981',
            },
            {
                label: 'Avg',
                data: [avg],
                backgroundColor: '#f59e0b',
            },
            {
                label: 'Max',
                data: [max],
                backgroundColor: '#ef4444',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const label = context.dataset.label || '';
                        const value = context.raw;
                        return `${label}: $${value.toLocaleString()}`;
                    },
                },
            },
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                ticks: {
                    callback: (value) => `$${value.toLocaleString()}`,
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="p-6 rounded-xl bg-gray-900 text-white shadow-lg">
            <h3 className="text-sm font-medium text-gray-400 mb-4">Base MSRP ($)</h3>
            <Bar data={data} options={options} />
        </div>
    );
};

export default BaseMSRPCard;
