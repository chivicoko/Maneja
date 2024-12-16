"use client";

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Dot } from 'recharts';
import { ChartData } from '../utils/types';


interface UsageChartProps {
  data: ChartData[];
}

const UsageChart: React.FC<UsageChartProps> = ({ data }) => (
  <div className="w-full flex gap-5 h-[20rem] bg-purple-100 p-4 pl-0 rounded-md">
    <div className="w-full">
      <div className="flex items-center justify-between pl-4">
        <h2 className="text-center text-lg font-semibold mb-4">Usage Chart</h2>
        <select name="" id="" className='bg-transparent border-0'>
          <option value="Last 6 months">Last 6 months</option>
          <option value="Last 9 months">Last 9 months</option>
          <option value="Last 12 months">Last 12 months</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height="88%">
        <LineChart data={data}>
          <XAxis dataKey="monthYear" tick={{ fontSize: 12, fill: '#072635' }} axisLine={{ stroke: '#c0c0c0' }} tickLine={{ stroke: 'transparent' }} />
          <YAxis tick={{ fontSize: 12, fill: '#072635' }} axisLine={{ stroke: '#d0d0d0' }} tickLine={{ stroke: '#d0d0d0' }} />
          <CartesianGrid vertical={false} stroke="#d0d0d0" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="non_projects"
            stroke="#E66FD2"
            strokeWidth={2}
            dot={<Dot fill="#E66FD2" />}
          />
          <Line
            type="monotone"
            dataKey="projects"
            stroke="#8C6FE6"
            strokeWidth={2}
            dot={<Dot fill="#8C6FE6" />}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default UsageChart;
