import { Box } from '@mui/material';
import { COLORS } from 'constant';
import React from 'react';
import {
   Bar,
   XAxis,
   YAxis,
   Tooltip,
   BarChart,
   LabelList,
   CartesianGrid,
   ResponsiveContainer,
} from 'recharts';

const data = [
   { name: 'Sleep Better', value: 100 },
   { name: 'Think Less', value: 200 },
   { name: 'Lose Weight', value: 300 },
   { name: 'Gain Clarity', value: 400 },
   { name: 'Feel Energized', value: 500 },
   { name: 'More Peace', value: 600 },
   { name: 'Training Regularly', value: 700 },
];

interface CustomYAxisTickProps {
   x: any;
   y: any;
   payload: any;
}

const CustomYAxisTick: React.FC<CustomYAxisTickProps> = ({ x, y, payload }) => {
   const width = 150;
   const height = 20;

   return (
      <g transform={`translate(${x},${y})`}>
         <rect x={-width} y={-height / 2} width={width} height={height} fill='transparent' />
         <text x={-width / 2 - 5} y={0} dy={5} textAnchor='middle' fill={COLORS.primary.main}>
            {payload.value}
         </text>
      </g>
   );
};

const GoalSurveyResults = () => {
   return (
      <Box height={'250px'}>
         <ResponsiveContainer width='100%' height='100%'>
            <BarChart
               data={data}
               layout='vertical'
               margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
               <CartesianGrid stroke='none' strokeDasharray='3 3' />
               <XAxis type='number' hide />
               <YAxis
                  dataKey='name'
                  type='category'
                  width={140}
                  axisLine={false}
                  tickLine={false}
                  tick={({ x, y, payload }) => <CustomYAxisTick x={x} y={y} payload={payload} />}
               />
               <Tooltip />
               <Bar dataKey='value' fill={COLORS.primary.lightest}>
                  <LabelList
                     dataKey='value'
                     position='insideLeft'
                     style={{ fill: COLORS.black.main, fontWeight: 600 }}
                  />
               </Bar>
            </BarChart>
         </ResponsiveContainer>
      </Box>
   );
};

export default GoalSurveyResults;
