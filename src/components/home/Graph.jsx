import React, { useContext, useEffect, useState, PureComponent } from "react";
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
import axios from "axios";
import Cookies from "js-cookie";
import { GlobalContext } from "../../context/GlobalContext";
import { useNavigate } from "react-router-dom";

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
  const { palette, theme, baseUrl, setIsLoggedIn } = useContext(GlobalContext);

  const navigate = useNavigate();
  const [stats, setStats] = useState([]);
  const [statsLoading, setStatsLoading] = useState(false);

  const getUsers = () => {
    const token = Cookies.get("token");

    if (token) {
      setStatsLoading(true);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios.get(`${baseUrl}/getTotalCategoryPrices`, { headers }).then(
        (response) => {
          setStats(response?.data?.totalSalesByMonth);
          setStatsLoading(false);
        },
        (error) => {
          setStatsLoading(false);
          if (error?.response?.status == 401) {
            setIsLoggedIn(false);
            Cookies.remove("token");
            navigate("/login");
          }
        }
      );
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={700}
        height={300}
        data={stats}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="month" />
        {/* <Legend /> */}
        <Tooltip />

        <Line
          type="monotone"
          dataKey="totalSales"
          stroke="#407BA7"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Graph;
