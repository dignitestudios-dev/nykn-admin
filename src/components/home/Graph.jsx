import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    date: "Jan",
    pending: 4000,
    paid: 2400,
  },
  {
    date: "Feb",
    pending: 3000,
    paid: 1398,
  },
  {
    date: "Mar",
    pending: 2000,
    paid: 9800,
  },
  {
    date: "Apr",
    pending: 2780,
    paid: 3908,
  },
  {
    date: "May",
    pending: 1890,
    paid: 4800,
  },
  {
    date: "Jun",
    pending: 2390,
    paid: 3800,
  },
  {
    date: "Jul",
    pending: 3490,
    paid: 4300,
  },
  {
    date: "Aug",
    pending: 2000,
    paid: 9800,
  },
  {
    date: "Sep",
    pending: 2780,
    paid: 3908,
  },
  {
    date: "Oct",
    pending: 1890,
    paid: 4800,
  },
  {
    date: "Nov",
    pending: 2390,
    paid: 3800,
  },
  {
    date: "Dec",
    pending: 3490,
    paid: 4300,
  },
];

const Graph = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={700}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="date" />
        <Legend />
        <Line
          type="monotone"
          dataKey="pending"
          stroke="#3DA2FF"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="paid" stroke="#3FB743" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Graph;
