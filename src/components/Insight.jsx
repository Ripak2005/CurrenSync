import { useEffect, useState } from "react";

export default function Insight() {
  const [topRates, setTopRates] = useState([]);
  const [base, setBase] = useState("USD");

  const currencyList = ["EUR", "INR", "JPY", "GBP", "CAD", "AUD", "CNY", "CHF"];

  const fetchLatestRates = async () => {
    try {
      const res = await fetch(
        `https://api.apilayer.com/fixer/latest?base=${base}&symbols=${currencyList.join(",")}`,
        {
          headers: {
            apikey: import.meta.env.VITE_API_KEY,
          },
        }
      );
      const json = await res.json();
      const formatted = Object.entries(json.rates || {}).map(([symbol, rate]) => ({
        symbol,
        rate,
      }));

      // Sort descending: highest rate change first
      setTopRates(formatted.sort((a, b) => b.rate - a.rate).slice(0, 5));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLatestRates();
  }, [base]);

  return (
    <div className="bg-white/30 dark:bg-gray-900/40 p-6 rounded-2xl shadow-md backdrop-blur-xl border border-gray-200 dark:border-gray-700 transition-all">
      <h2 className="text-xl font-bold mb-4">💡 Smart Currency Insights</h2>

      <div className="mb-4">
        <label className="block font-medium mb-1">Choose Base Currency:</label>
        <select
          value={base}
          onChange={(e) => setBase(e.target.value)}
          className="px-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-300 dark:border-gray-600 shadow-inner outline-none focus:ring-2 focus:ring-indigo-400 transition"
        >
          {["USD", "EUR", "INR", "JPY"].map((code) => (
            <option key={code}>{code}</option>
          ))}
        </select>
      </div>

      <ul className="space-y-3">
        {topRates.map((item, index) => (
          <li
            key={index}
            className="flex justify-between items-center px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-100 dark:from-indigo-900 to-purple-100 dark:to-purple-900 shadow hover:scale-[1.02] transition-all"
          >
            <span className="font-semibold text-lg">
              💱 {base} → {item.symbol}
            </span>
            <span className="text-indigo-600 dark:text-indigo-300 font-bold text-xl">
              {item.rate.toFixed(2)}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-sm text-gray-600 dark:text-gray-400 italic">
        ✨ Tip: These top {topRates.length} conversions today can help you maximize value!
      </p>
    </div>
  );
}
