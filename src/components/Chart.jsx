import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function Chart() {
  const [data, setData] = useState([]);
  const [base, setBase] = useState("USD");
  const [target, setTarget] = useState("INR");

  const currencyList = ["USD", "EUR", "INR", "JPY", "GBP", "CAD", "AUD", "CNY"];

  const fetchHistory = async () => {
    const endDate = new Date().toISOString().split("T")[0];
    const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];

    const res = await fetch(
      `https://api.apilayer.com/fixer/timeseries?start_date=${startDate}&end_date=${endDate}&base=${base}&symbols=${target}`,
      {
        headers: {
          apikey: import.meta.env.VITE_API_KEY,
        },
      }
    );

    const json = await res.json();

    const formattedData = Object.entries(json.rates || {}).map(([date, value]) => ({
      date,
      rate: value?.[target],
    }));

    setData(formattedData);
  };

  useEffect(() => {
    fetchHistory();
  }, [base, target]);

  return (
    <div className="bg-white/30 dark:bg-gray-900/40 p-6 rounded-2xl shadow-md backdrop-blur-xl border border-gray-200 dark:border-gray-700 transition-all">
      <h2 className="text-xl font-bold mb-4">📈 Weekly Exchange Rate Trends</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <select
          value={base}
          onChange={(e) => setBase(e.target.value)}
          className="px-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-300 dark:border-gray-600 shadow-inner outline-none focus:ring-2 focus:ring-indigo-400 transition"
        >
          {currencyList.map((code) => (
            <option key={code}>{code}</option>
          ))}
        </select>

        <select
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="px-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-300 dark:border-gray-600 shadow-inner outline-none focus:ring-2 focus:ring-indigo-400 transition"
        >
          {currencyList.map((code) => (
            <option key={code}>{code}</option>
          ))}
        </select>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis dataKey="date" />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="rate"
              stroke="#6366f1"
              strokeWidth={3}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
