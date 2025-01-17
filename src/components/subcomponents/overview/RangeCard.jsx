import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

const RADIAN = Math.PI / 180;
const data = [
    { name: 'Min', value: 33, range: 200, color: '#808080' },
    { name: 'Avg', value: 33, range: 250, color: '#A6A6A6' },
    { name: 'Max', value: 33, range: 300, color: '#BFBFBF' },
];
const cx = 150; // Adjusted for right alignment
const cy = 80; // Adjusted for vertical alignment
const iR = 25;
const oR = 50;
const value = 60;

const needle = (value, data, cx, cy, iR, oR, color) => {
    let total = 0;
    data.forEach((v) => {
        total += v.value;
    });
    const ang = 180.0 * (1 - value / total);
    const length = (iR + 2 * oR) / 3;
    const sin = Math.sin(-RADIAN * ang);
    const cos = Math.cos(-RADIAN * ang);
    const r = 5;
    const x0 = cx + 5;
    const y0 = cy + 5;
    const xba = x0 + r * sin;
    const yba = y0 - r * cos;
    const xbb = x0 - r * sin;
    const ybb = y0 + r * cos;
    const xp = x0 + length * cos;
    const yp = y0 + length * sin;

    return [
        <circle key={x0 + y0} cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
        <path key={xba + yba} d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="#none" fill={color} />,
    ];
};


const RangeCard = () => {
    return (
        <motion.div
            className='p-6 rounded-xl bg-white shadow-lg  hover:shadow-xl transition-shadow duration-300  h-[10rem]'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <div className='text-sm p-2 h-full flex items-center justify-end'>
                <ResponsiveContainer width="80%" height="80%">

                    <PieChart>
                        <Pie
                            dataKey="value"
                            startAngle={180}
                            endAngle={0}
                            data={data}
                            cx={cx}
                            cy={cy}
                            innerRadius={iR}
                            outerRadius={oR}
                            // label={({ name, range }) => `${name} ${range}`}
                            label={({ name, range, midAngle, innerRadius, outerRadius }) => {
                                // Calculate the label position slightly inside the outer radius
                                const RADIAN = Math.PI / 180;
                                const radius = innerRadius + (outerRadius - innerRadius) * 1.65; // Adjust 0.8 to control how close the labels are
                                const labelX = cx + radius * Math.cos(-midAngle * RADIAN);
                                const labelY = cy + radius * Math.sin(-midAngle * RADIAN);

                                return (
                                    <text
                                        x={labelX}
                                        y={labelY}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        style={{
                                            fontSize: '12px',
                                            fill: '#333', // Text color
                                        }}
                                    >
                                        {`${name} ${range}`}
                                    </text>
                                );
                            }}
                            labelLine={false}
                            fill="#8884d8"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        {needle(value, data, cx, cy, iR, oR, '#000000')}
                        <Tooltip />
                        {/* <Legend
                            layout="horizontal"
                            align="center"
                            verticalAlign="bottom"
                            wrapperStyle={{
                                transform: `translate(${cx - 125}px, ${cy - 30}px)`, // Adjust the legend position relative to the chart
                            }} /> */}
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
}

export default RangeCard;